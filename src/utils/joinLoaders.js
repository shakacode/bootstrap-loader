/**
 * Joins array of loaders to Webpack's string format
 *
 * @param {string[]} loaders
 * @returns {string}
 */
export default function(loaders) {
  if (!Array.isArray(loaders)) {
    throw new Error(`
      Specify your loaders as an array.
      Default is ['style', 'css', 'scss']
    `);
  }

  return (
    loaders
      .map(loader => loader + '!')
      .join('')
  );
}
