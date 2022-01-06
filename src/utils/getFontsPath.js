import path from 'path';

/**
 * Builds path to Bootstrap fonts
 *
 * @param {string} bootstrapPath
 * @returns {string}
 */
export default bootstrapPath => path.join(bootstrapPath, 'assets', 'fonts', 'bootstrap/');
