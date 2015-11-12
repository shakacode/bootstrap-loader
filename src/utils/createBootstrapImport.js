import path from 'path';

export default (module, bootstrapPath) => {
  const bootstrapModule = path.join(bootstrapPath, 'scss', `_${module}`);
  return `@import "${bootstrapModule}";`;
};
