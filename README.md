# This is WIP.

## Usage

Webpack — simply apply on entry point:

```js
// No Bootstrap
entry: './app'

// Load Bootstrap
entry: 'bootstrap!./app'
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

If there is no config provided, will be used default config for Bootstrap 3.
