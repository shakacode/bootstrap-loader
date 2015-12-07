import path from 'path';

/**
 * Creates SASS @import of user module and adds is as dependency
 *
 * @param {string} module
 * @param {Object} webpack
 * @returns {string}
 */
export default function(module, webpack) {
  const userModule = path.relative(webpack.context, module);
  webpack.addDependency(userModule);
  return `@import "${userModule}";`;
}
