import path from 'path';

/**
 * Creates Node require string for Bootstrap module
 *
 * @param {string} module
 * @param {number} bootstrapVersion
 * @param {string} bootstrapPath
 * @returns {string}
 */
export default function(module, bootstrapVersion, bootstrapPath) {
  const scriptsPath = (
    parseInt(bootstrapVersion, 10) === 3 ?
    ['assets', 'javascripts', 'bootstrap'] :
    ['js', 'dist']
  );
  const bootstrapModule = path.join(bootstrapPath, ...scriptsPath, module);
  return `require (${JSON.stringify(bootstrapModule)});`;
}
