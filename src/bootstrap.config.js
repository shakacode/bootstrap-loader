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

  const rawConfig = parseConfig(configFilePath);

  if (!rawConfig) {
    throw new Error(`I cannot parse the config file at ${configFilePath}'`);
  }

  if (customConfigFilePath) {
    const { bootstrapVersion } = rawConfig;

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
    defaultConfig = rawConfig;
  }

  return {
    rawConfig,
    defaultConfig,
    configFilePath,
  };
}


/* ======= Exports */
export default function createConfig({
  extractStyles,
  customConfigFilePath,
}) {
  if (!customConfigFilePath) { // .bootstraprc or .bootstraprc-{3,4}-default
    const { rawConfig, defaultConfig, configFilePath } = setConfigVariables();
    return {
      bootstrapVersion: parseInt(rawConfig.bootstrapVersion, 10),
      loglevel: rawConfig.loglevel,
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
  const { rawConfig, defaultConfig } = setConfigVariables(configFilePath);
  const configDir = path.dirname(configFilePath);
  const preBootstrapCustomizations = (
    rawConfig.preBootstrapCustomizations &&
    path.resolve(configDir, rawConfig.preBootstrapCustomizations)
  );
  const bootstrapCustomizations = (
    rawConfig.bootstrapCustomizations &&
    path.resolve(configDir, rawConfig.bootstrapCustomizations)
  );
  const appStyles = (
    rawConfig.appStyles &&
    path.resolve(configDir, rawConfig.appStyles)
  );

  return {
    bootstrapVersion: parseInt(rawConfig.bootstrapVersion, 10),
    loglevel: rawConfig.loglevel,
    preBootstrapCustomizations,
    bootstrapCustomizations,
    appStyles,
    useFlexbox: rawConfig.useFlexbox,
    useCustomIconFontPath: rawConfig.useCustomIconFontPath,
    extractStyles: extractStyles || getEnvProp('extractStyles', rawConfig),
    styleLoaders: rawConfig.styleLoaders,
    styles: selectUserModules(rawConfig.styles, defaultConfig.styles),
    scripts: selectUserModules(rawConfig.scripts, defaultConfig.scripts),
    configFilePath,
  };
}
