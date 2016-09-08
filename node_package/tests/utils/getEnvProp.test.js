import test from 'tape';
import gEP from '../../../src/utils/getEnvProp';

test('gEP(a,b) returns b[a] if a in b', (assert) =>{
  let prop = 3;
  let config = {3: true};
  assert.equals(gEP(prop, config), true);
  assert.end();
});

test('gEP(a,b) returns b.env.(process.env.NODE_ENV)[a] if a in b.env.(process.env.NODE_ENV)', (assert) =>{
  const NODE_ENV = process.env.NODE_ENV;
  let prop = 3;
  let config = {env: {}};
  config.env[NODE_ENV] = {3: true};
  
  assert.equals(gEP(prop, config), true);
  assert.end();
});

test('gEP(a,b) returns false if neither case above is true', (assert) =>{
  const NODE_ENV = process.env.NODE_ENV;
  let prop = 3;
  let config = {env: {}};
  config.env[NODE_ENV] = {4: true};
  
  assert.equals(gEP(prop, config), false);
  assert.end();
});