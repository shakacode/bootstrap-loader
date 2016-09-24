import test from 'tape';
import selectModules from '../../../src/utils/selectModules';

test('selectModules works as expected', (assert) => {
  assert.deepEquals(selectModules({ a: 'b', c: 'd' }), ['a', 'c']);
  assert.end();
});
