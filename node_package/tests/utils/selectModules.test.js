import test from 'tape';
import sM from '../../../src/utils/selectModules';

test('sM works as expected', (assert) =>{
  assert.deepEquals(sM({'a': 'b', 'c': 'd'}), ['a', 'c']);
	assert.end();
});