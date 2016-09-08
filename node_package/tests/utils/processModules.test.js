import test from 'tape';
import pM from '../../../src/utils/processModules';

test('pM filters out mixins', (assert) =>{
  assert.deepEquals(pM(['mixins'], 2, '/', false), []);
	assert.end();
});

test('pM processes scripts correctly', (assert) =>{
  assert.deepEquals(pM(['module'], 2, '/', true), ['require ("/dist/js/umd/module");']);
	assert.end();
});

test('pM processes modules correctly', (assert) =>{
  assert.deepEquals(pM(['module'], 2, '/', false), ['@import "/scss/_module";']);
	assert.end();
});