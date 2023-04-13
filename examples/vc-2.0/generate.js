
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

const examples = {
  'vc+jwt': {
    header: require('./templates/vc+jwt/header.json'),
    claimset: require('./templates/vc+jwt/claimset.json')
  },
  'vc+ld+jwt': {
    header: require('./templates/vc+ld+jwt/header.json'),
    claimset: require('./templates/vc+ld+jwt/claimset.json')
  },
  'vp+ld+jwt': {
    header: require('./templates/vp+ld+jwt/header.json'),
    claimset: require('./templates/vp+ld+jwt/claimset.json')
  },
};

const issue = async (header, claimset) => {
  const privateKey = await jose.importJWK(privateKeyJwk);
  const jwt = await new jose.CompactSign(Buffer.from(JSON.stringify(claimset)))
    .setProtectedHeader(header)
    .sign(privateKey)
  return jwt;
}

(async ()=>{
  for (const typ in examples){
    const {header, claimset} = examples[typ];
    const jwt = await issue(header, claimset)
    fs.writeFileSync(`./${typ}.jose`, jwt);
  }
})()