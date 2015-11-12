import fs from 'fs';
import yaml from 'js-yaml';
import stripComments from 'strip-json-comments';

export default configPath => {
  const configContent = stripComments(fs.readFileSync(configPath, 'utf8'));
  return yaml.safeLoad(configContent);
};
