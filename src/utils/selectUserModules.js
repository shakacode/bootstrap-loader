import selectModules from './selectModules';

/**
 * Picks Bootstrap modules from config
 *
 * @param {(boolean|Object)} userModules
 * @param {Object} defaultModules
 * @returns {string[]}
 */
export default function(userModules, defaultModules) {
  if (!userModules) return false;

  if (typeof userModules === 'boolean') {
    return selectModules(defaultModules);
  }

  return selectModules(userModules);
}
