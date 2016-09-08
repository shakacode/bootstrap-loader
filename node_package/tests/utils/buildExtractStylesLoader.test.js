import test from 'tape';
import bESL from '../../../src/utils/buildExtractStylesLoader';

test('buildExtractStylesLoader throws error if "styleLoaders" array doesn\'t have "style-loader" at index 0', (assert) => {
    
  assert.throws(() => {bESL(['some-loader', 'some-other-loader'])}, Error(`
If you want to use 'extract-text-webpack-plugin' make sure
your 'styleLoaders' array have 'style-loader' at index 0.
    `));
  assert.end();
});

/*test('throws error if extract-text-webpack-plugin is not a global require', (assert) => {
    
  assert.throws(() => {bESL(['style-loader'])}, Error(`
Could not find 'extract-text-webpack-plugin' module.
Make sure it's installed in your 'node_modules/' directory.
    `));
  assert.end();
});*/

test('buildExtractStylesLoader runs as expected', (assert) => {
  const path = require('path');

  assert.equals(bESL(['style-loader', 'url-loader', 'css-loader']),
  path.join(`${__dirname}`, '../../../node_modules/extract-text-webpack-plugin/loader.js?{"omit":1,"remove":true}!style!url-loader!css-loader!'));
  assert.end();
});