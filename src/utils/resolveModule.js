import resolve from 'resolve';

/**
 * Resolves location of npm module
 *
 * @param {string} module
 * @returns {(string|boolean)}
 */
export default function(module) {
  try {
    let resolvedPath;
    resolve.sync(module, {
      packageFilter: (pkg, pathToModule) => {
        resolvedPath = pathToModule;
        return pkg;
      },
    });
    return resolvedPath;
  } catch (error) {
    return false;
  }
}
