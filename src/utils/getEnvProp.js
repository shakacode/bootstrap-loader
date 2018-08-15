/**
 * Gets environment dependent property from config
 *
 * @param {string} prop
 * @param {Object} config
 * @returns {*}
 */
export default function(prop, config) {
  const { NODE_ENV } = process.env;
  const configEnvSection = config.env && config.env[NODE_ENV];

  if (configEnvSection && prop in configEnvSection) {
    return configEnvSection[prop];
  }

  if (prop in config) {
    return config[prop];
  }

  return false;
}
