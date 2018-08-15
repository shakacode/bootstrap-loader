import test from 'tape';
import getEnvProp from '../../../src/utils/getEnvProp';

test('getEnvProp(prop, config) returns config[prop] if prop in config', assert => {
  const prop = 'PROP_NAME';
  const config = { PROP_NAME: true };
  assert.equals(getEnvProp(prop, config), true);
  assert.end();
});

test('getEnvProp(prop, config) returns web.env.config[prop] if prop in web.env.config', assert => {
  const { NODE_ENV } = process.env;
  const prop = 'PROP_NAME';
  const config = { env: {} };
  config.env[NODE_ENV] = { PROP_NAME: true };

  assert.equals(getEnvProp(prop, config), true);
  assert.end();
});

test('getEnvProp(prop, config) returns web.env.config[var] if var in web.env.config and also prop in config', assert => {
  const { NODE_ENV } = process.env;
  const prop = 'PROP_NAME';
  const config = { PROP_NAME: false, env: {} };
  config.env[NODE_ENV] = { PROP_NAME: true };

  assert.equals(getEnvProp(prop, config), true);
  assert.end();
});

test('getEnvProp(prop, config) returns false if neither case above is true', assert => {
  const { NODE_ENV } = process.env;
  const prop = 'PROP_NAME';
  const config = { env: {} };
  config.env[NODE_ENV] = { otherProp: true };

  assert.equals(getEnvProp(prop, config), false);
  assert.end();
});
