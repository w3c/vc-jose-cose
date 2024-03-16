import { base64url } from 'jose';

const nodeCryptoHashFunction = 'sha256'
const mandatoryBaseEncoding = `base64url` // no pad .

// https://www.iana.org/assignments/named-information/named-information.xhtml
const nodeCryptoToIanaNamedHashFunctions = {
    [nodeCryptoHashFunction]: 'sha-256'
}

export const urn = async (wg: string, type: string, message: Uint8Array) => {
    const urnPrefix = `urn:ietf:params:${wg}`;

    // Convert the Uint8Array message to an ArrayBuffer
    const messageBuffer = message.buffer;

    // Use the SubtleCrypto API for hashing
    const hashBuffer = await crypto.subtle.digest(
        { name: nodeCryptoToIanaNamedHashFunctions[nodeCryptoHashFunction] },
        messageBuffer // The message you want to hash as an ArrayBuffer
    );

    // Convert the hash ArrayBuffer back to a Uint8Array
    const hashArray = new Uint8Array(hashBuffer);

    // Convert the bytes to base64
    const messageHashBase64 = base64url.encode(hashArray);

    return `${urnPrefix}:${type}:${nodeCryptoToIanaNamedHashFunctions[nodeCryptoHashFunction]}:${mandatoryBaseEncoding}:${messageHashBase64}`;
};