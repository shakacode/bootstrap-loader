import test from 'tape';
import createBootstrapRequire from '../../../src/utils/createBootstrapRequire';

test('createBootstrapRequire creates valid require statement for Bootstrap 2', assert => {
  assert.equals(createBootstrapRequire('module', 2, '/'), 'require ("/js/dist/module");');
  assert.end();
});

test('createBootstrapRequire creates valid require statement for Bootstrap 3', assert => {
  assert.equals(
    createBootstrapRequire('module', 3, '/'),
    'require ("/assets/javascripts/bootstrap/module");',
  );
  assert.end();
});
