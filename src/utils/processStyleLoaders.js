/*  */

import escapeRegExp from 'escape-regexp';

/**
 * Injects 'resolve-url-loader' and 'sourceMap' param for 'sass-loader'
 *
 * @param {string[]} loaders
 * @returns {string[]}
 */
export default function(loaders) {
  if (!Array.isArray(loaders)) {
    throw new Error(`
      Specify your loaders as an array.
      Default is ['style', 'css', 'sass']
    `);
  }

  // We need to match user loaders in different formats:
  // 'sass', 'sass-loader', 'sass?someParam' etc.
  const getLoaderRegExp = module => (
    new RegExp('^' + escapeRegExp(module) + '(?:-loader)?(?:\\?.*)?$')
  );
  const sassLoaderRegExp = getLoaderRegExp('sass');
  const resolveUrlLoaderRegExp = getLoaderRegExp('resolve-url');

  const sassLoader = (
    loaders.find(loader => sassLoaderRegExp.test(loader))
  );
  const resolveUrlLoader = (
    loaders.find(loader => resolveUrlLoaderRegExp.test(loader))
  );

  if (!sassLoader) {
    throw new Error(`
      I can't find 'sass-loader'.
      Add it to array of loaders in .bootstraprc.
    `);
  }

  const sassLoaderQuery = sassLoader.split('?')[1];

  // We need to check if user's loader already contains sourceMap param
  // And if it's not there - inject it
  let sassLoaderWithSourceMap;
  if (sassLoaderQuery) {
    sassLoaderWithSourceMap = (
      sassLoaderQuery.includes('sourceMap') ?
      sassLoader :
      `${sassLoader}&sourceMap`
    );
  } else {
    sassLoaderWithSourceMap = `${sassLoader}?sourceMap`;
  }

  const sassLoaderIndex = loaders.indexOf(sassLoader);

  loaders[sassLoaderIndex] = sassLoaderWithSourceMap;

  if (!resolveUrlLoader) {
    loaders.splice(sassLoaderIndex, 0, 'resolve-url');
  }

  return loaders;
}
