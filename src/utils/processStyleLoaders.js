/*  */

import escapeRegExp from 'escape-regexp';

// Ensures '-loader' suffix for loaders in config for webpack compatibility
const ensureLoadersSuffix = loadersArray => {
  const loaderSuffixRegExp = new RegExp('^style-loader.*$|^css-loader.*$|^postcss-loader.*$|^sass-loader.*$|^resolve-url-loader.*$');
  const suffixReplaceRegExp = new RegExp('^style|^css|^postcss|^sass|^resolve-url');
  return loadersArray.map(loader => {
    if (!loaderSuffixRegExp.test(loader)) {
      return loader.replace(suffixReplaceRegExp, match => `${match}-loader`);
    }
    return loader;
  });
};

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

  const loadersWithSuffix = ensureLoadersSuffix(loaders);

  if (disableSassSourceMap && disableResolveUrlLoader) {
    return loadersWithSuffix;
  }

  // We need to match user loaders in different formats:
  // 'sass', 'sass-loader', 'sass?someParam' etc.
  const getLoaderRegExp = module => (
    new RegExp(`^${escapeRegExp(module)}(?:-loader)?(?:\\?.*)?$`)
  );


  const sassLoaderRegExp = getLoaderRegExp('sass');
  const sassLoader = (
    loadersWithSuffix.find(loader => sassLoaderRegExp.test(loader))
  );
  const sassLoaderIndex = loadersWithSuffix.indexOf(sassLoader);

  if (!disableSassSourceMap) {
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


    // eslint-disable-next-line no-param-reassign
    loadersWithSuffix[sassLoaderIndex] = sassLoaderWithSourceMap;
  }

  if (!disableResolveUrlLoader) {
    const resolveUrlLoaderRegExp = getLoaderRegExp('resolve-url');
    const resolveUrlLoader = (
      loadersWithSuffix.find(loader => resolveUrlLoaderRegExp.test(loader))
    );

    if (!resolveUrlLoader) {
      loadersWithSuffix.splice(sassLoaderIndex, 0, 'resolve-url-loader');
    }
  }

  return loadersWithSuffix;
}
