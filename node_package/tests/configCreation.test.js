import test from 'tape';
import { userConfigFileExists } from '../../src/bootstrap.config.js';

test('userConfigFileExists returns true for files that exist', (assert) => {
  const result = userConfigFileExists(`${__dirname}/configCreation.test.js`);

  assert.plan(1);
  assert.equal(result, true);
  assert.end();
});
