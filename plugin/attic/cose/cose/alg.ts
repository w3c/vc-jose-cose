export type IANACOSEAlgorithm = {
    Name: string
    Value: string
    Description: string
    Capabilities: string
    'Change Controller': string
    Recommended: string
    Reference: string
}
export const IANACOSEHeaderParameters: Record<string, IANACOSEAlgorithm> = {
    "0": {
        "Name": "Reserved",
        "Value": "0",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "No"
    },
    "1": {
        "Name": "A128GCM",
        "Value": "1",
        "Description": "AES-GCM mode w/ 128-bit key, 128-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "2": {
        "Name": "A192GCM",
        "Value": "2",
        "Description": "AES-GCM mode w/ 192-bit key, 128-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "3": {
        "Name": "A256GCM",
        "Value": "3",
        "Description": "AES-GCM mode w/ 256-bit key, 128-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "4": {
        "Name": "HMAC 256/64",
        "Value": "4",
        "Description": "HMAC w/ SHA-256 truncated to 64 bits",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "5": {
        "Name": "HMAC 256/256",
        "Value": "5",
        "Description": "HMAC w/ SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "6": {
        "Name": "HMAC 384/384",
        "Value": "6",
        "Description": "HMAC w/ SHA-384",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "7": {
        "Name": "HMAC 512/512",
        "Value": "7",
        "Description": "HMAC w/ SHA-512",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "10": {
        "Name": "AES-CCM-16-64-128",
        "Value": "10",
        "Description": "AES-CCM mode 128-bit key, 64-bit tag, 13-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "11": {
        "Name": "AES-CCM-16-64-256",
        "Value": "11",
        "Description": "AES-CCM mode 256-bit key, 64-bit tag, 13-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "12": {
        "Name": "AES-CCM-64-64-128",
        "Value": "12",
        "Description": "AES-CCM mode 128-bit key, 64-bit tag, 7-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "13": {
        "Name": "AES-CCM-64-64-256",
        "Value": "13",
        "Description": "AES-CCM mode 256-bit key, 64-bit tag, 7-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "14": {
        "Name": "AES-MAC 128/64",
        "Value": "14",
        "Description": "AES-MAC 128-bit key, 64-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "15": {
        "Name": "AES-MAC 256/64",
        "Value": "15",
        "Description": "AES-MAC 256-bit key, 64-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "24": {
        "Name": "ChaCha20/Poly1305",
        "Value": "24",
        "Description": "ChaCha20/Poly1305 w/ 256-bit key, 128-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "25": {
        "Name": "AES-MAC 128/128",
        "Value": "25",
        "Description": "AES-MAC 128-bit key, 128-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "26": {
        "Name": "AES-MAC 256/128",
        "Value": "26",
        "Description": "AES-MAC 256-bit key, 128-bit tag",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "30": {
        "Name": "AES-CCM-16-128-128",
        "Value": "30",
        "Description": "AES-CCM mode 128-bit key, 128-bit tag, 13-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "31": {
        "Name": "AES-CCM-16-128-256",
        "Value": "31",
        "Description": "AES-CCM mode 256-bit key, 128-bit tag, 13-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "32": {
        "Name": "AES-CCM-64-128-128",
        "Value": "32",
        "Description": "AES-CCM mode 128-bit key, 128-bit tag, 7-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "33": {
        "Name": "AES-CCM-64-128-256",
        "Value": "33",
        "Description": "AES-CCM mode 256-bit key, 128-bit tag, 7-byte nonce",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "34": {
        "Name": "IV-GENERATION",
        "Value": "34",
        "Description": "For doing IV generation for symmetric algorithms.",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "No"
    },
    "less than -65536": {
        "Name": "Reserved for Private Use",
        "Value": "less than -65536",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "No"
    },
    "-65536": {
        "Name": "Unassigned",
        "Value": "-65536",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "-65535": {
        "Name": "RS1",
        "Value": "-65535",
        "Description": "RSASSA-PKCS1-v1_5 using SHA-1",
        "Capabilities": "[kty]",
        "Change Controller": "IESG",
        "Reference": "https://datatracker.ietf.org/doc/RFC8812][RFC9053",
        "Recommended": "Deprecated"
    },
    "-65534": {
        "Name": "A128CTR",
        "Value": "-65534",
        "Description": "AES-CTR w/ 128-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "IETF",
        "Reference": "https://datatracker.ietf.org/doc/RFC9459",
        "Recommended": "Deprecated"
    },
    "-65533": {
        "Name": "A192CTR",
        "Value": "-65533",
        "Description": "AES-CTR w/ 192-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "IETF",
        "Reference": "https://datatracker.ietf.org/doc/RFC9459",
        "Recommended": "Deprecated"
    },
    "-65532": {
        "Name": "A256CTR",
        "Value": "-65532",
        "Description": "AES-CTR w/ 256-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "IETF",
        "Reference": "https://datatracker.ietf.org/doc/RFC9459",
        "Recommended": "Deprecated"
    },
    "-65531": {
        "Name": "A128CBC",
        "Value": "-65531",
        "Description": "AES-CBC w/ 128-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "IETF",
        "Reference": "https://datatracker.ietf.org/doc/RFC9459",
        "Recommended": "Deprecated"
    },
    "-65530": {
        "Name": "A192CBC",
        "Value": "-65530",
        "Description": "AES-CBC w/ 192-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "IETF",
        "Reference": "https://datatracker.ietf.org/doc/RFC9459",
        "Recommended": "Deprecated"
    },
    "-65529": {
        "Name": "A256CBC",
        "Value": "-65529",
        "Description": "AES-CBC w/ 256-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "IETF",
        "Reference": "https://datatracker.ietf.org/doc/RFC9459",
        "Recommended": "Deprecated"
    },
    "-65528 to -261": {
        "Name": "Unassigned",
        "Value": "-65528 to -261",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "-260": {
        "Name": "WalnutDSA",
        "Value": "-260",
        "Description": "WalnutDSA signature",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9021][RFC9053",
        "Recommended": "No"
    },
    "-259": {
        "Name": "RS512",
        "Value": "-259",
        "Description": "RSASSA-PKCS1-v1_5 using SHA-512",
        "Capabilities": "[kty]",
        "Change Controller": "IESG",
        "Reference": "https://datatracker.ietf.org/doc/RFC8812][RFC9053",
        "Recommended": "No"
    },
    "-258": {
        "Name": "RS384",
        "Value": "-258",
        "Description": "RSASSA-PKCS1-v1_5 using SHA-384",
        "Capabilities": "[kty]",
        "Change Controller": "IESG",
        "Reference": "https://datatracker.ietf.org/doc/RFC8812][RFC9053",
        "Recommended": "No"
    },
    "-257": {
        "Name": "RS256",
        "Value": "-257",
        "Description": "RSASSA-PKCS1-v1_5 using SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "IESG",
        "Reference": "https://datatracker.ietf.org/doc/RFC8812][RFC9053",
        "Recommended": "No"
    },
    "-256 to -48": {
        "Name": "Unassigned",
        "Value": "-256 to -48",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "-47": {
        "Name": "ES256K",
        "Value": "-47",
        "Description": "ECDSA using secp256k1 curve and SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "IESG",
        "Reference": "https://datatracker.ietf.org/doc/RFC8812][RFC9053",
        "Recommended": "No"
    },
    "-46": {
        "Name": "HSS-LMS",
        "Value": "-46",
        "Description": "HSS/LMS hash-based digital signature",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8778][RFC9053",
        "Recommended": "Yes"
    },
    "-45": {
        "Name": "SHAKE256",
        "Value": "-45",
        "Description": "SHAKE-256 512-bit Hash Value",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Yes"
    },
    "-44": {
        "Name": "SHA-512",
        "Value": "-44",
        "Description": "SHA-2 512-bit Hash",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Yes"
    },
    "-43": {
        "Name": "SHA-384",
        "Value": "-43",
        "Description": "SHA-2 384-bit Hash",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Yes"
    },
    "-42": {
        "Name": "RSAES-OAEP w/ SHA-512",
        "Value": "-42",
        "Description": "RSAES-OAEP w/ SHA-512",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8230][RFC9053",
        "Recommended": "Yes"
    },
    "-41": {
        "Name": "RSAES-OAEP w/ SHA-256",
        "Value": "-41",
        "Description": "RSAES-OAEP w/ SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8230][RFC9053",
        "Recommended": "Yes"
    },
    "-40": {
        "Name": "RSAES-OAEP w/ RFC 8017 default parameters",
        "Value": "-40",
        "Description": "RSAES-OAEP w/ SHA-1",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8230][RFC9053",
        "Recommended": "Yes"
    },
    "-39": {
        "Name": "PS512",
        "Value": "-39",
        "Description": "RSASSA-PSS w/ SHA-512",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8230][RFC9053",
        "Recommended": "Yes"
    },
    "-38": {
        "Name": "PS384",
        "Value": "-38",
        "Description": "RSASSA-PSS w/ SHA-384",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8230][RFC9053",
        "Recommended": "Yes"
    },
    "-37": {
        "Name": "PS256",
        "Value": "-37",
        "Description": "RSASSA-PSS w/ SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC8230][RFC9053",
        "Recommended": "Yes"
    },
    "-36": {
        "Name": "ES512",
        "Value": "-36",
        "Description": "ECDSA w/ SHA-512",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-35": {
        "Name": "ES384",
        "Value": "-35",
        "Description": "ECDSA w/ SHA-384",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-34": {
        "Name": "ECDH-SS + A256KW",
        "Value": "-34",
        "Description": "ECDH SS w/ Concat KDF and AES Key Wrap w/ 256-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-33": {
        "Name": "ECDH-SS + A192KW",
        "Value": "-33",
        "Description": "ECDH SS w/ Concat KDF and AES Key Wrap w/ 192-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-32": {
        "Name": "ECDH-SS + A128KW",
        "Value": "-32",
        "Description": "ECDH SS w/ Concat KDF and AES Key Wrap w/ 128-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-31": {
        "Name": "ECDH-ES + A256KW",
        "Value": "-31",
        "Description": "ECDH ES w/ Concat KDF and AES Key Wrap w/ 256-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-30": {
        "Name": "ECDH-ES + A192KW",
        "Value": "-30",
        "Description": "ECDH ES w/ Concat KDF and AES Key Wrap w/ 192-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-29": {
        "Name": "ECDH-ES + A128KW",
        "Value": "-29",
        "Description": "ECDH ES w/ Concat KDF and AES Key Wrap w/ 128-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-28": {
        "Name": "ECDH-SS + HKDF-512",
        "Value": "-28",
        "Description": "ECDH SS w/ HKDF - generate key directly",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-27": {
        "Name": "ECDH-SS + HKDF-256",
        "Value": "-27",
        "Description": "ECDH SS w/ HKDF - generate key directly",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-26": {
        "Name": "ECDH-ES + HKDF-512",
        "Value": "-26",
        "Description": "ECDH ES w/ HKDF - generate key directly",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-25": {
        "Name": "ECDH-ES + HKDF-256",
        "Value": "-25",
        "Description": "ECDH ES w/ HKDF - generate key directly",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-24 to -19": {
        "Name": "Unassigned",
        "Value": "-24 to -19",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "-18": {
        "Name": "SHAKE128",
        "Value": "-18",
        "Description": "SHAKE-128 256-bit Hash Value",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Yes"
    },
    "-17": {
        "Name": "SHA-512/256",
        "Value": "-17",
        "Description": "SHA-2 512-bit Hash truncated to 256-bits",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Yes"
    },
    "-16": {
        "Name": "SHA-256",
        "Value": "-16",
        "Description": "SHA-2 256-bit Hash",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Yes"
    },
    "-15": {
        "Name": "SHA-256/64",
        "Value": "-15",
        "Description": "SHA-2 256-bit Hash truncated to 64-bits",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Filter Only"
    },
    "-14": {
        "Name": "SHA-1",
        "Value": "-14",
        "Description": "SHA-1 Hash",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9054][RFC9053",
        "Recommended": "Filter Only"
    },
    "-13": {
        "Name": "direct+HKDF-AES-256",
        "Value": "-13",
        "Description": "Shared secret w/ AES-MAC 256-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-12": {
        "Name": "direct+HKDF-AES-128",
        "Value": "-12",
        "Description": "Shared secret w/ AES-MAC 128-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-11": {
        "Name": "direct+HKDF-SHA-512",
        "Value": "-11",
        "Description": "Shared secret w/ HKDF and SHA-512",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-10": {
        "Name": "direct+HKDF-SHA-256",
        "Value": "-10",
        "Description": "Shared secret w/ HKDF and SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-9": {
        "Name": "Unassigned",
        "Value": "-9",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "-8": {
        "Name": "EdDSA",
        "Value": "-8",
        "Description": "EdDSA",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-7": {
        "Name": "ES256",
        "Value": "-7",
        "Description": "ECDSA w/ SHA-256",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-6": {
        "Name": "direct",
        "Value": "-6",
        "Description": "Direct use of CEK",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-5": {
        "Name": "A256KW",
        "Value": "-5",
        "Description": "AES Key Wrap w/ 256-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-4": {
        "Name": "A192KW",
        "Value": "-4",
        "Description": "AES Key Wrap w/ 192-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-3": {
        "Name": "A128KW",
        "Value": "-3",
        "Description": "AES Key Wrap w/ 128-bit key",
        "Capabilities": "[kty]",
        "Change Controller": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9053",
        "Recommended": "Yes"
    },
    "-2 to -1": {
        "Name": "Unassigned",
        "Value": "-2 to -1",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "8-9": {
        "Name": "Unassigned",
        "Value": "8-9",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "16-23": {
        "Name": "Unassigned",
        "Value": "16-23",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    },
    "27-29": {
        "Name": "Unassigned",
        "Value": "27-29",
        "Description": "",
        "Capabilities": "",
        "Change Controller": "",
        "Reference": "",
        "Recommended": ""
    }
};