
const getSdHtml = (vc) =>{
    const [token, ...disclosure] = vc.split('~');
    const [header, payload, signature] = token.split('.');
    const disclosures = disclosure.map((d)=>{
        return `~<span class="sd-jwt-disclosure">${d}</span>`
    }).join('')
    return `
<div class="sd-jwt-compact"><span class="sd-jwt-header">${header}</span>.<span class="sd-jwt-payload">${payload}</span>.<span class="sd-jwt-signature">${signature}</span>${disclosures}</div>`
}

const getVerifiedHtml = (verified)=> {
    return `<div>
  <pre class="sd-jwt-header">
// disclosed protected header
${JSON.stringify(verified.protectedHeader, null, 2).trim()}</pre>
  <pre class="sd-jwt-payload-verified">
// disclosed protected claimset
${JSON.stringify(verified.claimset, null, 2).trim()}</pre>
</div>
`
}

const getDisclosabilityHtml = (claims)=> {
    return `<pre>
${claims.trim().replace(/\!sd/g, `<span class="sd-jwt-disclosure">!sd</span>`)}
  </pre>`
}

const getDisclosuresHtml = (disclosure)=> {
    return `<pre>${disclosure.trim().replace(/False/g, `<span class="sd-jwt-disclosure">False</span>`)}</pre>`
}

export const getHtml = ({index, vc, vp, verified, claims, disclosure})=>{
    return `
<div class="vc-jose-cose-tabbed">
    <input type="radio" id="vc-jose-cose-tab-${index}-committed" name="vc-jose-cose-tabs-${index}">
    <input type="radio" id="vc-jose-cose-tab-${index}-issued" name="vc-jose-cose-tabs-${index}" checked="checked">
    <input type="radio" id="vc-jose-cose-tab-${index}-disclosed" name="vc-jose-cose-tabs-${index}">
    <input type="radio" id="vc-jose-cose-tab-${index}-presented" name="vc-jose-cose-tabs-${index}">
    <input type="radio" id="vc-jose-cose-tab-${index}-verified" name="vc-jose-cose-tabs-${index}">
    
    <ul class="vc-jose-cose-tabs">

      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-committed">Committed</label>
      </li>

      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-issued">Issued</label>
      </li>

      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-disclosed">Disclosed</label>
      </li>
     
      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-presented">Presented</label>
      </li>
      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-verified">Verified</label>
      </li>
      
    </ul>

    <div class="vc-jose-cose-tab-content">
${getDisclosabilityHtml(claims)}
    </div>

    <div class="vc-jose-cose-tab-content">
${getSdHtml(vc)}
    </div>

    <div class="vc-jose-cose-tab-content">
${getDisclosuresHtml(disclosure)}
    </div>
    
    <div class="vc-jose-cose-tab-content">
${getSdHtml(vp)}
    </div>
    
    <div class="vc-jose-cose-tab-content">
${getVerifiedHtml(verified)}
    </div>
  
</div>`
}
