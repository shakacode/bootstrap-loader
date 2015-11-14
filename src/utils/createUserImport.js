import path from 'path';

export default function(module, webpack) {
  const userModule = path.relative(webpack.context, module);
  webpack.addDependency(userModule);
  return `@import "${userModule}";`;
}
