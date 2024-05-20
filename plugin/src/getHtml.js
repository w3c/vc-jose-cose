export const getCombinedHtml = ({index, coseExample, jwtExample, sdJwtExample}) => {
    return `
<div class="vc-jose-cose-tabbed">
    <input type="radio" id="vc-jose-cose-tab-${index}-cose" name="vc-jose-cose-tabs-${index}" checked="checked">
    <input type="radio" id="vc-jose-cose-tab-${index}-jwt" name="vc-jose-cose-tabs-${index}">
    <input type="radio" id="vc-jose-cose-tab-${index}-sd-jwt" name="vc-jose-cose-tabs-${index}">
    <ul class="vc-jose-cose-tabs">
      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-cose">COSE</label>
      </li>
      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-jwt">JWT</label>
      </li>
      <li class="vc-jose-cose-tab">
        <label for="vc-jose-cose-tab-${index}-sd-jwt">SD-JWT</label>
      </li>
    </ul>
    <div class="vc-jose-cose-tab-content">
${coseExample}
    </div>
    <div class="vc-jose-cose-tab-content">
${jwtExample}
    </div>
    <div class="vc-jose-cose-tab-content">
${sdJwtExample}
    </div> 
</div>`
}

export const getJwtHtml = ({jwtExample}) => {
    return `
<div class="vc-jose-cose-jwt-tabbed">
    <ul class="vc-jose-cose-jwt-tabs">
      <li class="vc-jose-cose-jwt-tab">
        <label>JWT</label>
      </li>
    </ul>
    <div class="vc-jose-cose-jwt-tab-content">
${jwtExample}
    </div>
</div>`
}

export const getSdJwtHtml = ({sdJwtExample}) => {
    return `
<div>
${sdJwtExample}
</div>
`.trim();
};

export const getCoseHtml = ({coseExample}) => {
    return `
<div class="vc-jose-cose-cose-tabbed">
    <ul class="vc-jose-cose-cose-tabs">
      <li class="vc-jose-cose-cose-tab">
        <label>COSE</label>
      </li>
    </ul>
    <div class="vc-jose-cose-cose-tab-content">
${coseExample}
    </div>
</div>`
};