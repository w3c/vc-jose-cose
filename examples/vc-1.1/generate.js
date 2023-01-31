
const jose = require('jose');
const fs = require('fs');
const privateKeyJwk = {
  "kid": "urn:ietf:params:oauth:jwk-thumbprint:sha-256:GNcrpR6vVHCzTe7W-9ntbJx_5hHfhiVCHWHEUaC4E_c",
  "kty": "EC",
  "crv": "P-256",
  "alg": "ES256",
  "x": "51Q_KAFsFu_FOjPojMN_Nt_pWmwokjn7iF6p3LiUiuk",
  "y": "T58_jpJ03yFV3D13hACKiZpjRwXl92XZEv4Lt_OkUK4",
  "d": "bAv9YrE443mH36LnzixS3Kv5ThM5m9mH7Ab_BiU3JZc"
};
const credentialMetadata = require('./credential-metadata.json');
const credential = require('./credential-claims-set-1.1.json');
(async ()=>{
  const privateKey = await jose.importJWK(privateKeyJwk);
  const audience = `urn:example:audience`
  const jwt = await new jose.SignJWT(credential)
    .setProtectedHeader(credentialMetadata)
    .setIssuedAt()
    .setIssuer(credential.iss)
    .setAudience(audience)
    .setExpirationTime('2h')
    .sign(privateKey)
  fs.writeFileSync('./verifiable-credential.jwt', jwt);
})()