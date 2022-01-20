/*  */

import escapeRegExp from 'escape-regexp';

// Ensures '-loader' suffix for loaders in config for webpack compatibility
const ensureLoadersSuffix = loadersArray => {
  const knownLoaderRegExp = new RegExp('^(style|css|postcss|sass|resolve-url)(?!-loader)(?=\\?|$)');
  return loadersArray.map(loader => {
    if (knownLoaderRegExp.test(loader)) {
      return loader.replace(knownLoaderRegExp, match => `${match}-loader`);
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
  const getLoaderRegExp = module => new RegExp(`^${escapeRegExp(module)}(?:-loader)?(?:\\?.*)?$`);

  const sassLoaderRegExp = getLoaderRegExp('sass');
  const sassLoader = loadersWithSuffix.find(loader => sassLoaderRegExp.test(loader));
  const sassLoaderIndex = loadersWithSuffix.indexOf(sassLoader);

  if (!disableResolveUrlLoader) {
    const resolveUrlLoaderRegExp = getLoaderRegExp('resolve-url');
    const resolveUrlLoader = loadersWithSuffix.find(loader => resolveUrlLoaderRegExp.test(loader));

    if (!resolveUrlLoader) {
      loadersWithSuffix.splice(sassLoaderIndex, 0, 'resolve-url-loader');
    }
  }

  return loadersWithSuffix;
}
