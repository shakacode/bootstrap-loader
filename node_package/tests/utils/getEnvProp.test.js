import test from 'tape';
import getEnvProp from '../../../src/utils/getEnvProp';

test('getEnvProp(a,b) returns b[a] if a in b', (assert) => {
  const prop = 3;
  const config = { 3: true };
  assert.equals(getEnvProp(prop, config), true);
  assert.end();
});

test('getEnvProp(a,b) returns web.env.config[var] if var in web.env.config', (assert) => {
  const NODE_ENV = process.env.NODE_ENV;
  const prop = 3;
  const config = { env: {} };
  config.env[NODE_ENV] = { 3: true };

  assert.equals(getEnvProp(prop, config), true);
  assert.end();
});

test('getEnvProp(a,b) returns false if neither case above is true', (assert) => {
  const NODE_ENV = process.env.NODE_ENV;
  const prop = 3;
  const config = { env: {} };
  config.env[NODE_ENV] = { 4: true };

  assert.equals(getEnvProp(prop, config), false);
  assert.end();
});
