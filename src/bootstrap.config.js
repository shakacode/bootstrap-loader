import path from 'path';

import fileExists from './utils/fileExists';
import parseConfig from './utils/parseConfig';
import selectModules from './utils/selectModules';
import selectUserModules from './utils/selectUserModules';
import getEnvProp from './utils/getEnvProp';

/* ======= Fetching config */

const DEFAULT_VERSION = 3;
const SUPPORTED_VERSIONS = [3, 4];
const CONFIG_FILE = '.bootstraprc';
const defaultUserConfigPath = path.resolve(__dirname, `../../../${CONFIG_FILE}`);

function resolveDefaultConfigPath(bootstrapVersion) {
  return path.resolve(__dirname, `../${CONFIG_FILE}-${bootstrapVersion}-default`);
}

function setConfigVariables(customConfigFilePath) {
  let defaultConfig;
  let configFilePath;

  if (customConfigFilePath) {
    configFilePath = customConfigFilePath;
  } else if (fileExists(defaultUserConfigPath)) {
    configFilePath = defaultUserConfigPath;
  } else {
    configFilePath = resolveDefaultConfigPath(DEFAULT_VERSION);
  }

  const userConfig = parseConfig(configFilePath);

  if (!userConfig) {
    throw new Error(`I cannot parse the config file at ${configFilePath}'`);
  }

  if (customConfigFilePath) {
    const { bootstrapVersion } = userConfig;

    if (!bootstrapVersion) {
      throw new Error(`
        I can't find Bootstrap version in your '.bootstraprc'.
        Make sure it's set to 3 or 4. Like this:
          bootstrapVersion: 4
      `);
    }

    if (SUPPORTED_VERSIONS.indexOf(parseInt(bootstrapVersion, 10)) === -1) {
      throw new Error(`
        Looks like you have unsupported Bootstrap version in your '.bootstraprc'.
        Make sure it's set to 3 or 4. Like this:
          bootstrapVersion: 4
      `);
    }

    configFilePath = resolveDefaultConfigPath(bootstrapVersion);
    defaultConfig = parseConfig(configFilePath);
  } else {
    defaultConfig = userConfig;
  }

  return {
    userConfig,
    defaultConfig,
    configFilePath,
  };
}

function readUserConfig(customConfigFilePath) {
  const userConfig = parseConfig(customConfigFilePath);

  if (!userConfig) {
    throw new Error(`I cannot parse the config file at ${customConfigFilePath}'`);
  }

  const { bootstrapVersion } = userConfig;

  if (!bootstrapVersion) {
    throw new Error(`
      I can't find Bootstrap version in your '.bootstraprc'.
      Make sure it's set to 3 or 4. Like this:
        bootstrapVersion: 4
    `);
  }

  if (SUPPORTED_VERSIONS.indexOf(parseInt(bootstrapVersion, 10)) === -1) {
    throw new Error(`
      Looks like you have unsupported Bootstrap version in your '.bootstraprc'.
      Make sure it's set to 3 or 4. Like this:
        bootstrapVersion: 4
    `);
  }

  const defaultConfigFilePath = resolveDefaultConfigPath(bootstrapVersion);
  const defaultConfig = parseConfig(defaultConfigFilePath);

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
    const { userConfig, defaultConfig, configFilePath } = setConfigVariables();
    return {
      bootstrapVersion: parseInt(userConfig.bootstrapVersion, 10),
      loglevel: userConfig.loglevel,
      useFlexbox: defaultConfig.useFlexbox,
      useCustomIconFontPath: defaultConfig.useCustomIconFontPath,
      extractStyles: extractStyles || getEnvProp('extractStyles', defaultConfig),
      styleLoaders: defaultConfig.styleLoaders,
      styles: selectModules(defaultConfig.styles),
      scripts: selectModules(defaultConfig.scripts),
      configFilePath,
    };
  }

  // otherwise custom file
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
