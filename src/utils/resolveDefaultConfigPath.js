import path from 'path';

/**
 * Resolves default config for default Bootstrap version
 *
 * @param {string} configFile
 * @param {number} bootstrapPathotstrapVersion
 * @returns {string}
 */
export default (configFile, bootstrapVersion) => (
  path.resolve(__dirname, `../../${configFile}-${bootstrapVersion}-default`)
);
