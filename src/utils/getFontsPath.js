import path from 'path';

/**
 * Builds path to Bootstrap fonts
 *
 * @param {string} bootstrapRelPath
 * @returns {string}
 */
export default bootstrapRelPath => (
  path.join(bootstrapRelPath, 'assets', 'fonts', 'bootstrap/')
);
