import test from 'tape';
import createBootstrapImport from '../../../src/utils/createBootstrapImport';

test('createBootstrapImport creates valid import address for Bootstrap 2', (assert) => {
  assert.equals(createBootstrapImport('module', 2, '/'), '@import "/scss/_module";');
  assert.end();
});

test('createBootstrapImport creates valid import address for Bootstrap 3', (assert) => {
  assert.equals(
    createBootstrapImport('module', 3, '/'),
    '@import "/assets/stylesheets/bootstrap/_module";',
  );
  assert.end();
});
