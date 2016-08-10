import fs from 'fs';
import yaml from 'js-yaml';
import stripComments from 'strip-json-comments';

/**
 * Parses config in YAML or JSON formats
 *
 * @param {string} configPath
 * @returns {Object}
 */
export default function(configPath) {  
  try {
    const configContent = JSON.stringify(require(configPath));
  } catch (e) {
    const configContent = stripComments(fs.readFileSync(configPath, 'utf8'));
  }

  return yaml.safeLoad(configContent);
}
