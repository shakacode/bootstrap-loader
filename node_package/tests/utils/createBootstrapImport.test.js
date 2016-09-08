import test from 'tape';
import cBI from '../../../src/utils/createBootstrapImport';

test('cBI creates valid import address for Bootstrap 2', (assert) => {
    assert.equals(cBI('module', 2, '/'), '@import "/scss/_module";');
    assert.end();
});

test('cBI creates valid import address for Bootstrap 3', (assert) => {
    assert.equals(cBI('module', 3, '/'), '@import "/assets/stylesheets/bootstrap/_module";');
    assert.end();
});