import resolve from 'resolve';
import logger from './logger';
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
    logger.debug('resolveModule error is ', error);
    return false;
  }
}
