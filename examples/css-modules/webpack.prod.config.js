/* eslint-disable import/no-extraneous-dependencies */
// Very similar to webpack.dev.config.js. Common parts could be extracted to a base config.
// See example at:
// https://github.com/shakacode/react-webpack-rails-tutorial/blob/master/client%2Fwebpack.client.base.config.js
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

// eslint-disable-next-line no-console
console.log(`=> bootstrap-loader configuration: ${bootstrapEntryPoints.prod}`);

module.exports = {
  // For production build we want to extract CSS to stand-alone file
  // Provide `extractStyles` param and `bootstrap-loader` will handle it
  entry: ['font-awesome-loader', bootstrapEntryPoints.prod, 'tether', './app/startup/App'],

  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: 'app.js',
  },

  resolve: { extensions: ['*', '.js', '.jsx'] },

  plugins: [
    new ExtractTextPlugin({ filename: 'app.css', allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.ProvidePlugin({
      'window.Tether': 'tether',
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.LoaderOptionsPlugin({
      postcss: [autoprefixer],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]' +
            '!postcss-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use:
            'css-loader?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]' +
            '!postcss-loader' +
            '!sass-loader',
        }),
      },

      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // use: "url?limit=10000"
        use: 'url-loader',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
};
