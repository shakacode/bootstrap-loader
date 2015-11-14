import path from 'path';

export default (configFile, bootstrapVersion) => (
  path.resolve(__dirname, `../../${configFile}-${bootstrapVersion}-default`)
);
