import path from 'path';
import fs from 'fs';
import jsYaml from 'js-yaml';
import stripComments from 'strip-json-comments';

import fileExists from './utils/fileExists';
import selectModules from './utils/selectModules';
import selectUserModules from './utils/selectUserModules';
import getEnvProp from './utils/getEnvProp';

/* ======= Fetching config */

const DEFAULT_VERSION = 3;
const SUPPORTED_VERSIONS = [3, 4];
const CONFIG_FILE = '.bootstraprc';

function resolveDefaultConfigPath(bootstrapVersion) {
  return path.resolve(__dirname, `../${CONFIG_FILE}-${bootstrapVersion}-default`);
}

function parseConfigFile(configFilePath) {
  const configContent = stripComments(fs.readFileSync(configFilePath, 'utf8'));
  const config = jsYaml.safeLoad(configContent);

  if (!config) {
    throw new Error(`Config file cannot be parsed: ${configFilePath}'`);
  }

  return config;
}

function readDefaultConfig() {
  let configFilePath;

  const defaultUserConfigPath = path.resolve(__dirname, `../../../${CONFIG_FILE}`);

  if (fileExists(defaultUserConfigPath)) {
    configFilePath = defaultUserConfigPath;
  } else {
    configFilePath = resolveDefaultConfigPath(DEFAULT_VERSION);
  }

  const defaultConfig = parseConfigFile(configFilePath);

  return {
    defaultConfig,
    configFilePath,
  };
}

function readUserConfig(customConfigFilePath) {
  const userConfig = parseConfigFile(customConfigFilePath);

  const { bootstrapVersion } = userConfig;

  if (!bootstrapVersion) {
    throw new Error(`
Bootstrap version not found in your '.bootstraprc'.
Make sure it's set to 3 or 4. Like this:
  bootstrapVersion: 4
    `);
  }

  if (SUPPORTED_VERSIONS.indexOf(parseInt(bootstrapVersion, 10)) === -1) {
    throw new Error(`
Unsupported Bootstrap version in your '.bootstraprc'.
Make sure it's set to 3 or 4. Like this:
  bootstrapVersion: 4
    `);
  }

  const defaultConfigFilePath = resolveDefaultConfigPath(bootstrapVersion);
  const defaultConfig = parseConfigFile(defaultConfigFilePath);

  return {
    userConfig,
    defaultConfig,
  };
}


/* ======= Exports */
export default function createConfig({
  extractStyles,
  customConfigFilePath,
}) {
  if (!customConfigFilePath) { // .bootstraprc or .bootstraprc-{3,4}-default
    const { defaultConfig, configFilePath } = readDefaultConfig();
    return {
      bootstrapVersion: parseInt(defaultConfig.bootstrapVersion, 10),
      loglevel: defaultConfig.loglevel,
      useFlexbox: defaultConfig.useFlexbox,
      useCustomIconFontPath: defaultConfig.useCustomIconFontPath,
      extractStyles: extractStyles || getEnvProp('extractStyles', defaultConfig),
      styleLoaders: defaultConfig.styleLoaders,
      styles: selectModules(defaultConfig.styles),
      scripts: selectModules(defaultConfig.scripts),
      configFilePath,
    };
  }

  // otherwise read user provided config file
  const configFilePath = path.resolve(__dirname, customConfigFilePath);
  const { userConfig, defaultConfig } = readUserConfig(configFilePath);
  const configDir = path.dirname(configFilePath);
  const preBootstrapCustomizations = (
    userConfig.preBootstrapCustomizations &&
    path.resolve(configDir, userConfig.preBootstrapCustomizations)
  );
  const bootstrapCustomizations = (
    userConfig.bootstrapCustomizations &&
    path.resolve(configDir, userConfig.bootstrapCustomizations)
  );
  const appStyles = (
    userConfig.appStyles &&
    path.resolve(configDir, userConfig.appStyles)
  );

  return {
    bootstrapVersion: parseInt(userConfig.bootstrapVersion, 10),
    loglevel: userConfig.loglevel,
    preBootstrapCustomizations,
    bootstrapCustomizations,
    appStyles,
    useFlexbox: userConfig.useFlexbox,
    useCustomIconFontPath: userConfig.useCustomIconFontPath,
    extractStyles: extractStyles || getEnvProp('extractStyles', userConfig),
    styleLoaders: userConfig.styleLoaders,
    styles: selectUserModules(userConfig.styles, defaultConfig.styles),
    scripts: selectUserModules(userConfig.scripts, defaultConfig.scripts),
    configFilePath,
  };
}
