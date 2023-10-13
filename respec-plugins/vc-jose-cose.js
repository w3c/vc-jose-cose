

async function postProcessWithWorker() {
  const factory = {
    produce: ({ index, alg, json }) => ({
      payload: { index, alg, json }
    }),
    html: (example) => ((evt) => {
      example.outerHTML = evt.data.html
    })
  }
  const examples = Array.from(document.querySelectorAll(".vc-jose-cose")).filter((e) => !!e.innerText)
  for (const index in examples) {
    const example = examples[index]
    const alg = example.getAttribute('data-alg') || 'ES384'
    const json = JSON.parse(example.innerText.replace(/\/\/ .*$/gm, ''))
    const work = new Worker("./respec-plugins/respec-vc-jose-cose.js");
    work.postMessage(factory.produce({ index, alg, json }));
    work.onmessage = factory.html(example);
  }
}