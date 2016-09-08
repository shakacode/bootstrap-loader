import test from 'tape';
import joinLoaders from '../../../src/utils/joinLoaders';

test('joinLoaders throws an error if given parameter is not an array', (assert) => {
  assert.throws(() => { joinLoaders(3); }, /Specify your loaders as an array/);
  assert.end();
});

test('joinLoaders maps & joins given loader array', (assert) => {
  assert.equals(joinLoaders(['style', 'url', 'css']), 'style!url!css!');
  assert.end();
});
