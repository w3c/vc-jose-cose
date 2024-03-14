import { base64url } from "jose";
import { createHash } from 'crypto'

const nodeCryptoHashFunction = 'sha256'
const mandatoryBaseEncoding = `base64url` // no pad .

// https://www.iana.org/assignments/named-information/named-information.xhtml
const nodeCryptoToIanaNamedHashFunctions = {
    [nodeCryptoHashFunction]: 'sha-256'
}

export const urn = (wg: string, type: string, message: Buffer) => {
    const urnPrefix = `urn:ietf:params:${wg}`
    const messageHashBase64 = base64url.encode(createHash(nodeCryptoHashFunction).update(message).digest());
    return `${urnPrefix}:${type}:${nodeCryptoToIanaNamedHashFunctions[nodeCryptoHashFunction]}:${mandatoryBaseEncoding}:${messageHashBase64}`
}