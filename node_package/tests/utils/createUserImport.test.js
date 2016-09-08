import test from 'tape';
import cUI from '../../../src/utils/createUserImport';

test('cUI runs as expected', (assert) =>{
  var webpack = {
    context: '/object/context',
    dependencies: [],
    addDependency: function(path) {
      this.dependencies.push(path);
    }
  };
  
  assert.equals(cUI('/module', webpack), '@import "../../module";');
  assert.deepEquals(webpack.dependencies, ['../../module']);
  assert.end();
});