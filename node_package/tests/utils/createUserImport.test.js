import test from 'tape';
import createUserImport from '../../../src/utils/createUserImport';

test('createUserImport runs as expected', assert => {
  const webpack = {
    context: '/object/context',
    dependencies: [],
    addDependency(path) {
      this.dependencies.push(path);
    },
  };

  assert.equals(createUserImport('/module', webpack), '@import "../../module";');
  assert.deepEquals(webpack.dependencies, ['/module']);
  assert.end();
});
