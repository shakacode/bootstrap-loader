/* eslint-disable import/no-extraneous-dependencies */
// Very similar to webpack.prod.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client',
    'font-awesome-loader',
    'bootstrap-loader',
    './app/startup/App',
  ],
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
    publicPath: '/assets/',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
          'sass-resources-loader?resources=app/assets/styles/resources.scss',
        ],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
};
