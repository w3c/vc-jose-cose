import {getCombinedHtml, getCoseHtml, getHtml, getJwtHtml, getSdJwtHtml} from './src/getHtml';
import { getPrivateKey } from './src/exampleKey';
import { getCoseExample } from './src/exampleCose';
import { getJwtExample } from './src/exampleJwt';
import { getSdJwtExample } from './src/exampleSdJwt';

async function processVcJoseCose() {
    // add styling for examples
    addVcJoseStyles();

    // handle full vc-jose-cose examples
    const examples = Array.from(document.querySelectorAll(".vc-jose-cose")).filter((e) => !!e.innerText)
    for (const index in examples) {
        const example = examples[index]
        const json = JSON.parse(example.innerText.replace(/\/\/ .*$/gm, ''))
        const processedData = await processCombinedExample(index, json);
        example.outerHTML = processedData.html
    }

    // handle jwt examples
    const jwtExamples = Array.from(document.querySelectorAll(".vc-jose-cose-jwt")).filter((e) => !!e.innerText)
    for (const index in jwtExamples) {
        const example = jwtExamples[index]
        const json = JSON.parse(example.innerText.replace(/\/\/ .*$/gm, ''))
        const processedData = await processJwtExample(index, json);
        example.outerHTML = processedData.html
    }

    // handle sd-jwt examples
    const sdJwtExamples = Array.from(document.querySelectorAll(".vc-jose-cose-sd-jwt")).filter((e) => !!e.innerText)
    for (const index in sdJwtExamples) {
        const example = sdJwtExamples[index]
        const json = JSON.parse(example.innerText.replace(/\/\/ .*$/gm, ''))
        const processedData = await processSdJwtExample(index, json);
        example.outerHTML = processedData.html
    }

    // handle cose examples
    const coseExamples = Array.from(document.querySelectorAll(".vc-jose-cose-cose")).filter((e) => !!e.innerText)
    for (const index in coseExamples) {
        const example = coseExamples[index]
        const json = JSON.parse(example.innerText.replace(/\/\/ .*$/gm, ''))
        const processedData = await processCoseExample(index, json);
        example.outerHTML = processedData.html
    }
}

function addVcJoseStyles() {
    const styles = document.createElement('style');

    styles.innerHTML += `
 .vc-jose-cose-tabbed, .vc-jose-cose-tabbed-jwt, .vc-jose-cose-tabbed-sd-jwt, .vc-jose-cose-tabbed-cose {
  overflow-x: hidden;
  margin: 0 0;
}

.vc-jose-cose-tabbed h1, .vc-jose-cose-jwt-tabbed h1, .vc-jose-cose-sd-jwt-tabbed h1, .vc-jose-cose-cose-tabbed h1 {
  font-size: 1em;
}

.vc-jose-cose-tabbed [type="radio"], .vc-jose-cose-tabbed-jwt [type="radio"], .vc-jose-cose-tabbed-sd-jwt [type="radio"], .vc-jose-cose-tabbed-cose [type="radio"] {
  display: none;
}

.vc-jose-cose-tabs, .vc-jose-cose-jwt-tabs, .vc-jose-cose-sd-jwt-tabs, .vc-jose-cose-cose-tabs {
  display: flex;
  align-items: stretch;
  list-style: none;
  padding: 0;
  border-bottom: 1px solid #ccc;
}

li.vc-jose-cose-tab, li.vc-jose-cose-jwt-tab, li.vc-jose-cose-sd-jwt-tab, li.vc-jose-cose-cose-tab {
  margin: unset;
  margin-left: 8px;
}

.vc-jose-cose-tab>label, .vc-jose-cose-jwt-tab>label, .vc-jose-cose-sd-jwt-tab>label, .vc-jose-cose-cose-tab>label {
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

.vc-jose-cose-tab:hover label, .vc-jose-cose-jwt-tab:hover label, .vc-jose-cose-sd-jwt-tab:hover label, .vc-jose-cose-cose-tab:hover label {
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
.vc-jose-cose-tabbed [type="radio"]:nth-of-type(3):checked~.vc-jose-cose-tabs .vc-jose-cose-tab:nth-of-type(3) label {
  border-bottom-color: #fff;
  background: #fff;
  color: #222;
}

.vc-jose-cose-tabbed [type="radio"]:nth-of-type(1):checked~.vc-jose-cose-tab-content:nth-of-type(1),
.vc-jose-cose-tabbed [type="radio"]:nth-of-type(2):checked~.vc-jose-cose-tab-content:nth-of-type(2),
.vc-jose-cose-tabbed [type="radio"]:nth-of-type(3):checked~.vc-jose-cose-tab-content:nth-of-type(3) {
  display: block;
}

.sd-jwt-header, .jwt-header, .vc-jose-cose-jwt .header, .vc-jose-cose-sd-jwt .header, .vc-jose-cose-cose .header {
  color: red;
}

.sd-jwt-payload, .jwt-payload, .vc-jose-cose-jwt .payload, .vc-jose-cose-sd-jwt .payload, .vc-jose-cose-cose .payload {
  color: green;
}

.sd-jwt-signature, .jwt-signature, .vc-jose-cose-jwt .signature, .vc-jose-cose-sd-jwt .signature, .vc-jose-cose-cose .signature {
  color: blue;
}

.sd-jwt-disclosure, .vc-jose-cose-jwt .disclosure, .vc-jose-cose-sd-jwt .disclosure, .vc-jose-cose-cose .disclosure {
  color: purple;
}

.sd-jwt-compact, .jwt-compact, .vc-jose-cose-jwt .compact, .vc-jose-cose-sd-jwt .compact, .vc-jose-cose-cose .compact {
  background-color: rgba(0,0,0,.03);
}

.cose-text, .jose-text, .vc-jose-cose-jwt .text, .vc-jose-cose-sd-jwt .text, .vc-jose-cose-cose .text {
  font-family: monospace;
  color: green;
}`;

    document.head.appendChild(styles);
}

export async function processCombinedExample(index, json) {
    const privateKey = await getPrivateKey();
    const coseExample = await getCoseExample(privateKey, json);
    const jwtExample = await getJwtExample(privateKey, json);
    const sdJwtExample = await getSdJwtExample(privateKey, json);
    const html = getCombinedHtml({index, coseExample, jwtExample, sdJwtExample});
    return {html};
}

export async function processJwtExample(index, json) {
    const privateKey = await getPrivateKey();
    const jwtExample = await getJwtExample(privateKey, json);
    const html = getJwtHtml({index, jwtExample});
    return {html};
}

export async function processSdJwtExample(index, json) {
    const privateKey = await getPrivateKey();
    const sdJwtExample = await getSdJwtExample(privateKey, json);
    const html = getSdJwtHtml({index, sdJwtExample});
    return {html};
}

export async function processCoseExample(index, json) {
    const privateKey = await getPrivateKey();
    const coseExample = await getCoseExample(privateKey, json);
    const html = getCoseHtml({index, coseExample});
    return {html};
}

window.respecVcJoseCose = {
    processVcJoseCose
}
