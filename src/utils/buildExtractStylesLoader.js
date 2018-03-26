/**
 * Builds loader string to extract styles with 'extract-text-webpack-plugin'
 *
 * @param   {string[]} loaders
 * @param   {object} bootstrap rc config
 * @returns {string}
 */

export default function (loaders, config) {
  const pluginName = (config.extractStylesOptions && config.extractStylesOptions.plugin) || 'extract-text-webpack-plugin';
  let fallbackLoader;
  if (loaders[0].startsWith('style')) {
    fallbackLoader = 'style-loader';
  } else if (loaders[0].startsWith('isomorphic-style')) {
    fallbackLoader = 'isomorphic-style-loader';
  } else {
    throw new Error(`
If you want to use ${pluginName}, make sure
your 'styleLoaders' array starts with 'style' or 'isomorphic-style' at index 0.
    `);
  }

  let ExtractTextPlugin;
  try {
    // eslint-disable-next-line global-require no-dynamic-require
    ExtractTextPlugin = require(pluginName);
  } catch (error) {
    throw new Error(`
Could not find ${pluginName} module.
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
  if (config.extractStylesOptions && config.extractStylesOptions.plugin !== 'extract-text-webpack-plugin') {
    return [ExtractTextPlugin.loader, restLoaders].join('!');
  }
  return [
    `${ExtractTextPlugin.loader().loader}?{"omit":1,"remove":true}`,
    fallbackLoader,
    restLoaders,
  ].join('!');
}
