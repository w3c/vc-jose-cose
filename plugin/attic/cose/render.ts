import { EDNCoseSign1, EDNMap, EDNSeq } from "./text";

import { parse } from "./parse";

import { urn } from "./identifiers";

import { IANACOSEHeaderParameter } from "./cose/headers";

const renderSeq = (seq: EDNSeq) => {
    const rows = seq.entries.map((entry: any, index: number)=>{
        let trailingComma = index === seq.entries.length -1 ? '': ','
        let item = `<li>${entry.edn}${trailingComma}</li>`
        if (!entry.edn){
            item = `<li>${recursiveRender(entry)}${trailingComma}</li>`
        }
        return item
    })

    return `<ol>${rows.join('\n')}</ol>`
}

const renderMap = (map: EDNMap) => {
    const rows = map.entries.map(([key, value])=>{
        let htmlValue = value.edn;
        if (!htmlValue){
            htmlValue = recursiveRender(value)
        }
        let htmlKey = `${key.label}: `
        if (key.iana){
            const iana = key.iana as IANACOSEHeaderParameter
            htmlKey = `/ ${iana.Name} / ${iana.Label} : `
        }
        if (value.iana){
            const iana = value.iana as IANACOSEHeaderParameter
            htmlValue = `/ ${iana.Name} / ${value.edn} `
        }
        return `<dt>${htmlKey}</dt><dd>${htmlValue}</dd>`
    })
    let mapComment = ''
    if (map.comment){
        mapComment = `/ ${map.comment} / `
    }
    return `${mapComment}{<dl>${rows.join('\n')}<dl>}`
}

const recursiveRender = (graph: EDNSeq | EDNMap): string => {

    if (graph instanceof EDNSeq){
        return renderSeq(graph)
    } else if (graph instanceof EDNMap){
        return renderMap(graph)
    }
    console.error(graph);
    throw new Error("unsupported graph instance")
}

const style = `
    .edn-cose-sign1 { font-family: monospace; }
    .edn-cose-sign1 * { margin: 0; padding: 0; } 
    .edn-cose-sign1 dt { padding-right: 8px;}
    .edn-cose-sign1 dt, dd { display: inline-block; padding-left: 8px; }
    .edn-cose-sign1 ol li {
      list-style: none;
      padding-left: 8px;
    }
    .decoded-nested { margin: 8px }
`

const recursiveRenderNested = (graph:EDNCoseSign1): string => {
    const items = [] as string[]
    for (const item of graph.nested){
        items.push(`
    <section class="decoded-nested">
${recursiveRender(item)}
    </section>
    `)
    }
    return items.join('\n')
}

export const render = async (message: Uint8Array, contentType: string = 'text/html') => {
    const graph = await parse(message) as EDNCoseSign1
    if (graph.tag !== 18){
        throw new Error('Only tagged cose-sign1 are supported')
    }
    if (contentType !== 'text/html'){
        throw new Error('Only text/html is supported')
    }
    const id = urn('cose', 'cose-sign1', message);

    return `

<section id="${id}" class="edn-cose-sign1">
  <style>
  ${style}
  </style>

/ cose-sign1 / 18([ 
${recursiveRender(graph.seq)}
])

${recursiveRenderNested(graph)}

<section>
  `.trim();

}