import yaml from 'yaml'
import {issuer, key, text} from "@transmute/verifiable-credentials";

import * as jose from 'jose'

export const generateIssuerClaims = (example)=> {
    return yaml.stringify(example).replace(/id\: /g, '!sd id: ').replace(/type\:/g, '!sd type:')
}

export const generateHolderDisclosure = (example) => {
    const claims = generateIssuerClaims(example)
    // redact nested ideas at depth 2 (spaces)
    const edited1 = claims.replace(/  !sd id\:(.*?)\n/g, `  id: False\n`)
    // disclose types
    const edited2 = edited1.replace(/\!sd type\:/g, `type:`)
    // redact remaining ids
    return edited2.replace(/\!sd id\:/g, `id:`)
}

const getSdHtml = (vc) =>{
    const [token, ...disclosure] = vc.split('~');
    const [header, payload, signature] = token.split('.');
    const disclosures = disclosure.map((d)=>{
        return `~<span class="sd-jwt-disclosure">${d}</span>`
    }).join('')
    return `
<div class="sd-jwt-compact"><span class="sd-jwt-header">${header}</span>.<span class="sd-jwt-payload">${payload}</span>.<span class="sd-jwt-signature">${signature}</span>${disclosures}</div>`
}


const getDisclosabilityHtml = (claims)=> {
    return `<pre>
${claims.trim().replace(/\!sd/g, `<span class="sd-jwt-disclosure">!sd</span>`)}
  </pre>`
}

const getCredential = async (privateKey, byteSigner, messageType, messageJson) => {
    return await issuer({
        alg: privateKey.alg,
        type: messageType,
        signer: byteSigner
    }).issue({
        claimset: new TextEncoder().encode(generateIssuerClaims(messageJson))
    });
}

const getPresentation = async (privateKey, byteSigner, messageType, messageJson) => {
    // since examples are always enveloped, and truncated, we never actually process key binding or disclosures
    return await getCredential(privateKey, byteSigner, 'application/vc+ld+json+sd-jwt', messageJson)
}

const getBinaryMessage = async (privateKey, messageType, messageJson) =>{
    const byteSigner = {
        sign: async (bytes) => {
            const jws = await new jose.CompactSign(
                bytes
            )
                .setProtectedHeader({ kid: privateKey.kid, alg: privateKey.alg })
                .sign(await key.importKeyLike({
                    type: 'application/jwk+json',
                    content: new TextEncoder().encode(JSON.stringify(privateKey))
                }))
            return text.encoder.encode(jws)
        }
    }
    switch(messageType){
        case 'application/vc+ld+json+sd-jwt': {
            return getCredential(privateKey, byteSigner, messageType, messageJson)
        }
        case 'application/vp+ld+json+sd-jwt': {
            return getPresentation(privateKey, byteSigner, messageType, messageJson)
        }
        default: {
            throw new Error('Unknown message type')
        }
    }
}

export const getSdJwtExample = async (privateKey, messageJson) => {
    const type = Array.isArray(messageJson.type) ? messageJson.type : [messageJson.type]
    const messageType = type.includes('VerifiableCredential') ? 'application/vc+ld+json+sd-jwt' : 'application/vp+ld+json+sd-jwt'
    const message = await getBinaryMessage(privateKey, messageType, messageJson)
    const messageEncoded = new TextDecoder().decode(message)

    const issuerClaims = generateIssuerClaims(messageJson)
    const messageType2 = 'application/ld+yaml'

// const decodedHeader = jose.decodeProtectedHeader(messageEncoded.split('~')[0])
// Not displaying protected header to save space
// <h2>Protected</h2>
// <pre>
// ${JSON.stringify(decodedHeader, null, 2)}
// </pre>
    return `

<h2 id="sd-jwt-example">${messageType2}</h2>
<div>
${getDisclosabilityHtml(issuerClaims)}
</div>

<h2 id="sd-jwt-example">${messageType}</h2>
<div class="jose-text">
${getSdHtml(messageEncoded)}
</div>
  `.trim()
}
