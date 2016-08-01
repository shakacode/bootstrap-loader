/**
 * Gets environment dependent property from config
 *
 * @param {string} prop
 * @param {Object} config
 * @returns {*}
 */
export default function(prop, config) {
  if (config.hasOwnProperty(prop)) {
    return config[prop];
  }

  const NODE_ENV = process.env.NODE_ENV;
  const configEnvSection = config.env && config.env[NODE_ENV];

  if (configEnvSection && configEnvSection.hasOwnProperty(prop)) {
    return configEnvSection[prop];
  }
  return false;
}
