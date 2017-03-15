[![Build Status](https://travis-ci.org/shakacode/react_on_rails.svg?branch=master)](https://travis-ci.org/shakacode/react_on_rails)
[![npm version](https://badge.fury.io/js/bootstrap-loader.svg)](https://badge.fury.io/js/bootstrap-loader)

If you're using this project and you like it, please give us a star! Thanks!

Aloha from Justin Gordon ([bio](http://www.railsonmaui.com/about)) and the [ShakaCode](http://www.shakacode.com) Team! We're actively looking for new projects involving React, React-Native, and Rails. Please [contact me](mailto:justin@shakacode.com) if we could potentially help you in any way. Besides consulting on bigger projects, [ShakaCode](http://www.shakacode.com) is doing ScreenHero plus Slack/Github based coaching for React on Rails. See our blog post [Can ShakaCode Help You?](https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9) for more information. 

I'm offering a free half-hour project consultation, on anything from React on Rails to any aspect of web application development for both consumer and enterprise products. In addition to React.js and Rails, we're doing React-Native iOS and Android apps!

Whether you have a new project or need help on an existing project, feel free to contact me directly at [justin@shakacode.com](mailto:justin@shakacode.com) and thanks in advance for any referrals!

Your support keeps this project going!

(Want to become a contributor? [Contact us](mailto:contact@shakacode.com) for a Slack room invite and let us know that you want to contribute.)

# ShakaCode Community
Please [Subscribe](https://app.mailerlite.com/webforms/landing/l1d9x5) to keep in touch with Justin Gordon and [ShakaCode](http://www.shakacode.com/). I intend to send a monthly summary including announcements of new releases of bootstrap-loader and React on Rails and of our latest [blog articles](https://blog.shakacode.com) and tutorials. Subscribers will also have access to **exclusive content**, including tips and examples.

[![2017-01-31_14-16-56](https://cloud.githubusercontent.com/assets/1118459/22490211/f7a70418-e7bf-11e6-9bef-b3ccd715dbf8.png)](https://app.mailerlite.com/webforms/landing/l1d9x5)

* **Slack Room**: [Contact us](mailto:contact@shakacode.com) for an invite to the ShakaCode Slack room!
* **[forum.shakacode.com](https://forum.shakacode.com)**: Post your questions
* **[@ShakaCode on Twitter](https://twitter.com/shakacode)**

## React on Rails Info
**[React on Rails](https://github.com/shakacode/react_on_rails)** is ShakaCode's flagship product. We want to make sure you're aware of it!

### Testimonials
From Joel Hooks, Co-Founder, Chief Nerd at [egghead.io](https://egghead.io/), January 30, 2017: 
![2017-01-30_11-33-59](https://cloud.githubusercontent.com/assets/1118459/22443635/b3549fb4-e6e3-11e6-8ea2-6f589dc93ed3.png)

For more testimonials, see [Live Projects](https://github.com/shakacode/react_on_rails/blob/master/PROJECTS.md) and [Kudos](https://github.com/shakacode/react_on_rails/blob/master/KUDOS.md).

# boostrap-loader v2 Docs!
If you want the v1 docs which are compatible with Webpack v1, please see the [v1 branch](https://github.com/shakacode/bootstrap-loader/tree/v1).

**Now that Webpack v2.2.0 has officially shipped we're going to soon update bootstrap-loader to a final V2.0.0 for this! Stay tuned, and check the [issues](https://github.com/shakacode/bootstrap-loader/issues) for ongoing discussions! And please contribute!**

# bootstrap-loader

Successor to [bootstrap-sass-loader](https://github.com/shakacode/bootstrap-sass-loader). Load Bootstrap styles and scripts in your Webpack bundle. This loader uses SASS to process CSS styles. Bootstrap 3 & 4 are supported.

**NOTE:** [Bootstrap 4](http://v4-alpha.getbootstrap.com/), (twbs/bootstrap)[https://github.com/twbs/bootstrap] is currently in alpha right now. Bootstrap 4 definitely worked when we first released this package. The parent company of this product, [ShakaCode](http://www.shakacode.com) had originally planned to use it for our upcoming commercial product, but we decided that Bootstrap 4 was changing too fast for a production product. Thus, we're still using Bootstrap 3, and we're not actively developing with Bootstrap 4. Consequently, for Bootstrap 4 issues, we need one of:

1. Community support to help us with Bootstrap 4 issues and pull requests.
2. We'd be thrilled to have another maintainer join us to help with Bootstrap 4 issues.
3. We'd also be thrilled if any companies are open to sponsoring the development of features and issues regarding Bootstrap 4.
 
That being said, Bootstrap 4 probably works just fine! You must use `4.0.0-alpha.4` or greater.

## NEWS
2017-03-15: All examples in /examples are updated for Webpack v2 and yarn. We're not supporting beta versions of Webpack. Some older releases did support it. So if you upgrade, you have to update for the new 2.2.x+ version of Webpack.

2016-10-30: Released 1.3.0. Supports multiple config files in one build.

2016-10-02: Released 2.0.0-beta.12. Supports isomorphic-style-loader and disabling SASS source map and/or resolve-url-loader injection!

2016-09-10: Released 2.0.0-beta.11 with support for Bootstrap 4, alpha 4!

2016-08-02: Released 2.0.0-beta Updated to support Webpack 2.1 beta and Webpack ExtractTextPlugin 2.0 beta!

2016-08-01: Released 1.1.0. Supports custom bootstraprc location.

## Table of Contents

+ [Installation](#installation)
+ [Usage](#usage)
  - [Bootstrap 4 internal dependency solution](#bootstrap-4-internal-dependency-solution)
+ [Examples](#examples)
+ [Common configuration options](#common-configuration-options)
  - [Bootstrap 3 & 4](#bootstrap-3-4)
  - [Bootstrap 4 only](#bootstrap-4-only)
    * [Tether](#tether)
    * [PostCSS](#postcss)
    * [Glyphicon alternatives](#glyphicon-alternatives)
+ [Additional configurations](#additional-configurations)
  - [Paths to custom assets](#paths-to-custom-assets)
  - [Incorporating Bootswatch themes](#incorporating-bootswatch-themes)
  - [jQuery](#jquery)
  - [Icon fonts](#icon-fonts)
+ [FAQ](#faq)
  - [Using Bootstrap mixins and variables](#using-bootstrap-mixins-and-variables)
+ [Contributing](#contributing)
+ [License](#license)
+ [Examples and related libraries](#examples-and-related-libraries)
+ [Useful Q&A](#useful-qa)

## Installation
Get it via npm:

```bash
npm install bootstrap-loader
```

Don't forget to install these dependencies (use `--save or --save-dev` option per your needs to update your `package.json`):

```bash
# Bootstrap 3
npm install --save-dev bootstrap-sass

# or Bootstrap 4
npm install --save-dev bootstrap@v4.0.0-alpha.4

# Note, alpha.3 is broken, and alpha.2 is no longer supported

# Node SASS & other loaders needed to handle styles
npm install --save-dev css-loader node-sass resolve-url-loader sass-loader style-loader url-loader

# Additional loaders required for Bootstrap 4 & Webpack 2
npm install --save-dev imports-loader exports-loader
```

If you're using Bootstrap 4, you probably need:

```bash
npm install --save-dev postcss-loader
```


## Usage
Simply require it:

```js
require('bootstrap-loader');
```

Or add `bootstrap-loader` as [a module in an entry point](https://webpack.github.io/docs/configuration.html#entry) in your webpack config (you'll need Webpack 2.1 beta and higher):

```js
entry: [ 'bootstrap-loader', './app' ]
```

Config is optional. If used, by default it should be placed in your project's root dir with name `.bootstraprc`. You can write it in `YAML` or `JSON` formats. Take a look at the default config files for [Bootstrap 3](.bootstraprc-3-default) and [Bootstrap 4](.bootstraprc-4-default). Note, we recommend using a configuration or else you might pick up unwanted upgrades, such as when we make Bootstrap 4 the default. Config options don't fall back on the defaults once a config file is present. Be sure not to delete config options. To start with a custom config, copy over a default config file as a starting point.

If the default location doesn't work for you (e.g. you want to create multiple bootstrap configs for branding variations or you symlink your npm_modules directory), you may pass the **absolute path** of the `.bootstraprc` file to the loader in your webpack config, e.g. `bootstrap-loader/lib/bootstrap.loader?extractStyles&configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`.

Note that :`__dirname` is a [global variable](https://nodejs.org/docs/latest/api/globals.html#globals_dirname) that Node sets for us. It is "the name of the directory that the currently executing script resides in."

```yaml
---
# You can use comments here
useFlexbox: true

styleLoaders:
  - style-loader
  - css-loader
  - sass-loader

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

  "styleLoaders": ["style-loader", "css-loader", "sass-loader"],

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

### Bootstrap 4 internal dependency solution

Because of Bootstrap 4's removal of UMD, internal dependencies, such as Popover's dependencies on Tooltip and Dropdown's dependency on Utils, are no longer naively resolved by Webpack (See Issue [#172](https://github.com/shakacode/bootstrap-loader/issues/172). In order to solve this issue, add the following code to your webpack configuration:
```
plugins: [
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",
    Tether: "tether",
    "window.Tether": "tether",
    Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
    Button: "exports-loader?Button!bootstrap/js/dist/button",
    Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
    Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
    Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
    Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
    Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
    Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
    Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
    Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
    Util: "exports-loader?Util!bootstrap/js/dist/util",
  })
]
```

## Examples
Check out example apps in [`examples/`](examples) folder:

* Basic usage: [examples/basic](examples/basic)
 * See the `npm run bs4:customlocation` tasks for examples on how to pass your .bootstraprc config.
* With CSS Modules: [examples/css-modules](examples/css-modules) (This example shows off hot reloading with Babel 6 as well!)
* With multiple entries [examples/multiple-entries](examples/multiple-entries) with their own config.

## Common configuration options
Here are common options for Bootstrap 3 & 4.

### Bootstrap 3 & 4

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

Default: `[ 'style-loader', 'css-loader', 'sass-loader' ]`

Array of webpack loaders. `sass-loader` is required, order matters. In most cases the style loader should definitely go first and the sass loader should be last.

Note: Beginning with Webpack v2.1.0-beta.26, the '-loader' suffix is required for all loaders.
To maintain compatibility with older versions, all accepted style loaders (style, css, postcss, sass, resolve-url) are automatically appended with '-loader'.
It is recommended that you explicitly state the '-loader' suffix for every webpack loader in `styleLoaders` to ensure compatibility in the long term.

```yaml
styleLoaders:
  - style-loader
  - css-loader
  - sass-loader

# You can apply loader params here:
  - sass-loader?outputStyle=expanded
```

Different settings for different environments can be used.
```yaml
# It depends on value of NODE_ENV environment variable
env:
  development:
    styleLoaders:
      - style-loader
      - css-loader
      - resolve-url-loader
      - sass-loader
  production:
    styleLoaders:
      - style-loader
      - css-loader
      - sass-loader
```

#### `extractStyles`

Default: `false`

Extract styles to stand-alone css file using `extract-text-webpack-plugin` version 2.0.0-beta or higher. See [extract-text-plugin](https://github.com/webpack/extract-text-webpack-plugin) for more details.

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

See [shakacode/react-webpack-rails-tutorial/blob/master/client/webpack.client.rails.build.config.](https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client/webpack.client.rails.build.config.js) for a working example which is deployed to [www.reactrails.com](http://www.reactrails.com/).

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


### Bootstrap 4 only
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

#### Glyphicon alternatives
Glyphicons have been removed from Bootstrap 4. The examples demonstrate how to use the font-awesome-loader

## Additional configurations

#### Paths to custom assets
If you use `bootstrap-loader` to load your styles (via `preBootstrapCustomizations`, `bootstrapCustomizations` & `appStyles`) and you load custom assets (fonts, images etc.), then you can use relative paths inside `url` method (relative to SASS file, from which you load asset).

This was made possible thanks to [resolve-url-loader](https://github.com/bholloway/resolve-url-loader). In common case you don't have to do anything special to apply it — we are doing it internally (just don't forget to install it). But if you want to use its custom settings, please provide it explicitly via `styleLoaders` option in `.bootstraprc`:

```yaml
styleLoaders:
  - style-loader
  - css-loader?sourceMap
  - resolve-url-loader?sourceMap
  - sass-loader?sourceMap
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
If you want to use Bootstrap's JS scripts — you have to provide `jQuery` to Bootstrap JS modules using `imports-loader`. To avoid having to include `jQuery` in your project you can disable all scripts (see [scripts](#scripts)).

```js
module: {
  loaders: [
    // Use one of these to serve jQuery for Bootstrap scripts:

    // Bootstrap 3
    { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, loader: 'imports-loader?jQuery=jquery' },

    // Bootstrap 4
    { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
  ],
},
```

Note: if you're not concerned about Windows, the lines look like this (simpler regexp pattern):

```js
// Boostrap 3
{ test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports-loader?jQuery=jquery' },

// Bootstrap 4
{ test: /bootstrap\/dist\/js\/umd\//, loader: 'imports-loader?jQuery=jquery' },
```


#### Icon fonts
Bootstrap uses **icon fonts**. If you want to load them, don't forget to setup `url-loader` or `file-loader` in webpack config:

```js
module: {
  loaders: [
    { test: /\.(woff2?|svg)$/, loader: 'url-loader?limit=10000' },
    { test: /\.(ttf|eot)$/, loader: 'file-loader' },
  ],
},
```

## FAQ

### Using Bootstrap mixins and variables

You should use `sass-resources-loader` in your `webpack` config.

In your `webpack.config.js`:
```javascript
module.exports = {

  // stuff removed for clarity ...

  module: {
    loaders: [
      // stuff removed for clarity ...
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]' +
          '!sass-loader' +
          '!sass-resources-loader'
        ),
      },
      // stuff removed for clarity ...
    ],
  },

  // stuff removed for clarity ...

  sassResources: './config/sass-resources.scss',
}
```

And in your `./config/sass-resources.scss`:
```
// Make variables and mixins available when using CSS modules.
@import "node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_variables";
@import "node_modules/bootstrap-sass/assets/stylesheets/bootstrap/_mixins";
```

You can then use mixins and variables from Bootstrap in your own code.

### Using a custom location for bootstrap module

By default, `bootstrap-loader` will try to resolve `bootstrap` from where `bootstrap-loader` has been installed. In [certain situations](https://github.com/shakacode/bootstrap-loader/issues/254) (e.g. npm linking, using a custom package installer) it may not be resolvable. In this case, you can pass in the location manually.

```js
require('bootstrap-loader?bootstrapPath=/path/to/bootstrap');

// or

entry: [ 'bootstrap-loader?bootstrapPath=/path/to/bootstrap', './app' ]
```

## Contributing
See [Contributing](CONTRIBUTING.md) to get started.

## License
MIT.

## Examples and related libraries
* [react-webpack-rails-tutorial](https://github.com/shakacode/react-webpack-rails-tutorial/), live example at [www.reactrails.com](http://www.reactrails.com/).
* [sass-resources-loader](https://github.com/shakacode/sass-resources-loader/)
* [Simple integration example](./examples/basic)
* [React + hot reloading example: bootstrap-loader-css-modules-example](./examples/css-modules)
* [react_on_rails gem](https://github.com/shakacode/react_on_rails)

## Useful Q&A
* [Using CSS modules with Bootstrap](https://github.com/shakacode/bootstrap-loader/issues/9)
* [How would you use bootstrap styles to build css module styles](https://github.com/shakacode/bootstrap-loader/issues/12)

We'll identify issues that are [questions](https://github.com/shakacode/bootstrap-loader/issues?utf8=%E2%9C%93&q=is%3Aissue+label%3Aquestion).

---

Aloha from Justin Gordon ([bio](http://www.railsonmaui.com/about)) and the [ShakaCode](http://www.shakacode.com) Team! We're actively looking for new projects involving React, React-Native, and Rails. Please contact me at [justin@shakacode.com](mailto:justin@shakacode.com) if we could potentially help you in any way. Besides consulting on bigger projects, [ShakaCode](http://www.shakacode.com) is doing Skype plus Slack/Github based coaching for React on Rails. See our blog post [Can ShakaCode Help You?](https://blog.shakacode.com/can-shakacode-help-you-4a5b1e5a8a63#.jex6tg9w9) for more information.

We're offering a free half-hour project consultation, on anything from React on Rails to any aspect of web application development for both consumer and enterprise products. In addition to React.js and Rails, we're doing React-Native iOS and Android apps!

Whether you have a new project or need help on an existing project, feel free to contact me directly at [justin@shakacode.com](mailto:justin@shakacode.com) and thanks in advance for any referrals!

Your support keeps this project going.
