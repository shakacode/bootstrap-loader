export default (loader, query) => (
  require.resolve(`../${loader}`) + '?' + JSON.stringify(query) + '!'
);
