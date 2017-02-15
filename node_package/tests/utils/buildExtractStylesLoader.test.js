import test from 'tape';
import path from 'path';
import buildExtractStylesLoader from '../../../src/utils/buildExtractStylesLoader';

test('buildExtractStylesLoader throws error if ary doesnt have "style-" at ary[0]', (assert) => {
  assert.throws(() => { buildExtractStylesLoader(['some-loader', 'some-other-loader']); }, Error(`
If you want to use 'extract-text-webpack-plugin', make sure
your 'styleLoaders' array starts with 'style' or 'isomorphic-style' at index 0.
    `));
  assert.end();
});

test('buildExtractStylesLoader runs as expected', (assert) => {
  const rootPath = path.join(__dirname, '../../..');
  assert.deepEqual(buildExtractStylesLoader(['style-loader', 'url-loader', 'css-loader']),
    [{ loader: `${rootPath}/node_modules/extract-text-webpack-plugin/loader.js`,
      options: { omit: 1, remove: true } },
     { loader: 'style-loader' },
     { loader: 'url-loader' },
     { loader: 'css-loader' },
     { loader: '' }],
  );
  assert.deepEqual(buildExtractStylesLoader(['isomorphic-style-loader', 'url-loader', 'css-loader']),
    [{ loader: `${rootPath}/node_modules/extract-text-webpack-plugin/loader.js`,
      options: { omit: 1, remove: true } },
     { loader: 'isomorphic-style-loader' },
     { loader: 'url-loader' },
     { loader: 'css-loader' },
     { loader: '' }],
  );
  assert.end();
});
