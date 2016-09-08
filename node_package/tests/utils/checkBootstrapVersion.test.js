import path from 'path';
import test from 'tape';
import cBV from '../../../src/utils/checkBootstrapVersion';

test('cBV compares version parameter with package.json version data', (assert) => {
    let bPath = `${path.join(`${__dirname}`, '../../../')}`;
    
    assert.equals(cBV(2, bPath).allGood, true);
    assert.end();
})