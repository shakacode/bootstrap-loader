import test from 'tape';
import cBR from '../../../src/utils/createBootstrapRequire';

test('cBR creates valid require statement for Bootstrap 2', (assert => {
  assert.equals(cBR('module', 2, '/'), 'require ("/dist/js/umd/module");');
  assert.end();
}));

test('cBR creates valid require statement for Bootstrap 3', (assert => {
  assert.equals(cBR('module', 3, '/'), 'require ("/assets/javascripts/bootstrap/module");');
  assert.end();
}));