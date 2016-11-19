const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    bs3: [
      'webpack-hot-middleware/client',
      'tether',
      'font-awesome-loader',
      `bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/bs3.yml!bootstrap-loader/no-op.js`,
      './app/scripts/app'
    ],
    bs4: [
      'webpack-hot-middleware/client',
      'tether',
      'font-awesome-loader',
      `bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/bs4.yml!bootstrap-loader/no-op.js`,
      './app/scripts/app'
    ]
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  resolve: {  extensions: ['*', '.js']  },
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
      {test: /bootstrap\/dist\/js\/umd\//, loader: 'imports?jQuery=jquery'},

      // Bootstrap 3
      {test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery'}]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      "window.Tether": "tether"
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    })
  ]
};
