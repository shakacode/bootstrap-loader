import fs from 'fs';

/**
 * Checks if file exists
 *
 * @param {string} file
 * @returns {boolean}
 */
export default function(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (error) {
    return false;
  }
}
