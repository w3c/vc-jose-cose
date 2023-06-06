# VC-JWT Explained

[Verifiable Credentials](https://w3c.github.io/vc-data-model/) (latest
working draft that corresponds to this work item) provide a JSON-LD data
model that enables the issuance, sharing, and verification of digital
credentials in a secure and interoperable manner. These credentials
provide a way for individuals, organizations, and other entities to digitally
represent and share their qualifications, attributes, or other relevant
information. Verifiable Credentials are designed to enhance trust,
privacy, and control in digital interactions by allowing the owner of
the credentials to control how their information is shared and verified.

Multiple different methods can be used to cryptographically secure 
content encoded using the Verifiable Credentials (VC) data model. 
[JWTs](https://www.rfc-editor.org/rfc/rfc7519) provide a
widely deployed approach to signing information. This specification
provides the details necessary to utilize JWTs as a securing mechanism
for verifiable credentials.

## Authors

* Michael B. Jones
* Orie Steele
* Michael Prorock

## Participate

* [Issue Tracker](https://github.com/w3c/vc-jwt/issues)
* [Discussion Forum](https://lists.w3.org/Archives/Public/public-vc-wg/)

## Goals

Enable compatibility and use of the VC Core Data model with
[JWTs](https://www.rfc-editor.org/rfc/rfc7519) and related,
[JOSE/JWS](https://www.rfc-editor.org/rfc/rfc7515.html), and
[COSE](https://www.rfc-editor.org/rfc/rfc8152).

## An Example

Say you want to sign a VC that looks like this (based on the core data
model):

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2"
  ],
  "id": "http://example.edu/credentials/3732",
  "type": ["VerifiableCredential", "UniversityDegreeCredential"],
  "issuer": "https://example.edu/issuers/14",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:123",
    "degree": {
      "type": "BachelorDegree",
      "name": "Bachelor of Science and Arts"
    }
  }
}
```

To create a JWT, you will set the header with the appropriate content
types described in the specification:

```json
{
  "kid": "urn:example:issuer#key-0",
  "alg": "ES256",
  "typ": "vc+ld+jwt",
  "cty": "vc+ld+json"
}
```

Make sure that `kid` points to the appropriate public key
material.  <i><b>Note:</b> This is often a DID URL.</i>

Then you create the JWT per the JWT specification:

```json
eyJraWQiOiJ1cm46ZXhhbXBsZTppc3N1ZXIja2V5LTAiLCJhbGciOiJFUzI1NiIsInR5cCI6InZjK2xkK2p3dCIsImN0eSI6InZjK2xkK2pzb24ifQ.eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvbnMvY3JlZGVudGlhbHMvdjIiXSwiaWQiOiJodHRwOi8vZXhhbXBsZS5lZHUvY3JlZGVudGlhbHMvMzczMiIsInR5cGUiOlsiVmVyaWZpYWJsZUNyZWRlbnRpYWwiLCJVbml2ZXJzaXR5RGVncmVlQ3JlZGVudGlhbCJdLCJpc3N1ZXIiOiJodHRwczovL2V4YW1wbGUuZWR1L2lzc3VlcnMvMTQiLCJpc3N1YW5jZURhdGUiOiIyMDEwLTAxLTAxVDE5OjIzOjI0WiIsImNyZWRlbnRpYWxTdWJqZWN0Ijp7ImlkIjoiZGlkOmV4YW1wbGU6MTIzIiwiZGVncmVlIjp7InR5cGUiOiJCYWNoZWxvckRlZ3JlZSIsIm5hbWUiOiJCYWNoZWxvciBvZiBTY2llbmNlIGFuZCBBcnRzIn19fQ.pfbhgWlTUZA8WmoFbi8WEIUFyC_lSQaAswoW87D1YeimdWZLq4MiJ3o-CmTkvkEQFhffvRiCzmkhxjS_R_RdOw
```

Now you can exchange this with other parties as desired, and know that the
data in the VC has not been tampered with, who it was issued by, etc.

## Conclusions

This document is just a quick high level summary of VC-JWTs, and we hope
that the reader will dive into the specification to learn more.
