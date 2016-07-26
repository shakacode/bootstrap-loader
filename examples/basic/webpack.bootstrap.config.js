'use strict';
const fs = require('fs');

function getBootstraprcCustomLocation() {
  const matchedArgument = process.argv.find(val => val.includes('--bootstraprc-location'));
  return matchedArgument && matchedArgument.split('=')[1];
}

const bootstraprcCustomLocation = getBootstraprcCustomLocation();

let defaultBootstraprcFileExists;

try {
  fs.statSync('./.bootstraprc');
  defaultBootstraprcFileExists = true;
} catch (e) {
  defaultBootstraprcFileExists = false;
}

if (!bootstraprcCustomLocation && !defaultBootstraprcFileExists) {
  throw new Error('This script requires a \'bootstraprc-location\' arg or a ./.boostraprc file in the root.');
}

// DEV and PROD have slightly different configurations
let bootstrapDevEntryPoint;
if (bootstraprcCustomLocation) {
 bootstrapDevEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?' +
    `configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
    '!bootstrap-loader/no-op.js';
} else {
  bootstrapDevEntryPoint = 'bootstrap-loader';
}

let bootstrapProdEntryPoint;
if (bootstraprcCustomLocation) {
 bootstrapProdEntryPoint = 'bootstrap-loader/lib/bootstrap.loader?extractStyles' +
   `&configFilePath=${__dirname}/${bootstraprcCustomLocation}` +
   '!bootstrap-loader/no-op.js';
} else {
  bootstrapProdEntryPoint = 'bootstrap-loader/extractStyles';
}

module.exports = {
  dev: bootstrapDevEntryPoint,
  prod: bootstrapProdEntryPoint,
};
