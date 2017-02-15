import test from 'tape';
import processModules from '../../../src/utils/processModules';

test('processModules filters out mixins', (assert) => {
  assert.deepEquals(processModules(['mixins'], 2, '/', false), []);
  assert.end();
});

test('processModules processes scripts correctly', (assert) => {
  assert.deepEquals(
    processModules(['module'], 2, '/', true),
    ['require ("/js/dist/module");'],
  );
  assert.end();
});

test('processModules processes modules correctly', (assert) => {
  assert.deepEquals(processModules(['module'], 2, '/', false), ['@import "/scss/_module";']);
  assert.end();
});
