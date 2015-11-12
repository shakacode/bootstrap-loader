import createBootstrapImport from './createBootstrapImport';
import createBootstrapRequire from './createBootstrapRequire';

export default (modules, bootstrapVersion, bootstrapPath, isScripts) => {
  const processModule = (
    isScripts ? createBootstrapRequire : createBootstrapImport
  );

  return (
    modules
      .map(module => processModule(module, bootstrapVersion, bootstrapPath))
      .join('\n')
  );
};
