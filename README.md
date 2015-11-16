# bootstrap-loader

Load Bootstrap styles and scripts in your Webpack bundle. This loader uses SASS to process CSS styles. Bootstrap 3 & 4 are supported.

## Installation

Get it via npm:

```bash
npm install bootstrap-loader
```

Don't forget to install Bootstrap:

```bash
# Bootstrap 3
npm install bootstrap-sass

# Bootstrap 4
npm install twbs/bootstrap#v4.0.0-alpha
```

## Usage

Simply require it:

```js
require('bootstrap-loader');
```

Or add `bootstrap-loader` as an entry point in your webpack config:

```js
entry: [ 'bootstrap-loader', './app' ]
```

Config is optional. It can be placed in root dir with name `.bootstraprc`. You can write it in `YAML` or `JSON` formats.

```yaml
---
# You can use comments here
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
  // And JSON comments also!
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

## Examples

Check out example apps:

* Basic usage: https://github.com/shakacode/bootstrap-loader-example
* With CSS Modules: https://github.com/shakacode/bootstrap-loader-css-modules-example

## Options

Here are default options for Bootstrap 3 & 4.

### Bootstrap 3

```yaml
### loglevel | default: disabled
#
# Output debugging info
# In case you have troubles with loader
# You can uncomment this option and send us output form console
#
# loglevel: debug


### bootstrapVersion | default: 3
#
# Major version of Bootstrap: 3 or 4
#
bootstrapVersion: 3


### styleLoaders | default: [ styles, css, sass ]
#
# Webpack loaders, order matters
# You can apply loader params here:
#   - sass?outputStyle=expanded
#
styleLoaders:
  - style
  - css
  - sass


### extractStyles | default: false
#
# Extract styles to stand-alone css file using `extract-text-webpack-plugin`
#
extractStyles: false
#
# Different settings for different environments can be used,
# It depends on value of NODE_ENV environment variable
#
# env:
#   development:
#     extractStyles: false
#   production:
#     extractStyles: true
#
# This param can also be set in webpack config:
#   entry: [ 'bootstrap-loader/extractStyles', './app' ]


### preBootstrapCustomizations | default: disabled
#
# Customize Bootstrap variables that get imported before the original Bootstrap variables.
# Thus, derived Bootstrap variables can depend on values from here.
# See the Bootstrap _variables.scss file for examples of derived Bootstrap variables.
#
# preBootstrapCustomizations: ./path/to/bootstrap/pre-customizations.scss


### bootstrapCustomizations | default: disabled
#
# This gets loaded after bootstrap/variables is loaded
# Thus, you may customize Bootstrap variables
# based on the values established in the Bootstrap _variables.scss file
#
# bootstrapCustomizations: ./path/to/bootstrap/customizations.scss


### bootstrapCustomizations | default: disabled
#
# Import your custom styles here
# Usually this endpoint-file contains list of `@imports` of your application styles
#
# appStyles: ./path/to/your/app/styles/endpoint.scss


### Bootstrap styles | default: all
styles:
  mixins: true
  normalize: true
  ...

# or enable/disable all of them:
# styles: true / false

### Bootstrap scripts | default: all
scripts:
  transition: true
  alert: true
  ...

# or enable/disable all of them:
# scripts: true / false
```

### Bootstrap 4

There is only one additional option for Bootstrap 4:

```yaml
### useFlexbox | default: true
#
# Enable / disable flexbox model
#
useFlexbox: true
```

## Additional configurations

#### jQuery

If you want to use Bootstrap's JS scripts — you have to provide `jQuery` to Bootstrap JS modules using `imports-loader`:

```js
module: {
  loaders: [
    // Use one of these to serve jQuery for Bootstrap scripts:

    // Bootstrap 3
    { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

    // Bootstrap 4
    { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
  ],
},
```

#### Icon fonts

Bootstrap uses **icon fonts**. If you want to load them, don't forget to setup `url-loader` or `file-loader` in webpack config:

```js
module: {
  loaders: [
    { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'url?limit=10000' },
  ],
},
```
