import createBootstrapImport from './createBootstrapImport';
import createBootstrapRequire from './createBootstrapRequire';

/**
 * Wrapps array of modules into SASS @import or Node require
 *
 * @param {string[]} modules
 * @param {number} bootstrapVersion
 * @param {string} bootstrapPath
 * @param {boolean} isScripts
 * @returns {string[]}
 */
export default function(modules, bootstrapVersion, bootstrapPath, isScripts) {
  const processModule = isScripts ? createBootstrapRequire : createBootstrapImport;

  return modules
    .filter(module => module !== 'mixins')
    .map(module => processModule(module, bootstrapVersion, bootstrapPath));
}
