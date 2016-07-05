// Very similar to webpack.prod.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const BOOTSTRAPRC_LOCATION = process.argv.find(val => val.includes('--BOOTSTRAPRC_LOCATION')).split('=')[1];

if (!BOOTSTRAPRC_LOCATION) {
  // eslint-disable-next-line no-console
  console.log('This script requires a \'BOOTSTRAPRC_LOCATION\' arg.');
  throw new Error('This script requires a \'BOOTSTRAPRC_LOCATION\' arg.');
}

module.exports = {

  entry: [
    'webpack-hot-middleware/client',
    'tether',
    'font-awesome-loader',
    [
      'bootstrap-loader/lib/bootstrap.loader?',
      `extractStyles&configFilePath=${__dirname}/${BOOTSTRAPRC_LOCATION}`,
      '!bootstrap-loader/no-op.js'
    ].join(''),
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
