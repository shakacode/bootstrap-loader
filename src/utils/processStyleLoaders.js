/*  */

import escapeRegExp from 'escape-regexp';

/**
 * Injects 'resolve-url-loader' and 'sourceMap' param for 'sass-loader'
 *
 * @param {string[]} loaders
 * @returns {string[]}
 */
export default function({ loaders, disableSassSourceMap, disableResolveUrlLoader }) {
  if (!Array.isArray(loaders)) {
    throw new Error(`
Specify your loaders as an array.
Default is ['style', 'css', 'sass']
    `);
  }

  if (disableSassSourceMap && disableResolveUrlLoader) {
    return loaders;
  }

  // We need to match user loaders in different formats:
  // 'sass', 'sass-loader', 'sass?someParam' etc.
  const getLoaderRegExp = module => (
    new RegExp(`^${escapeRegExp(module)}(?:-loader)?(?:\\?.*)?$`)
  );


  const sassLoaderRegExp = getLoaderRegExp('sass');
  let sassLoader = (
    loaders.find(loader => sassLoaderRegExp.test(loader))
  );
  const sassLoaderIndex = loaders.indexOf(sassLoader);

  if (!disableSassSourceMap) {
    if (!sassLoader) {
      throw new Error(`
        I can't find 'sass-loader'.
        Add it to array of loaders in .bootstraprc.
      `);
    }

    const sassLoaderQuery = sassLoader.split('?')[1];

    // Enforce '-loader' suffix to support older webpack versions
    if (!sassLoader.startsWith('sass-loader')) {
      sassLoader = `sass-loader${sassLoaderQuery}`;
    }

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


    // eslint-disable-next-line no-param-reassign
    loaders[sassLoaderIndex] = sassLoaderWithSourceMap;
  }

  if (!disableResolveUrlLoader) {
    const resolveUrlLoaderRegExp = getLoaderRegExp('resolve-url');
    const resolveUrlLoader = (
      loaders.find(loader => resolveUrlLoaderRegExp.test(loader))
    );

    if (!resolveUrlLoader) {
      loaders.splice(sassLoaderIndex, 0, 'resolve-url-loader');
    }
  }

  return loaders;
}
