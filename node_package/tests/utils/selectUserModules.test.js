import test from 'tape';
import sUM from '../../../src/utils/selectUserModules';

test('sUM returns false if first parameter ~= false', (assert) =>{
  assert.equals(sUM(false, {}), false);
  assert.equals(sUM("False", {}), false);
	assert.end();
});

test('sUM returns array of second parameter keys if first parameter === true', (assert) =>{
  assert.deepEquals(sUM(true, {1: 2, 3: 4}), ['1', '3']);
	assert.end();
});

test('sUM returns array of first parameter keys if first parameter is an object', (assert) =>{
  assert.deepEquals(sUM({1: 2, 3: 4}, "unused"), ['1', '3']);
	assert.end();
});