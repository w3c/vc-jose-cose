# Verifiable Credential Service Plugin for ReSpec

The
**[Verifiable Credential Service Worker Plugin for ReSpec](https://github.com/w3c/vc-jose-cose/tree/main/plugin)**
is basically the **[Verifiable Credential extensions to ReSpec](https://github.com/w3c/respec-vc)**,
but adding support for the [VCDM v2](https://www.w3.org/TR/vc-data-model-2.0), and
removing JSON-LD processing.

# Usage

To use this extension, add the `respec-plugins` directory to your spec,
then configure ReSpec to use the worker to post-process like so:

```html
<head>
  <title>ReSpec Service Worker Plugin Test</title>
  <meta http-equiv='Content-Type' content='text/html;charset=utf-8' />
  <script src='https://www.w3.org/Tools/respec/respec-w3c' class='remove'></script>
  <script src="https://cdn.jsdelivr.net/gh/w3c/vc-jose-cose/plugin/dist/main.js"></script>
  <script type="text/javascript" class="remove">
    var respecConfig = {
      // ...
      postProcess: [window.respecVcJoseCose.processVcJoseCose]
    };
  </script>
</head>
```

You can choose to display `COSE`, `JWT`, and `SD-JWT` examples together, or individually using the following tags:
- Together: `vc-jose-cose`
- COSE: `vc-jose-cose-cose`
- JWT: `vc-jose-cose-jwt`
- SD-JWT: `vc-jose-cose-sd-jwt`
- 
### Credits

Based on https://github.com/transmute-industries/respec-vc-jwt, which was based
on the original plugin here https://github.com/digitalbazaar/respec-vc
