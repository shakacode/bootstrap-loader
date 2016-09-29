import test from 'tape';
import path from 'path';
import buildExtractStylesLoader from '../../../src/utils/buildExtractStylesLoader';

test('buildExtractStylesLoader throws error if ary doesnt have "style-" at ary[0]', (assert) => {
  assert.throws(() => { buildExtractStylesLoader(['some-loader', 'some-other-loader']); }, Error(`
If you want to use 'extract-text-webpack-plugin' make sure
your 'styleLoaders' array have 'style-loader' at index 0.
    `));
  assert.end();
});

test('buildExtractStylesLoader runs as expected', (assert) => {
  assert.equals(buildExtractStylesLoader(['style-loader', 'url-loader', 'css-loader']),
    path.join(
      `${__dirname}`,
      '../../../node_modules/extract-text-webpack-plugin' +
      '/loader.js?{"omit":1,"extract":true,"remove":true}!style!url-loader!css-loader!'
    )
  );
  assert.end();
});
