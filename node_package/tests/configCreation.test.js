import test from 'tape';
import proxyquire from 'proxyquire';
import { userConfigFileExists, createConfig } from '../../src/bootstrap.config.js';

test('userConfigFileExists returns true for files that exist', (assert) => {
  assert.plan(1);
  console.log(__dirname + 'configCreation.test.js');
  var result = userConfigFileExists(__dirname + '/configCreation.test.js');

  assert.equal(result, true);
  assert.end();
});
