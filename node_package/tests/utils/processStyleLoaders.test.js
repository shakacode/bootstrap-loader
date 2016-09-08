import test from 'tape';
import pSL from '../../../src/utils/processStyleLoaders';

test('pSL throws an error if given parameter is not an array', (assert) =>{
  assert.throws(() => {pSL(3)}, /Specify your loaders as an array/);
	assert.end();
});

test('pSL throws an error if given array does not include "sass"', (assert) =>{
  assert.throws(() => {pSL(['url'])}, /I can't find 'sass-loader'./);
	assert.end();
});

test('pSL works as expected', (assert) =>{
  assert.deepEquals(pSL(['sass?sourceMap', 'resolve-url']), ['sass?sourceMap', 'resolve-url']);
  assert.deepEquals(pSL(['other', 'sass']), ['other', 'resolve-url', 'sass?sourceMap']);
  assert.deepEquals(pSL(['other', 'sass?other']), ['other', 'resolve-url', 'sass?other&sourceMap']);
  assert.deepEquals(pSL(['sass?sourceMap']), ['resolve-url', 'sass?sourceMap']);
	assert.end();
});