# This is WIP.

## Usage

Webpack — simply add `bootstrap-loader` as an entry point:

```js
entry: [ 'bootstrap-loader', './app' ]
```

Config is optional. It can be placed in root dir with name `.bootstraprc`. `YAML` / `JSON` are ok:

```yaml
---
useFlexbox: true

styleLoaders:
  - style
  - css
  - sass

styles:
  normalize: true
  print: true

scripts:
  alert: true
  button: true
```

```json
{
  "useFlexbox": true,

  "styleLoaders": ["style", "css", "sass"],

  "styles": {
    "normalize": true,
    "print": true
  },

  "scripts": {
    "alert": true,
    "button": true
  }
}
```

If no config provided, default one for Bootstrap 3 will be used.
