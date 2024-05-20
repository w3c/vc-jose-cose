import yaml from 'yaml';
import { base64url, issuer, key, text } from "@transmute/verifiable-credentials";
import * as jose from 'jose';
import crypto from 'crypto';

const calculateHash = (value) => {
    return base64url.encode(crypto.createHash('sha256').update(value).digest());
};

const customJSONStringify = (obj) => {
    return JSON.stringify(obj, null, 2).replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
};

const generateDisclosureHtml = (claimName, hash, disclosure, contents) => {
    return `
<div class="disclosure">
    <h3>Claim: <span class="claim-name">${claimName}</span></h3>
    <p><strong>SHA-256 Hash:</strong> <span class="hash">${hash}</span></p>
    <p><strong>Disclosure(s):</strong> <span class="disclosure-value">${disclosure}</span></p>
    <p><strong>Contents:</strong> <span class="contents">${customJSONStringify(contents)}</span></p>
</div>
`;
};

const getSdHtml = (vc) => {
    const [token, ...disclosure] = vc.split('~');
    const [header, payload, signature] = token.split('.');
    const disclosures = disclosure.map((d) => {
        return `~<span class="sd-jwt-disclosure">${d}</span>`;
    }).join('');
    return `
<div class="sd-jwt-compact"><span class="sd-jwt-header">${header}</span>.<span class="sd-jwt-payload">${payload}</span>.<span class="sd-jwt-signature">${signature}</span>${disclosures}</div>`;
};

const getHeadersHtml = (vc) => {
    const [token] = vc.split('~');
    const [header] = token.split('.');
    const headerJson = JSON.parse(new TextDecoder().decode(base64url.decode(header)));
    return `<pre class="header-value">${customJSONStringify(headerJson)}</pre>`;
};

const getPayloadHtml = (vc) => {
    const [token] = vc.split('~');
    const [, payload] = token.split('.');
    const payloadJson = JSON.parse(new TextDecoder().decode(base64url.decode(payload)));
    return `<pre class="header-value">${customJSONStringify(payloadJson)}</pre>`;
};

const getDisclosuresHtml = async (vc) => {
    const [_, ...disclosures] = vc.split('~');
    const disclosureHtml = disclosures.map((disclosure) => {
        const decodedDisclosure = JSON.parse(new TextDecoder().decode(base64url.decode(disclosure)));
        const [, ...claimPath] = decodedDisclosure;
        const claimName = claimPath.pop();
        const hash = calculateHash(disclosure);

        return generateDisclosureHtml(JSON.stringify(claimName), hash, disclosure, decodedDisclosure);
    });

    return `<div class="disclosures">${disclosureHtml.join('\n')}</div>`;
};

export const generateIssuerClaims = (example) => {
    return yaml.stringify(example).replace(/id: /g, '!sd id: ').replace(/type:/g, '!sd type:');
};

const getCredential = async (privateKey, byteSigner, messageType, messageJson) => {
    return await issuer({
        alg: privateKey.alg,
        type: messageType,
        signer: byteSigner
    }).issue({
        claimset: new TextEncoder().encode(generateIssuerClaims(messageJson))
    });
};

const getPresentation = async (privateKey, byteSigner, messageType, messageJson) => {
    return await getCredential(privateKey, byteSigner, 'application/vc+ld+json+sd-jwt', messageJson);
};

export const getBinaryMessage = async (privateKey, messageType, messageJson) => {
    const byteSigner = {
        sign: async (bytes) => {
            const jws = await new jose.CompactSign(bytes)
                .setProtectedHeader({ kid: privateKey.kid, alg: privateKey.alg })
                .sign(await key.importKeyLike({
                    type: 'application/jwk+json',
                    content: new TextEncoder().encode(JSON.stringify(privateKey))
                }));
            return text.encoder.encode(jws);
        }
    };
    switch (messageType) {
        case 'application/vc+ld+json+sd-jwt': {
            return getCredential(privateKey, byteSigner, messageType, messageJson);
        }
        case 'application/vp+ld+json+sd-jwt': {
            return getPresentation(privateKey, byteSigner, messageType, messageJson);
        }
        default: {
            throw new Error('Unknown message type');
        }
    }
};

export const getSdJwtExample = async (index, privateKey, messageJson, prefix = 'sd-jwt') => {
    const type = Array.isArray(messageJson.type) ? messageJson.type : [messageJson.type];
    const messageType = type.includes('VerifiableCredential') ? 'application/vc+ld+json+sd-jwt' : 'application/vp+ld+json+sd-jwt';
    const binaryMessage = await getBinaryMessage(privateKey, messageType, messageJson);
    const message = new TextDecoder().decode(binaryMessage);
    const encoded = getSdHtml(message);
    const header = getHeadersHtml(message);
    const payload = getPayloadHtml(message);
    const disclosures = await getDisclosuresHtml(message);
    return `
<div class="sd-jwt-tabbed">
    <input type="radio" id="${prefix}-tab-${index}-encoded" name="${prefix}-tabs-${index}" checked="checked" tabindex="0">
    <input type="radio" id="${prefix}-tab-${index}-decoded" name="${prefix}-tabs-${index}" tabindex="0">
    <input type="radio" id="${prefix}-tab-${index}-disclosures" name="${prefix}-tabs-${index}" tabindex="0">
    <ul class="sd-jwt-tabs">
      <li class="sd-jwt-tab">
        <label for="${prefix}-tab-${index}-encoded">Encoded</label>
      </li>
      <li class="sd-jwt-tab">
        <label for="${prefix}-tab-${index}-decoded">Decoded</label>
      </li>
      <li class="sd-jwt-tab">
        <label for="${prefix}-tab-${index}-disclosures">Issuer Disclosures</label>
      </li>
    </ul>
    <div class="sd-jwt-tab-content" id="${prefix}-content-${index}-encoded">
        ${encoded}
    </div>
    <div class="sd-jwt-tab-content" id="${prefix}-content-${index}-decoded">
      <pre>${header}</pre>
      <pre>${payload}</pre>
    </div>
    <div class="sd-jwt-tab-content" id="${prefix}-content-${index}-disclosures">
        ${disclosures}
    </div>
</div>
`;
};