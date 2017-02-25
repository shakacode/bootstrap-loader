import test from 'tape';
import path from 'path';
import fs from 'fs';
import buildExtractStylesLoader from '../../../src/utils/buildExtractStylesLoader';

test('buildExtractStylesLoader throws error if ary doesnt have "style-" at ary[0]', (assert) => {
  assert.throws(() => { buildExtractStylesLoader(['some-loader', 'some-other-loader']); }, Error(`
If you want to use 'extract-text-webpack-plugin', make sure
your 'styleLoaders' array starts with 'style' or 'isomorphic-style' at index 0.
    `));
  assert.end();
});

test('buildExtractStylesLoader runs as expected', (assert) => {
  assert.equals(buildExtractStylesLoader(['style-loader', 'url-loader', 'css-loader']),
    `${fs.realpathSync(path.join(__dirname, '../../../node_modules/extract-text-webpack-plugin'))}/loader.js?{"omit":1,"remove":true}!style-loader!url-loader!css-loader!`,
  );
  assert.equals(buildExtractStylesLoader(['isomorphic-style-loader', 'url-loader', 'css-loader']),
    `${fs.realpathSync(path.join(__dirname, '../../../node_modules/extract-text-webpack-plugin'))}/loader.js?{"omit":1,"remove":true}!isomorphic-style-loader!url-loader!css-loader!`,
  );
  assert.end();
});
