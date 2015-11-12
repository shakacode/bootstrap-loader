import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import stripComments from 'strip-json-comments';

import fileExists from './utils/fileExists';


const CONFIG_FILE = '.bootstraprc';

const configDefaultPath = path.resolve(__dirname, `../${CONFIG_FILE}`);
const configUserPath = path.resolve(__dirname, `../../../${CONFIG_FILE}`);

const configPath = (
  fileExists(configUserPath) ? configUserPath : configDefaultPath
);

const configContent = stripComments(fs.readFileSync(configPath, 'utf8'));
const config = yaml.safeLoad(configContent);

export default config;
