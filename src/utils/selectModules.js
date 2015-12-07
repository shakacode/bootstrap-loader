/**
 * Turns Object with names of modules into Array of names of modules
 *
 * @param {Object} modules
 * @returns {string[]}
 */
export default modules => (
  Object
    .keys(modules)
    .filter(module => modules[module])
);
