import test from 'tape';
import cReateRequire from '../../../src/utils/createRequire';

test('cReateRequire creates a valid require statement', (assert) => {
  assert.equals(cReateRequire('test'), 'require ("test");');
  assert.end();
});
