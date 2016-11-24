/**
 * Builds loader string to extract styles with 'extract-text-webpack-plugin'
 *
 * @param   {string[]} loaders
 * @returns {string}
 */

export default function(loaders) {
  let fallbackLoader;
  if (loaders[0].startsWith('style')) {
    fallbackLoader = 'style-loader';
  } else if (loaders[0].startsWith('isomorphic-style')) {
    fallbackLoader = 'isomorphic-style-loader';
  } else {
    throw new Error(`
If you want to use 'extract-text-webpack-plugin', make sure
your 'styleLoaders' array starts with 'style' or 'isomorphic-style' at index 0.
    `);
  }

  let ExtractTextPlugin;
  try {
    // eslint-disable-next-line global-require
    ExtractTextPlugin = require('extract-text-webpack-plugin');
  } catch (error) {
    throw new Error(`
Could not find 'extract-text-webpack-plugin' module.
Make sure it's installed in your 'node_modules/' directory.
Error: ${error}
`);
  }
  const restLoaders = (
    loaders
      .slice(1)
      .map(loader => `${loader}!`)
      .join('')
  );
  return ExtractTextPlugin.extract({ fallbackLoader, loader: restLoaders });
}
