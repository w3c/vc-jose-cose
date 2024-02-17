
import yaml from 'yaml'
import moment from 'moment';
import SD from '@transmute/vc-jwt-sd'
import { base64url, calculateJwkThumbprint } from 'jose';

const digestName = 'sha-256'

const isVC = (json) => json.type.includes('VerifiableCredential')
const isVP = (json) => json.type.includes('VerifiablePresentation')

const salter = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    const encoded = base64url.encode(array);
    return encoded
}

const digester = {
    name: digestName,
    digest: async (json) => {
        const content = new TextEncoder().encode(json);
        const digest = await crypto.subtle.digest(digestName.toUpperCase(), content);
        return base64url.encode(new Uint8Array(digest));
    }
}

export const generateIssuerClaims = (example)=> {
    const generatedClaimsYaml = yaml.stringify(example).replace(/id\: /g, '!sd id: ').replace(/type\:/g, '!sd type:')
    return generatedClaimsYaml
}

export const generateHolderDisclosure = (example) => {
    const claims = generateIssuerClaims(example)
    // redact nested ideas at depth 2 (spaces)
    const edited1 = claims.replace(/  !sd id\:(.*?)\n/g, `  id: False\n`)
    // disclose types
    const edited2 = edited1.replace(/\!sd type\:/g, `type:`)
    // redact remaining ids
    const edited3 = edited2.replace(/\!sd id\:/g, `id:`)
    return edited3
}

export const getExampleMetadata = async ({ alg, json }) => {
    console.log('getExampleMetadata', { alg, json })
    let iss = undefined

    if(json.issuer){
        iss = typeof json.issuer === 'string' ? json.issuer: json.issuer.id
    }

    if (json.holder){
        iss = typeof json.holder === 'string' ? json.holder: json.holder.id
    }

    const iat = moment().unix();
    const exp = moment().add(1, 'years').unix();
    const nonce = salter()
    const aud = 'https://verifier.example'
    const issuerKeyPair  = await SD.JWK.generate(alg)
    const holderKeyPair  = await SD.JWK.generate(alg)
    return { alg, json, iss, iat, exp, nonce, aud, issuerKeyPair, holderKeyPair }
}

export const issueAndVerifyWithSdJWt = async ({ alg, json , iss, iat, exp, nonce, aud, issuerKeyPair, holderKeyPair, claims, disclosure  }) =>{
    const kid = await calculateJwkThumbprint(issuerKeyPair.publicKeyJwk)
    let typ = undefined
    let cty = undefined
    if (isVC(json)){
        typ = 'vc+ld+json+sd-jwt'
        cty = 'vc+ld+json'
    }
    if (isVP(json)){
        typ = 'vp+ld+json+sd-jwt'
        cty = 'vp+ld+json'
    }
    const issuer = new SD.Issuer({
        alg,
        iss,
        kid,
        typ,
        cty,
        digester,
        signer: await SD.JWS.signer(issuerKeyPair.secretKeyJwk),
        salter
    })
    const holder = new SD.Holder({
        alg,
        digester,
        signer: await SD.JWS.signer(holderKeyPair.secretKeyJwk)
    })
    const verifier = new SD.Verifier({
        alg,
        digester,
        verifier: {
            verify: async (token) => {
                const parsed = SD.Parse.compact(token)
                const verifier = await SD.JWS.verifier(issuerKeyPair.publicKeyJwk)
                return verifier.verify(parsed.jwt)
            }
        }
    })
    const vc = await issuer.issue({
        claims: claims,
        iat: iat,
        exp: exp,
        holder: holderKeyPair.publicKeyJwk
    })
    const vp = await holder.present({
        credential: vc,
        disclosure: disclosure,
        nonce,
        aud
    })
    const verified = await verifier.verify({
        presentation: vp,
        nonce,
        aud
    })

    return { verified, vc, vp }
}

