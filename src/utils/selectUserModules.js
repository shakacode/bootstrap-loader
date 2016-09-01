import selectModules from './selectModules';

/**
 * Picks Bootstrap modules from config
 *
 * @param {(boolean|Object)} userModules
 * @param {Object} defaultModules
 * @returns {string[]}
 */
export default function(userModules, defaultModules) {
  if (!userModules || userModules.toString().toLowerCase() === 'false') return false;

  if (typeof userModules === 'boolean') {
    return selectModules(defaultModules);
  }

  return selectModules(userModules);
}
