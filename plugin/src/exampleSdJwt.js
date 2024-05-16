import yaml from 'yaml';
import { base64url, issuer, key, text } from "@transmute/verifiable-credentials";
import * as jose from 'jose';
import crypto from 'crypto'; // Ensure you have this dependency

const calculateHash = (value) => {
    return base64url.encode(crypto.createHash('sha256').update(value).digest());
};

// Custom JSON.stringify with prettier formatting
const customJSONStringify = (obj) => {
    return JSON.stringify(obj, null, 2).replace(/\n/g, '<br>').replace(/\s/g, '&nbsp;');
};

const generateDisclosureHtml = (claimName, hash, disclosure, contents) => {
    return `
<div class="disclosure">
    <h3>Claim: <span class="claim-name">${claimName}</span></h3>
    <p><strong>SHA-256 Hash:</strong> <span class="hash">${hash}</span></p>
    <p><strong>Disclosure(s):</strong> <span class="disclosure-value">${disclosure}</span></p>
    <p><strong>Contents:</strong> <span class="contents">${customJSONStringify(JSON.parse(contents))}</span></p>
</div>
`;
};

const getDisclosuresFromPayload = (payload) => {
    const decodedPayload = new TextDecoder().decode(base64url.decode(payload));
    const claims = JSON.parse(decodedPayload);
    const disclosures = [];

    for (const claimName in claims) {
        const claim = claims[claimName];
        const hash = calculateHash(JSON.stringify(claim));
        const disclosure = base64url.encode(JSON.stringify(claim));
        const contents = JSON.stringify(claim, null, 2); // Prettified formatting

        disclosures.push({ claimName, hash, disclosure, contents });
    }

    return disclosures;
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

const getDisclosabilityHtml = async (vc) => {
    const [token] = vc.split('~');
    const [, payload] = token.split('.');

    const disclosures = getDisclosuresFromPayload(payload);
    const disclosureHtml = disclosures.map(({ claimName, hash, disclosure, contents }) =>
        generateDisclosureHtml(claimName, hash, disclosure, contents)
    );

    return `
<style>
    .disclosure {
        margin: 10px 0; /* Increased margin for better spacing */
        font-size: 12px;
        line-height: 1.6; /* Increased line height for better readability */
        padding: 5px;
    }
    .disclosure h3 {
        margin: 0;
        font-size: 14px;
        padding-left: 5px;
    }
    .disclosure .claim-name {
        color: #333;
    }
    .disclosure .hash,
    .disclosure .disclosure-value,
    .disclosure .contents {
        color: #555;
        word-wrap: break-word;
        display: inline;
    }
    .disclosure p {
        margin: 0;
        padding-left: 5px;
    }
    .disclosure pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
        padding-left: 5px;
        line-height: 1.6; /* Increased line height for better readability */
        display: inline-block; /* Ensure contents are inline */
    }
    .header-value {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
        padding-left: 5px;
        line-height: 1.6;
    }
</style>
<div class="disclosures">
    ${disclosureHtml.join('\n')}
</div>
`;
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

const getBinaryMessage = async (privateKey, messageType, messageJson) => {
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

export const getSdJwtExample = async (privateKey, messageJson) => {
    const type = Array.isArray(messageJson.type) ? messageJson.type : [messageJson.type];
    const messageType = type.includes('VerifiableCredential') ? 'application/vc+ld+json+sd-jwt' : 'application/vp+ld+json+sd-jwt';
    const message = await getBinaryMessage(privateKey, messageType, messageJson);
    const messageEncoded = new TextDecoder().decode(message);

    return `
<h1>Protected Headers</h1>
<div>
${getHeadersHtml(messageEncoded)}
</div>

<h1>Disclosures</h1>
<div>
${await getDisclosabilityHtml(messageEncoded)}
</div>

<h1>${messageType}</h1>
<div class="jose-text">
${getSdHtml(messageEncoded)}
</div>
  `.trim();
};
