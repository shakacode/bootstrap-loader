import path from 'path';

export default (module, webpack) => {
  const userModule = path.relative(webpack.context, module);
  webpack.addDependency(userModule);
  return `@import "${userModule}";`;
};
