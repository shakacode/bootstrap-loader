import path from 'path';

import fileExists from './utils/fileExists';
import resolveDefaultConfigPath from './utils/resolveDefaultConfigPath';
import parseConfig from './utils/parseConfig';
import selectModules from './utils/selectModules';
import selectUserModules from './utils/selectUserModules';
import getEnvProp from './utils/getEnvProp';

/* ======= Fetching config */

const DEFAULT_VERSION = 3;
const SUPPORTED_VERSIONS = [3, 4];
const CONFIG_FILE = '.bootstraprc';

const userConfigPath = path.resolve(__dirname, `../../../${CONFIG_FILE}`);
const isUserConfig = fileExists(userConfigPath);

let rawConfig;
let defaultConfig;

if (isUserConfig) {
  rawConfig = parseConfig(userConfigPath);

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

  const defaultConfigPath = (
    resolveDefaultConfigPath(CONFIG_FILE, bootstrapVersion)
  );
  defaultConfig = parseConfig(defaultConfigPath);
} else {
  const defaultConfigPath = (
    resolveDefaultConfigPath(CONFIG_FILE, DEFAULT_VERSION)
  );
  rawConfig = defaultConfig = parseConfig(defaultConfigPath);
}


/* ======= Exports */

export const bootstrapVersion = parseInt(rawConfig.bootstrapVersion, 10);
export const loglevel = rawConfig.loglevel;

export function createConfig({
  bootstrapPath,
  bootstrapRelPath,
  extractStyles,
}) {
  if (isUserConfig) {
    var configDir = path.dirname(userConfigPath);
    return {
      bootstrapPath,
      bootstrapRelPath,
      bootstrapVersion,
      loglevel,
      useFlexbox: rawConfig.useFlexbox,
      preBootstrapCustomizations: path.resolve(configDir, rawConfig.preBootstrapCustomizations),
      bootstrapCustomizations: path.resolve(configDir, rawConfig.bootstrapCustomizations),
      appStyles: path.resolve(configDir, rawConfig.appStyles),
      extractStyles: extractStyles || getEnvProp('extractStyles', rawConfig),
      styleLoaders: rawConfig.styleLoaders,
      styles: selectUserModules(rawConfig.styles, defaultConfig.styles),
      scripts: selectUserModules(rawConfig.scripts, defaultConfig.scripts),
    };
  }

  return {
    bootstrapPath,
    bootstrapRelPath,
    bootstrapVersion,
    loglevel,
    useFlexbox: defaultConfig.useFlexbox,
    extractStyles: extractStyles || getEnvProp('extractStyles', defaultConfig),
    styleLoaders: defaultConfig.styleLoaders,
    styles: selectModules(defaultConfig.styles),
    scripts: selectModules(defaultConfig.scripts),
  };
}
