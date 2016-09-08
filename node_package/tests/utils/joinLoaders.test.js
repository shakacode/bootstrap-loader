import test from 'tape';
import jL from '../../../src/utils/joinLoaders';

test('jL throws an error if given parameter is not an array', (assert) =>{
  assert.throws(() => {jL(3)}, /Specify your loaders as an array/);
	assert.end();
});

test('jL maps & joins given loader array', (assert) =>{
  assert.equals(jL(['style', 'url', 'css']), 'style!url!css!');
	assert.end();
});