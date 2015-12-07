import path from 'path';

/**
 * Creates SASS @import string for bootstrap module
 *
 * @param {string} module
 * @param {number} bootstrapVersion
 * @param {string} bootstrapPath
 * @returns {string}
 */
export default function(module, bootstrapVersion, bootstrapPath) {
  const stylesPath = (
    parseInt(bootstrapVersion, 10) === 3 ?
    ['assets', 'stylesheets', 'bootstrap'] :
    ['scss']
  );
  const bootstrapModule = path.join(bootstrapPath, ...stylesPath, `_${module}`);
  return `@import "${bootstrapModule}";`;
}
