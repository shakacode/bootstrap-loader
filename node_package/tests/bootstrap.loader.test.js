import test from 'tape';
//import X from '../../../src/bootstrap.loader.js';

test('', (assert) =>{
  assert.throws(() => {require('../../lib/bootstrap.loader!../../no-op.js');}, /You might want to pass the full path/);
	assert.end();
});