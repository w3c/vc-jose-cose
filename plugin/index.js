import SD from '@transmute/vc-jwt-sd';
import {
    getExampleMetadata,
    generateIssuerClaims,
    generateHolderDisclosure,
    issueAndVerifyWithSdJWt
} from './src/sdJwt';
import {getHtml} from './src/getHtml';

async function processVcJoseCose() {
    // add styling for examples
    addVcJoseStyles();

    const examples = Array.from(document.querySelectorAll(".vc-jose-cose")).filter((e) => !!e.innerText)
    for (const index in examples) {
        const example = examples[index]
        const alg = example.getAttribute('data-alg') || 'ES384'
        const json = JSON.parse(example.innerText.replace(/\/\/ .*$/gm, ''))
        const processedData = await processCredential(index, alg, json);
        example.outerHTML = processedData.html
    }
}

function addVcJoseStyles() {
    const styles = document.createElement('style');

    styles.innerHTML += `
    .vc-jose-cose-tabbed {
    overflow-x: hidden;
    margin: 0 0;
  }
  
  .vc-jose-cose-tabbed [type="radio"] {
    display: none;
  }
  
  .vc-jose-cose-tabs {
    display: flex;
    align-items: stretch;
    list-style: none;
    padding: 0;
    border-bottom: 1px solid #ccc;
  }
  
  li.vc-jose-cose-tab {
    margin: unset;
    margin-left: 8px;
  }
  
  .vc-jose-cose-tab>label {
    display: block;
    margin-bottom: -1px;
    padding: .4em .5em;
    border: 1px solid #ccc;
    border-top-right-radius: .4em;
    border-top-left-radius: .4em;
    background: #eee;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .vc-jose-cose-tab:hover label {
    border-left-color: #333;
    border-top-color: #333;
    border-right-color: #333;
    color: #333;
  }
  
  .vc-jose-cose-tab-content {
    display: none;
  }
  
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(1):checked~.vc-jose-cose-tabs .vc-jose-cose-tab:nth-of-type(1) label,
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(2):checked~.vc-jose-cose-tabs .vc-jose-cose-tab:nth-of-type(2) label,
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(3):checked~.vc-jose-cose-tabs .vc-jose-cose-tab:nth-of-type(3) label,
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(4):checked~.vc-jose-cose-tabs .vc-jose-cose-tab:nth-of-type(4) label,
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(5):checked~.vc-jose-cose-tabs .vc-jose-cose-tab:nth-of-type(5) label {
    border-bottom-color: #fff;
    background: #fff;
    color: #222;
  }
  
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(1):checked~.vc-jose-cose-tab-content:nth-of-type(1),
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(2):checked~.vc-jose-cose-tab-content:nth-of-type(2),
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(3):checked~.vc-jose-cose-tab-content:nth-of-type(3),
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(4):checked~.vc-jose-cose-tab-content:nth-of-type(4),
  .vc-jose-cose-tabbed [type="radio"]:nth-of-type(5):checked~.vc-jose-cose-tab-content:nth-of-type(5) {
    display: block;
  }
  
  .sd-jwt-header {
    color: red
  }
  .sd-jwt-payload {
    color: green
  }
  
  .sd-jwt-payload-verified{
    color: purple
  }
  
  .sd-jwt-signature {
    color: blue
  }
  
  .sd-jwt-disclosure {
    color: purple
  }
  
  .sd-jwt-compact {
    background-color: rgba(0,0,0,.03);
  }`;

    document.head.appendChild(styles);
}

export async function processCredential(index, alg, json) {
    const credentialMetadata = await getExampleMetadata({alg, json});
    const claims = generateIssuerClaims(json);
    const disclosure = generateHolderDisclosure(json);
    const {vc, vp, verified} = await issueAndVerifyWithSdJWt({
        ...credentialMetadata,
        claims: SD.YAML.load(claims),
        disclosure: SD.YAML.load(disclosure)
    });
    const html = getHtml({index, vc, vp, verified, claims, disclosure});
    return {html}; // Return the HTML or other data directly
}

window.respecVcJoseCose = {
    processVcJoseCose
}
