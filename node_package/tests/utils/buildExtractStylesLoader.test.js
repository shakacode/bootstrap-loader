import test from 'tape';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import buildExtractStylesLoader from '../../../src/utils/buildExtractStylesLoader';

test('buildExtractStylesLoader runs as expected', assert => {
  assert.equals(
    buildExtractStylesLoader(['css-loader', 'postcss-loader']),
    `${MiniCssExtractPlugin.loader}!css-loader!postcss-loader!`,
  );
  assert.end();
});
