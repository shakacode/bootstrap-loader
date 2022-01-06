/* eslint func-names: 0 */
import loaderUtils from 'loader-utils';
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

  logger.debug('Styles input config:', '\n', this.query);

  const config = loaderUtils.getOptions(this) || {};
  const bootstrapVersion = parseInt(config.bootstrapVersion, 10);
  const {
    styles,
    bootstrapPath,
    useCustomIconFontPath,
    preBootstrapCustomizations,
    bootstrapCustomizations,
    appStyles,
  } = config;

  const processedStyles = [];

  if (styles.indexOf('mixins') > -1) {
    processedStyles.push(createBootstrapImport('mixins', bootstrapVersion, bootstrapPath));
  }

  if (preBootstrapCustomizations) {
    processedStyles.push(createUserImport(preBootstrapCustomizations, this));
  }

  if (bootstrapVersion === 4) {
    processedStyles.push(createBootstrapImport('functions', bootstrapVersion, bootstrapPath));
  }

  processedStyles.push(createBootstrapImport('variables', bootstrapVersion, bootstrapPath));

  if (bootstrapVersion === 3 && !useCustomIconFontPath) {
    processedStyles.push(`$icon-font-path: "${getFontsPath(bootstrapPath, this)}";`);
  }

  if (bootstrapCustomizations) {
    processedStyles.push(createUserImport(bootstrapCustomizations, this));
  }

  const bootstrapStyles = processModules(styles, bootstrapVersion, bootstrapPath);
  const userStyles = appStyles ? createUserImport(appStyles, this) : '';

  const stylesOutput = processedStyles
    .concat(bootstrapStyles, userStyles)
    .map(style => `${style.replace(/\\/g, '/')}\n`)
    .join('');

  logger.debug('Styles output:', '\n', stylesOutput);

  return stylesOutput;
};
