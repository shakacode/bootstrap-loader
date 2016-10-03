import test from 'tape';
import processStyleLoaders from '../../../src/utils/processStyleLoaders';

test('processStyleLoaders throws an error if given parameter is not an array', (assert) => {
  assert.throws(() => { processStyleLoaders({ loaders: 3 }); }, /Specify your loaders as an array/);
  assert.end();
});

test('processStyleLoaders throws an error if given array does not include "sass"', (assert) => {
  assert.throws(() => { processStyleLoaders({ loaders: ['url'] }); }, /can't find 'sass-loader'./);
  assert.end();
});

test('processStyleLoaders works as expected', (assert) => {
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['sass?sourceMap', 'resolve-url'],
    }),
    ['sass?sourceMap', 'resolve-url']
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
    }),
    ['other', 'resolve-url', 'sass?sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
      disableSassSourceMap: true,
    }),
    ['other', 'resolve-url', 'sass']
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass?sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass'],
      disableSassSourceMap: true,
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass']
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
    }),
    ['other', 'resolve-url', 'sass?other&sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
      disableSassSourceMap: true,
    }),
    ['other', 'resolve-url', 'sass?other']
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass?other&sourceMap']
  );
  assert.deepEquals(
    processStyleLoaders({
      loaders: ['other', 'sass?other'],
      disableSassSourceMap: true,
      disableResolveUrlLoader: true,
    }),
    ['other', 'sass?other']
  );

  assert.deepEquals(
    processStyleLoaders({
      loaders: ['sass?sourceMap'],
    }),
    ['resolve-url', 'sass?sourceMap']
  );
  assert.end();
});
