import path from 'path';
import semver from 'semver';

export default function(bootstrapVersion, bootstrapPath) {
  const npmVersion = require(path.join(bootstrapPath, 'package.json')).version;

  return {
    version: npmVersion,
    allGood: semver.major(npmVersion) === bootstrapVersion,
  };
}
