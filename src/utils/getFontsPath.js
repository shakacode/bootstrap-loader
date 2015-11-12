import path from 'path';

export default (bootstrapPath, webpack) => {
  const relPathToBootstrap = path.relative(webpack.context, bootstrapPath);
  return path.join(relPathToBootstrap, 'assets', 'fonts', 'bootstrap');
};
