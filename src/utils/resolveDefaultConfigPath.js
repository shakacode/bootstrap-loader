import path from 'path';

const CONFIG_FILE = '.bootstraprc';

/**
 * Resolves default config for default Bootstrap version
 *
 * @param {string} configFile
 * @param {number} bootstrapPathotstrapVersion
 * @returns {string}
 */
export default (bootstrapVersion) => (
  path.resolve(__dirname, `../../${CONFIG_FILE}-${bootstrapVersion}-default`)
);
