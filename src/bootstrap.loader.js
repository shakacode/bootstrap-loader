/* eslint func-names: 0 */

import config from './bootstrap.config';
import resolveModule from './utils/resolveModule';
import createRequire from './utils/createRequire';

module.exports = function() {};

module.exports.pitch = function(source) {
  if (this.cacheable) this.cacheable();

  // Resolve `bootstrap` package
  const bootstrapPath = resolveModule('bootstrap');

  if (!bootstrapPath) {
    throw new Error(`
      Could not find path to 'bootstrap' module.
      Make sure it's installed in your node_modules/ directory.
    `);
  }

  const result = [ createRequire(source) ];

  // Handle styles
  if (config.styles) {
    const commonLoaders = (
      Array.isArray(config.styleLoader) ?
      config.styleLoader.map(loader => '!' + loader).join('') :
      '!style!css!sass'
    );
    const stylesLoader = (
      require.resolve('./bootstrap.styles.loader') +
      `?bootstrapPath=${bootstrapPath}`
    );
    const styles = `${commonLoaders}!${stylesLoader}!${source}`;

    result.push(createRequire(styles));
  }

  // Handle scripts
  if (config.scripts) {
    const scriptsLoader = (
      require.resolve('./bootstrap.scripts.loader') +
      `?bootstrapPath=${bootstrapPath}`
    );
    const scripts = `!${scriptsLoader}!${source}`;

    result.push(createRequire(scripts));
  }

  return result.join('\n');
};
