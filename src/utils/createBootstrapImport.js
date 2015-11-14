import path from 'path';

export default function(module, bootstrapVersion, bootstrapPath) {
  const stylesPath = (
    parseInt(bootstrapVersion, 10) === 3 ?
    ['assets', 'stylesheets', 'bootstrap'] :
    ['scss']
  );
  const bootstrapModule = path.join(bootstrapPath, ...stylesPath, `_${module}`);
  return `@import "${bootstrapModule}";`;
}
