import test from 'tape';
import path from 'path';
import rM from '../../../src/utils/resolveModule';

test('rM works as expected', (assert) =>{
  assert.equals(rM('tape'), path.join(`${__dirname}`, '../../../node_modules/tape'));
  assert.equals(rM('nonexistentModule'),false);
	assert.end();
});