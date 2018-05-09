import test from 'tape';
import getFontsPath from '../../../src/utils/getFontsPath';

test('getFontsPath works as expected', assert => {
  assert.equals(getFontsPath('../'), '../assets/fonts/bootstrap/');
  assert.end();
});
