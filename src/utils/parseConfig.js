import fs from 'fs';
import yaml from 'js-yaml';
import stripComments from 'strip-json-comments';

export default function(configPath) {
  const configContent = stripComments(fs.readFileSync(configPath, 'utf8'));
  return yaml.safeLoad(configContent);
}
