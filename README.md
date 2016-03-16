# bootstrap-loader

[![npm version](https://img.shields.io/npm/v/bootstrap-loader.svg?style=flat-square)](https://www.npmjs.com/package/bootstrap-loader)
[![dependencies status](https://img.shields.io/gemnasium/shakacode/bootstrap-loader.svg?style=flat-square)](https://gemnasium.com/shakacode/bootstrap-loader)
[![license](https://img.shields.io/npm/l/bootstrap-loader.svg?style=flat-square)](https://www.npmjs.com/package/bootstrap-loader)

Successor to [bootstrap-sass-loader](https://github.com/shakacode/bootstrap-sass-loader). Load Bootstrap styles and scripts in your Webpack bundle. This loader uses SASS to process CSS styles. Bootstrap 3 & 4 are supported.

**NOTE:** [Bootstrap 4](http://v4-alpha.getbootstrap.com/), (twbs/bootstrap)[https://github.com/twbs/bootstrap] is currently in alpha right now. Bootstrap 4 definitely worked when we first released this package. The parent company of this product, [ShakaCode](http://www.shakacode.com) had originally planned to use it for our upcoming commercial product, but we decided that Bootstrap 4 was changing too fast for a production product. Thus, we're still using Bootstrap 3, and we're not actively developing with Bootstrap 4. Consequently, for Bootstrap 4 issues, we need one of:

1. Community support to help us with Bootstrap 4 issues and pull requests.
2. We'd be thrilled to have another maintainer join us to help with Bootstrap 4 issues.
3. We'd also be thrilled if any companies are open to sponsoring the development of features and issues regarding Bootstrap 4.

That being said, Bootstrap 4 probably works just fine!

## NEWS

2016-02-28: Released 1.0.9. Updated to support Bootstrap 4, alpha 2!


## Installation
Get it via npm:

```bash
npm install bootstrap-loader
```

Don't forget to install these dependencies (use `--save or --saveDev` option per your needs to update your `package.json`):

```bash
# Bootstrap 3
npm install bootstrap-sass

# or Bootstrap 4
npm install bootstrap@v4.0.0-alpha.2

# Node SASS & other loaders needed to handle styles
npm install css-loader node-sass resolve-url-loader sass-loader style-loader url-loader
```

If you're using Bootstrap 4, you probably need:

```bash
npm install postcss-loader
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

Config is optional. It can be placed in root dir with name `.bootstraprc`. You can write it in `YAML` or `JSON` formats. Take a look at the default config files for [Bootstrap 3](.bootstraprc-3-default) and [Bootstrap 4](.bootstraprc-4-default). Note, we recommend using a configuration or else you might pick up unwanted upgrades, such as when we make Bootstrap 4 the default. Config options don't fall back on the defaults once a config file is present. Be sure not to delete config options. To start with a custom config, copy over a default config file as a starting point.

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

```js
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
Check out example apps in [`examples/`](examples) folder:

* Basic usage: [examples/basic](examples/basic)
* With CSS Modules: [examples/css-modules](examples/css-modules) (This example shows off hot reloading with Babel 6 as well!)

## Common Options for Bootstrap 3 and 4
Here are common options for Bootstrap 3 & 4.

### Bootstrap 3

#### `loglevel`

Default: `disabled`

Outputs debugging info. Set this option to `debug` to output debugging information. This is critical for debugging issues. The output will go to your webpack console.

```yaml
loglevel: debug
```

#### `bootstrapVersion`

Default: `3`

Major version of Bootstrap. Can be 3 or 4.

```yaml
bootstrapVersion: 3
```

#### `styleLoaders`

Default: `[ 'style', 'css', 'sass' ]`

Array of webpack loaders. `sass-loader` is required, order matters. In most cases the style loader should definitely go first and the sass loader should be last.

```yaml
styleLoaders:
  - style
  - css
  - sass

# You can apply loader params here:
  - sass?outputStyle=expanded
```

#### `extractStyles`

Default: `false`

Extract styles to stand-alone css file using `extract-text-webpack-plugin`. See [extract-text-plugin](https://github.com/webpack/extract-text-webpack-plugin) for more details.

```yaml
extractStyles: false

# Different settings for different environments can be used,
# It depends on value of NODE_ENV environment variable
env:
  development:
    extractStyles: false
  production:
    extractStyles: true
```

This param can also be set to `true` in webpack config:

```js
entry: [ 'bootstrap-loader/extractStyles', './app' ]
```

#### `preBootstrapCustomizations`

Default: `disabled`

Customize Bootstrap variables that get imported before the original Bootstrap variables. Thus, derived Bootstrap variables can depend on values from here. See the Bootstrap [`_variables.scss`](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_variables.scss) file for examples of derived Bootstrap variables.

```yaml
preBootstrapCustomizations: ./path/to/bootstrap/pre-customizations.scss
```

#### `bootstrapCustomizations`

Default: `disabled`

This gets loaded after bootstrap variables is loaded. Thus, you may customize Bootstrap variables based on the values established in the Bootstrap [`_variables.scss`](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_variables.scss) file. Note, if `bootstrap` did not have derived values, it would not be necessary to have two config files for customizing bootstrap values.

If you want your bootstrap override value to apply to derived variable values, then place your customizations in `preBootstrapCustomizations`. If you want to be sure your changes don't affect other derived values, place the changes in bootstrapCustomizations.

If you are not sure, you can probably simply use `preBootstrapCustomizations` and, if you have issues, see [`_variables.scss`](https://github.com/twbs/bootstrap-sass/blob/master/assets/stylesheets/bootstrap/_variables.scss) for derived values.

```yaml
bootstrapCustomizations: ./path/to/bootstrap/customizations.scss
```

#### `appStyles`

Default: `disabled`

Import your custom styles here. Usually this endpoint-file contains list of `@imports` of your application styles.

```yaml
appStyles: ./path/to/your/app/styles/endpoint.scss
```

#### `styles`

Default: all

Bootstrap styles.

```yaml
styles:
  mixins: true
  normalize: true
  ...

# or enable/disable all of them:
styles: true / false
```

#### `scripts`

Default: all

Bootstrap scripts.

```yaml
scripts:
  transition: true
  alert: true
  ...

# or enable/disable all of them:
scripts: true / false
```

#### `useCustomIconFontPath`

Default: false

If you're using a custom icon font and you need to specify its path (`$icon-font-path`) in your Sass files, set this option to true.

```yaml
useCustomIconFontPath: true / false
```

```
$icon-font-path: ../fonts // relative to your Sass file
$icon-font-name: 'glyphicons' // you'll typically want to change this too.
```


### Bootstrap 4
There is only one additional option for Bootstrap 4:

#### `useFlexbox`

Default: `true`

Enable / disable flexbox model.

```yaml
useFlexbox: true
```

#### Tether
Additionally, Bootstrap 4 requires Tether. You can add Tether per the examples in the `/examples` directory.

1. Add tether to package.json: `npm i --save tether`
2. Add tether as an entry point to your webpack config.
3. Add this plugin to your webpack config:

```
  plugins: [
    new ExtractTextPlugin('app.css', { allChunks: true }),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
  ],
```

#### PostCSS
Bootstrap 4 seems to require postcss:

1. Add postcss and the the postcss-loader: `npm i --save postcss postcss-loader`
2. Put `postcss` before `sass` in the order of loaders in your `.bootstraprc` file.

#### Glyphicons
Glyphicons have been removed from Bootstrap 4. The examples demonstrate how to use the font-awesome-loader

## Additional configurations

#### Paths to custom assets
If you use `bootstrap-loader` to load your styles (via `preBootstrapCustomizations`, `bootstrapCustomizations` & `appStyles`) and you load custom assets (fonts, images etc.), then you can use relative paths inside `url` method (relative to SASS file, from which you load asset).

This was made possible thanks to [resolve-url-loader](https://github.com/bholloway/resolve-url-loader). In common case you don't have to do anything special to apply it — we are doing it internally (just don't forget to install it). But if you want to use its custom settings, please provide it explicitly via `styleLoaders` option in `.bootstraprc`:

```yaml
styleLoaders:
  - style
  - css?sourceMap
  - resolve-url?sourceMap
  - sass?sourceMap
```

#### Incorporating Bootswatch themes
The following steps are needed to successfully incorporate a theme from Bootswatch:

1. Download the `.scss` files (`_variables.scss` and `_bootswatch.scss`) for the theme you have chosen.
2. Put the files somewhere in your project structure (e.g. the `./styles` directory).
3. Add an additional SCSS file, like bs-theme.scss, that contains the following:
   ```
   @import './_bootswatch.scss';
   ```

4. Add the following to your .bootstraprc file:
  ```
  preBootstrapCustomizations: ./styles/_variables.scss
  appStyles: ./styles/bs-theme.scss
  ```
The theme should now be applied as expected.
Note that this section might be valid for other theme packs as well.

#### jQuery
If you want to use Bootstrap's JS scripts — you have to provide `jQuery` to Bootstrap JS modules using `imports-loader`:

```js
module: {
  loaders: [
    // Use one of these to serve jQuery for Bootstrap scripts:

    // Bootstrap 3
    { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports?jQuery=jquery' },

    // Bootstrap 4
    { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports?jQuery=jquery' },
  ],
},
```

Note: if you're not concerned about Windows, the lines look like this (simpler regexp pattern):

```js
// Boostrap 3
{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },

// Bootstrap 4
{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },
```


#### Icon fonts
Bootstrap uses **icon fonts**. If you want to load them, don't forget to setup `url-loader` or `file-loader` in webpack config:

```js
module: {
  loaders: [
    { test: /\.(woff2?|svg)$/, loader: 'url?limit=10000' },
    { test: /\.(ttf|eot)$/, loader: 'file' },
  ],
},
```

## Contributing
This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [code of conduct](CODE_OF_CONDUCT.md).

See [Contributing](CONTRIBUTING.md) to get started.

## License
MIT.

## Example and Related Libraries
* [react-webpack-rails-tutorial](https://github.com/shakacode/react-webpack-rails-tutorial/), live example at [www.reactrails.com](http://www.reactrails.com/).
* [sass-resources-loader](https://github.com/shakacode/sass-resources-loader/)
* [Simple integration example](./examples/basic)
* [React + hot reloading example: bootstrap-loader-css-modules-example](./examples/css-modules)
* [react_on_rails gem](https://github.com/shakacode/react_on_rails)

## Useful Q&A
* [Using CSS modules with Bootstrap](https://github.com/shakacode/bootstrap-loader/issues/9)
* [How would you use bootstrap styles to build css module styles](https://github.com/shakacode/bootstrap-loader/issues/12)

We'll identify issues that are [questions](https://github.com/shakacode/bootstrap-loader/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aquestion).
