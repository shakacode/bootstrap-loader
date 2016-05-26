import test from 'tape';
import proxyquire from 'proxyquire';
import { userConfigFileExists, createConfig } from '../../src/bootstrap.config.js';

test('userConfigFileExists returns true for files that exist', (assert) => {
  var fileExists = function (userConfigPath) {
    return true;
  };
  var bootstrapConfig = proxyquire('../../src/bootstrap.config.js', {
   './fileExists': fileExists
 });
 var result = bootstrapConfig.userConfigFileExists('../somePath');

 assert.equal(result, true);
});
