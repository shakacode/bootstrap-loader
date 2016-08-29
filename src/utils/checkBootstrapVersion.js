import path from 'path';
import semver from 'semver';

/**
 * Checks Bootstrap version
 *
 * @param   {number} bootstrapVersion
 * @param   {string} bootstrapPath
 * @returns {Object}
 */
export default function(bootstrapVersion, bootstrapPath) {
  // eslint-disable-next-line global-require
  const npmVersion = require(path.join(bootstrapPath, 'package.json')).version;

  return {
    version: npmVersion,
    allGood: semver.major(npmVersion) === bootstrapVersion,
  };
}
