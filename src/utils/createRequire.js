/**
 * Creates Node require string
 *
 * @param {string} module
 * @returns {string}
 */
export default module => `require (${JSON.stringify(module)});`;
