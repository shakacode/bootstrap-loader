import test from 'tape';
import processStyleLoaders from '../../../src/utils/processStyleLoaders';

test('processStyleLoaders throws an error if given parameter is not an array', (assert) => {
  assert.throws(() => { processStyleLoaders(3); }, /Specify your loaders as an array/);
  assert.end();
});

test('processStyleLoaders throws an error if given array does not include "sass"', (assert) => {
  assert.throws(() => { processStyleLoaders(['url']); }, /I can't find 'sass-loader'./);
  assert.end();
});

test('processStyleLoaders works as expected', (assert) => {
  assert.deepEquals(
    processStyleLoaders(['sass?sourceMap', 'resolve-url']),
    ['sass?sourceMap', 'resolve-url']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass']),
    ['other', 'resolve-url', 'sass?sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass?other']),
    ['other', 'resolve-url', 'sass?other&sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders(['sass?sourceMap']),
    ['resolve-url', 'sass?sourceMap']
  );
  assert.end();
});
