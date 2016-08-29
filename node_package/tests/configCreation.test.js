import test from 'tape';
import fileExists from '../../src/utils/fileExists';

test('userConfigFileExists returns true for files that exist', (assert) => {
  const result = fileExists(`${__dirname}/configCreation.test.js`);

  assert.plan(1);
  assert.equal(result, true);
  assert.end();
});
