# Verifiable Credential Service Worker Plugin for ReSpec

But with support for v2, and no JSON-LD processing.

# Usage

To use this extension, add the `respec-plugins` directory to your spec,
then configure respect to use the worker to post process like so:

```html
<head>
  <title>Respec Service Worker Plugin Test</title>
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

### Credits

Based on https://github.com/transmute-industries/respec-vc-jwt, which was based
on the original plugin here https://github.com/digitalbazaar/respec-vc
