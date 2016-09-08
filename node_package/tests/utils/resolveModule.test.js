import test from 'tape';
import path from 'path';
import resolveModule from '../../../src/utils/resolveModule';

test('resolveModule works as expected', (assert) => {
  assert.equals(resolveModule('tape'), path.join(`${__dirname}`, '../../../node_modules/tape'));
  assert.equals(resolveModule('nonexistentModule'), false);
  assert.end();
});
