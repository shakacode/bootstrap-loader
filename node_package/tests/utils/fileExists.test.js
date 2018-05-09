import test from 'tape';
import fileExists from '../../../src/utils/fileExists';

test('fileExists returns true for files that exist', assert => {
  const result = fileExists(`${__dirname}/fileExists.test.js`);

  assert.equal(result, true);
  assert.end();
});
