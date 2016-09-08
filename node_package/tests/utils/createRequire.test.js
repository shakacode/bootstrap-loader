import test from 'tape';
import cR from '../../../src/utils/createRequire';

test('cR creates a valid require statement', (assert) => {
  assert.equals(cR('test'), 'require ("test");');
  assert.end();
});