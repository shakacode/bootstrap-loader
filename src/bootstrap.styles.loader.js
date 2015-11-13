/* eslint func-names: 0 */

import path from 'path';

import processModules from './utils/processModules';
import getFontsPath from './utils/getFontsPath';
import createUserImport from './utils/createUserImport';
import createBootstrapImport from './utils/createBootstrapImport';

module.exports = function() {
  if (this.cacheable) this.cacheable();

  const config = global.__BOOTSTRAP_CONFIG__;
  const bootstrapVersion = parseInt(config.bootstrapVersion, 10);
  const {
    styles,
    bootstrapPath,
    useFlexbox,
    preBootstrapCustomizations,
    bootstrapCustomizations,
  } = config;

  const bootstrapRelPath = path.relative(this.context, bootstrapPath);

  const processedStyles = [];

  if (bootstrapVersion === 4 && useFlexbox) {
    processedStyles.push('$enable-flex: true;');
  }

  if (preBootstrapCustomizations) {
    processedStyles.push(
      createUserImport(preBootstrapCustomizations, this)
    );
  }

  processedStyles.push(
    createBootstrapImport('variables', bootstrapVersion, bootstrapRelPath)
  );

  if (bootstrapVersion === 3) {
    processedStyles.push(
      `$icon-font-path: "${getFontsPath(bootstrapRelPath, this)}";`
    );
  }

  if (bootstrapCustomizations) {
    processedStyles.push(
      createUserImport(bootstrapCustomizations, this)
    );
  }

  return (
    processedStyles
      .join('\n')
      .concat(
        processModules(styles, bootstrapVersion, bootstrapRelPath)
      )
  );
};
