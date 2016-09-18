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
    processStyleLoaders(['sass?sourceMap', 'resolve-url'], undefined, undefined),
    ['sass?sourceMap', 'resolve-url']
  );

  assert.deepEquals(
    processStyleLoaders(['other', 'sass'], undefined, undefined),
    ['other', 'resolve-url', 'sass?sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass'], true, undefined),
    ['other', 'resolve-url', 'sass']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass'], undefined, true),
    ['other', 'sass?sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass'], true, true),
    ['other', 'sass']
  );

  assert.deepEquals(
    processStyleLoaders(['other', 'sass?other'], undefined, undefined),
    ['other', 'resolve-url', 'sass?other&sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass?other'], true, undefined),
    ['other', 'resolve-url', 'sass?other']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass?other'], undefined, true),
    ['other', 'sass?other&sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders(['other', 'sass?other'], true, true),
    ['other', 'sass?other']
  );

  assert.deepEquals(
    processStyleLoaders(['sass?sourceMap'], undefined, undefined),
    ['resolve-url', 'sass?sourceMap']
  );
  assert.end();
});
