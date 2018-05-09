import test from 'tape';
import selectUserModules from '../../../src/utils/selectUserModules';

test('selectUserModules returns false if first parameter ~= false', assert => {
  assert.equals(selectUserModules(false, {}), false);
  assert.equals(selectUserModules('False', {}), false);
  assert.end();
});

test('selectUserModules returns array of second param keys if first param === true', assert => {
  assert.deepEquals(selectUserModules(true, { 1: 2, 3: 4 }), ['1', '3']);
  assert.end();
});

test('selectUserModules returns ary of first param keys if first param is an object', assert => {
  assert.deepEquals(selectUserModules({ 1: 2, 3: 4 }, 'unused'), ['1', '3']);
  assert.end();
});
