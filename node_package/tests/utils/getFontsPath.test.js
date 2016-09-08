import test from 'tape';
import gFP from '../../../src/utils/getFontsPath';

test('gFP works as expected', (assert) =>{
  assert.equals(gFP('../'), '../assets/fonts/bootstrap/');
	assert.end();
});