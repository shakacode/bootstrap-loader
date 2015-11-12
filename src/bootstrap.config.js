import path from 'path';

import fileExists from './utils/fileExists';
import parseConfig from './utils/parseConfig';
import selectModules from './utils/selectModules';
import selectUserModules from './utils/selectUserModules';
import getEnvProp from './utils/getEnvProp';

/* ======= Fetching config */

const CONFIG_FILE = '.bootstraprc';

const defaultConfigPath = path.resolve(__dirname, `../${CONFIG_FILE}`);
const userConfigPath = path.resolve(__dirname, `../../../${CONFIG_FILE}`);

const isUserConfig = fileExists(userConfigPath);

const defaultConfig = parseConfig(defaultConfigPath);
const rawConfig = isUserConfig ? parseConfig(userConfigPath) : defaultConfig;


/* ======= Exports */

export const bootstrapVersion = parseInt(rawConfig.bootstrapVersion, 10);
export const loglevel = rawConfig.loglevel;

export function createConfig({ bootstrapPath, extractStyles }) {
  if (isUserConfig) {
    return {
      bootstrapPath,
      bootstrapVersion,
      loglevel,
      useFlexbox: rawConfig.useFlexbox,
      preBootstrapCustomizations: rawConfig.preBootstrapCustomizations,
      bootstrapCustomizations: rawConfig.bootstrapCustomizations,
      extractStyles: extractStyles || getEnvProp('extractStyles', rawConfig),
      styleLoaders: rawConfig.styleLoaders,
      styles: selectUserModules(rawConfig.styles, defaultConfig.styles),
      scripts: selectUserModules(rawConfig.scripts, defaultConfig.scripts),
    };
  }

  return {
    bootstrapPath,
    bootstrapVersion,
    loglevel,
    useFlexbox: defaultConfig.useFlexbox,
    extractStyles: extractStyles || getEnvProp('extractStyles', defaultConfig),
    styleLoaders: defaultConfig.styleLoaders,
    styles: selectModules(defaultConfig.styles),
    scripts: selectModules(defaultConfig.scripts),
  };
}
