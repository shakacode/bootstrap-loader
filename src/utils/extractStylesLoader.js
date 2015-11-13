export default loaders => {
  if (!loaders[0].startsWith('style')) {
    throw new Error(`
      If you want to use ExtractTextPlugin make sure
      your 'styleLoaders' array have 'style-loader' at index 0.
    `);
  }

  try {
    const ExtractTextPlugin = require('extract-text-webpack-plugin');
    const args = loaders.slice(1).map(loader => loader + '!').join('');
    return ExtractTextPlugin.extract('style', args);
  } catch (error) {
    throw new Error(`
      Could not find ExtractTextPlugin module.
      Make sure it's installed in your 'node_modules/' directory.
    `);
  }
};
