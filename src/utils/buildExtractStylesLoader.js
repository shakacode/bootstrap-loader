/**
 * Builds loader string to extract styles with 'extract-text-webpack-plugin'
 *
 * @param   {string[]} loaders
 * @returns {string}
 */

export default function(loaders) {
  let MiniCssExtractPlugin;
  try {
    // eslint-disable-next-line global-require
    MiniCssExtractPlugin = require('mini-css-extract-plugin');
  } catch (error) {
    throw new Error(`
Could not find 'mini-css-extract-plugin' module.
Make sure it's installed in your 'node_modules/' directory.
Error: ${error}
`);
  }
  return [MiniCssExtractPlugin.loader, loaders.map(loader => `${loader}!`).join('')].join('!');
}
