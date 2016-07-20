// Very similar to webpack.prod.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const bootstraprcCustomLocation = () => {
  const matchedArgument = process.argv.find(val => val.includes('--bootstraprc-location'));
  return matchedArgument && matchedArgument.split('=')[1];
}();
var defaultBootstraprcFileExists;

try {
  fs.statSync('./.bootstraprc');
  defaultBootstraprcFileExists = true;
} catch (e) {
  defaultBootstraprcFileExists = false;
}

if (!bootstraprcCustomLocation && !defaultBootstraprcFileExists) {
  // eslint-disable-next-line no-console
  console.log('This script requires a \'bootstraprc-location\' arg or a ./.boostraprc file in the root.');
  throw new Error('This script requires a \'bootstraprc-location\' arg or a ./.boostraprc file in the root.');
}

const bootstrapEntryPoint = [];
if (bootstraprcCustomLocation) {
  bootstrapEntryPoint.push(...[
    'bootstrap-loader/lib/bootstrap.loader?',
    `configFilePath=${__dirname}/${bootstraprcCustomLocation}`,
    '!bootstrap-loader/no-op.js'
  ]);
} else {
  bootstrapEntryPoint.push('bootstrap-loader');
}

// eslint-disable-next-line no-console
console.log(`=> bootstrap-loader configuration: ${bootstrapEntryPoint.join('')}`);

module.exports = {

  entry: [
    'webpack-hot-middleware/client',
    'tether',
    'font-awesome-loader',
    bootstrapEntryPoint.join(''),
    './app/scripts/app',
  ],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  },

  devtool: '#cheap-module-eval-source-map',

  resolve: { extensions: [ '', '.js' ] },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
  ],

  module: {
    loaders: [
      { test: /\.css$/, loaders: [ 'style', 'css', 'postcss' ] },
      { test: /\.scss$/, loaders: [ 'style', 'css', 'postcss', 'sass' ] },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000"
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file'
      },

      // Use one of these to serve jQuery for Bootstrap scripts:

      // Bootstrap 4
      { test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery' },

      // Bootstrap 3
      { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
    ],
  },

  postcss: [ autoprefixer ],

};
