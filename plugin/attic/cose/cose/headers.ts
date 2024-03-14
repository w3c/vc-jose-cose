export type IANACOSEHeaderParameter = {
    Name: string
    Label: string
    'Value Type': string
    'Value Registry': string
    Description: string
    Reference: string
}

export const IANACOSEHeaderParameters: Record<string, IANACOSEHeaderParameter> = {
    "0": {
        "Name": "Reserved",
        "Label": "0",
        "Value Type": "",
        "Value Registry": "",
        "Description": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "1": {
        "Name": "alg",
        "Label": "1",
        "Value Type": "int / tstr",
        "Value Registry": "COSE Algorithms registry",
        "Description": "Cryptographic algorithm to use",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "2": {
        "Name": "crit",
        "Label": "2",
        "Value Type": "[+ label]",
        "Value Registry": "COSE Header Parameters registry",
        "Description": "Critical headers to be understood",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "3": {
        "Name": "content type",
        "Label": "3",
        "Value Type": "tstr / uint",
        "Value Registry": "[COAP Content-Formats] or [Media Types] registry",
        "Description": "Content type of the payload",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "4": {
        "Name": "kid",
        "Label": "4",
        "Value Type": "bstr",
        "Value Registry": "",
        "Description": "Key identifier",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "5": {
        "Name": "IV",
        "Label": "5",
        "Value Type": "bstr",
        "Value Registry": "",
        "Description": "Full Initialization Vector",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "6": {
        "Name": "Partial IV",
        "Label": "6",
        "Value Type": "bstr",
        "Value Registry": "",
        "Description": "Partial Initialization Vector",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "7": {
        "Name": "counter signature",
        "Label": "7",
        "Value Type": "COSE_Signature / [+ COSE_Signature ]",
        "Value Registry": "",
        "Description": "CBOR-encoded signature structure (Deprecated by [RFC9338])",
        "Reference": "https://datatracker.ietf.org/doc/RFC8152"
    },
    "8": {
        "Name": "Unassigned",
        "Label": "8",
        "Value Type": "",
        "Value Registry": "",
        "Description": "",
        "Reference": ""
    },
    "9": {
        "Name": "CounterSignature0",
        "Label": "9",
        "Value Type": "bstr",
        "Value Registry": "",
        "Description": "Counter signature with implied signer and headers (Deprecated by [RFC9338])",
        "Reference": "https://datatracker.ietf.org/doc/RFC8152"
    },
    "10": {
        "Name": "kid context",
        "Label": "10",
        "Value Type": "bstr",
        "Value Registry": "",
        "Description": "Identifies the context for the key identifier",
        "Reference": "https://datatracker.ietf.org/doc/RFC8613, Section 5.1"
    },
    "11": {
        "Name": "Countersignature version 2",
        "Label": "11",
        "Value Type": "COSE_Countersignature / [+ COSE_Countersignature]",
        "Value Registry": "",
        "Description": "V2 countersignature attribute",
        "Reference": "https://datatracker.ietf.org/doc/RFC9338"
    },
    "12": {
        "Name": "Countersignature0 version 2",
        "Label": "12",
        "Value Type": "COSE_Countersignature0",
        "Value Registry": "",
        "Description": "V2 Abbreviated Countersignature",
        "Reference": "https://datatracker.ietf.org/doc/RFC9338"
    },
    "13": {
        "Name": "kcwt",
        "Label": "13",
        "Value Type": "COSE_Messages",
        "Value Registry": "",
        "Description": "A CBOR Web Token (CWT) containing a COSE_Key in a 'cnf' claim and possibly other claims. CWT is defined in [RFC8392]. COSE_Messages is defined in [RFC9052].",
        "Reference": "https://datatracker.ietf.org/doc/RFC-ietf-lake-edhoc-22"
    },
    "14": {
        "Name": "kccs",
        "Label": "14",
        "Value Type": "map",
        "Value Registry": "",
        "Description": "A CWT Claims Set (CCS) containing a COSE_Key in a 'cnf' claim and possibly other claims. CCS is defined in [RFC8392].",
        "Reference": "https://datatracker.ietf.org/doc/RFC-ietf-lake-edhoc-22"
    },
    "15": {
        "Name": "CWT Claims",
        "Label": "15",
        "Value Type": "map",
        "Value Registry": "",
        "Description": "Location for CWT Claims in COSE Header Parameters.",
        "Reference": "https://datatracker.ietf.org/doc/RFC-ietf-cose-cwt-claims-in-headers-10"
    },
    "32": {
        "Name": "x5bag",
        "Label": "32",
        "Value Type": "COSE_X509",
        "Value Registry": "",
        "Description": "An unordered bag of X.509 certificates",
        "Reference": "https://datatracker.ietf.org/doc/RFC9360"
    },
    "33": {
        "Name": "x5chain",
        "Label": "33",
        "Value Type": "COSE_X509",
        "Value Registry": "",
        "Description": "An ordered chain of X.509 certificates",
        "Reference": "https://datatracker.ietf.org/doc/RFC9360"
    },
    "34": {
        "Name": "x5t",
        "Label": "34",
        "Value Type": "COSE_CertHash",
        "Value Registry": "",
        "Description": "Hash of an X.509 certificate",
        "Reference": "https://datatracker.ietf.org/doc/RFC9360"
    },
    "35": {
        "Name": "x5u",
        "Label": "35",
        "Value Type": "uri",
        "Value Registry": "",
        "Description": "URI pointing to an X.509 certificate",
        "Reference": "https://datatracker.ietf.org/doc/RFC9360"
    },
    "256": {
        "Name": "CUPHNonce",
        "Label": "256",
        "Value Type": "bstr",
        "Value Registry": "",
        "Description": "Challenge Nonce",
        "Reference": "[FIDO Device Onboard Specification]"
    },
    "257": {
        "Name": "CUPHOwnerPubKey",
        "Label": "257",
        "Value Type": "array",
        "Value Registry": "",
        "Description": "Public Key",
        "Reference": "[FIDO Device Onboard Specification]"
    },
    "less than -65536": {
        "Name": "Reserved for Private Use",
        "Label": "less than -65536",
        "Value Type": "",
        "Value Registry": "",
        "Description": "",
        "Reference": "https://datatracker.ietf.org/doc/RFC9052"
    },
    "-65536 to -1": {
        "Name": "delegated to the COSE Header Algorithm Parameters registry",
        "Label": "-65536 to -1",
        "Value Type": "",
        "Value Registry": "",
        "Description": "",
        "Reference": ""
    },
    "16-31": {
        "Name": "Unassigned",
        "Label": "16-31",
        "Value Type": "",
        "Value Registry": "",
        "Description": "",
        "Reference": ""
    },
    "36-255": {
        "Name": "Unassigned",
        "Label": "36-255",
        "Value Type": "",
        "Value Registry": "",
        "Description": "",
        "Reference": ""
    }
};