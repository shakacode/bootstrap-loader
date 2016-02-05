/* eslint func-names: 0 */

import processModules from './utils/processModules';
import getFontsPath from './utils/getFontsPath';
import createUserImport from './utils/createUserImport';
import createBootstrapImport from './utils/createBootstrapImport';
import logger from './utils/logger';

/**
 * Bootstrap SASS styles loader
 *
 * @returns {string}
 */
module.exports = function() {
  if (this.cacheable) this.cacheable();

  const config = global.__BOOTSTRAP_CONFIG__;
  const bootstrapVersion = parseInt(config.bootstrapVersion, 10);
  const {
    styles,
    bootstrapRelPath,
    useFlexbox,
    useCustomIconFontPath,
    preBootstrapCustomizations,
    bootstrapCustomizations,
    appStyles,
  } = config;

  const processedStyles = [];

  if (bootstrapVersion === 4 && useFlexbox) {
    processedStyles.push('$enable-flex: true;');
  }

  if (styles.indexOf('mixins') > -1) {
    processedStyles.push(
      createBootstrapImport('mixins', bootstrapVersion, bootstrapRelPath)
    );
  }

  if (preBootstrapCustomizations) {
    processedStyles.push(
      createUserImport(preBootstrapCustomizations, this)
    );
  }

  processedStyles.push(
    createBootstrapImport('variables', bootstrapVersion, bootstrapRelPath)
  );

  if (bootstrapVersion === 3 && !useCustomIconFontPath) {
    processedStyles.push(
      `$icon-font-path: "${getFontsPath(bootstrapRelPath, this)}";`
    );
  }

  if (bootstrapCustomizations) {
    processedStyles.push(
      createUserImport(bootstrapCustomizations, this)
    );
  }

  const bootstrapStyles = (
    processModules(styles, bootstrapVersion, bootstrapRelPath)
  );
  const userStyles = (
    appStyles ? createUserImport(appStyles, this) : ''
  );

  const stylesOutput = (
    processedStyles
      .concat(bootstrapStyles, userStyles)
      .map(style => style.replace(/\\/g, '/') + '\n')
      .join('')
  );

  logger.debug('Styles output:', '\n', stylesOutput);

  return stylesOutput;
};
