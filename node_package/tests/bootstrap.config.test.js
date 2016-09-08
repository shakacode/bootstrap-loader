import test from 'tape';
import path from 'path';
import cC from '../../src/bootstrap.config';

/*test('cC throws error if config file can not be parsed', (assert) =>{
  assert.throws(() => {cC({extractStyles: false, customConfigFilePath: '../node_package/tests/test_configs/test_unparsable_bootstraprc'})},
                /Config file cannot be parsed/);
	assert.end();
});*/

test('cC throws error if bootstrapVersion not found', (assert) =>{
  assert.throws(() => {cC({extractStyles: false, customConfigFilePath: '../node_package/tests/test_configs/test_bootstraprc_noversion'})},
                /Bootstrap version not found in your '.bootstraprc'./);
	assert.end();
});

test('cC throws error if bootstrapVersion is not 3 or 4', (assert) =>{
  assert.throws(() => {cC({extractStyles: false, customConfigFilePath: '../node_package/tests/test_configs/test_bootstraprc_wrongversion'})},
                /Unsupported Bootstrap version in your '.bootstraprc'./);
	assert.end();
});

test('cC uses default config if user config is not provided', (assert) =>{
  const expectedResult = {
      bootstrapVersion: 3,
      loglevel: undefined,
      useFlexbox: undefined,
      preBootstrapCustomizations: undefined,
      bootstrapCustomizations: undefined,
      appStyles: undefined,
      useCustomIconFontPath: false,
      extractStyles: false,
      styleLoaders: ['style', 'css', 'sass'],
      styles: [ 'mixins', 'normalize', 'print', 'glyphicons', 'scaffolding', 'type', 'code', 'grid', 'tables', 'forms', 'buttons', 'component-animations', 'dropdowns', 'button-groups', 'input-groups', 'navs', 'navbar', 'breadcrumbs', 'pagination', 'pager', 'labels', 'badges', 'jumbotron', 'thumbnails', 'alerts', 'progress-bars', 'media', 'list-group', 'panels', 'wells', 'responsive-embed', 'close', 'modals', 'tooltip', 'popovers', 'carousel', 'utilities', 'responsive-utilities' ],
      scripts: [ 'transition', 'alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'tooltip', 'popover', 'scrollspy', 'tab', 'affix' ],
      configFilePath: path.resolve(__dirname, `../../.bootstraprc-3-default`),
    }
  
  assert.deepEquals(cC({}), expectedResult);
	assert.end();
});

test('cC uses user config as expected', (assert) =>{
  const expectedResult = {
    appStyles: undefined,
    bootstrapCustomizations: '/home/ubuntu/workspace/node_package/tests/test_configs/path/to/bootstrap/customizations.scss',
    bootstrapVersion: 4,
    configFilePath: path.resolve(__dirname, './test_configs/test_bootstraprc'),
    extractStyles: true,
    loglevel: undefined,
    preBootstrapCustomizations: '/home/ubuntu/workspace/node_package/tests/test_configs/path/to/bootstrap/pre-customizations.scss',
    scripts: [ 'alert', 'button', 'carousel', 'collapse', 'dropdown', 'modal', 'popover', 'scrollspy', 'tab', 'tooltip', 'util' ],
    styleLoaders: [ 'style', 'css', 'postcss', 'sass' ],
    styles: [ 'mixins', 'normalize', 'print', 'reboot', 'type', 'images', 'code', 'grid', 'tables', 'forms', 'buttons', 'animation', 'dropdown', 'button-group', 'input-group', 'custom-forms', 'nav', 'navbar', 'card', 'breadcrumb', 'pagination', 'pager', 'labels', 'jumbotron', 'alert', 'progress', 'media', 'list-group', 'responsive-embed', 'close', 'modal', 'tooltip', 'popover', 'carousel', 'utilities', 'utilities-background', 'utilities-spacing', 'utilities-responsive' ],
    useCustomIconFontPath: undefined,
    useFlexbox: true }
  
  assert.deepEquals(cC({extractStyles: true, customConfigFilePath: '../node_package/tests/test_configs/test_bootstraprc'}), expectedResult);
	assert.end();
});
