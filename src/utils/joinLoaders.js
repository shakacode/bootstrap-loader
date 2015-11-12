export default loaders => (
  Array.isArray(loaders) && loaders.join('!') + '!'
);
