import path from 'path';

export default (module, bootstrapPath) => {
  const bootstrapModule = path.join(bootstrapPath, 'dist', 'js', 'umd', module);
  return `require (${JSON.stringify(bootstrapModule)});`;
};
