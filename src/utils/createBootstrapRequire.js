import path from 'path';

export default function(module, bootstrapVersion, bootstrapPath) {
  const scriptsPath = (
    parseInt(bootstrapVersion, 10) === 3 ?
    ['assets', 'javascripts', 'bootstrap'] :
    ['dist', 'js', 'umd']
  );
  const bootstrapModule = path.join(bootstrapPath, ...scriptsPath, module);
  return `require (${JSON.stringify(bootstrapModule)});`;
}
