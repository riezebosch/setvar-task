import { version, tool } from '../src/setvar';
import { expect } from 'chai';
import assert = require('assert');

describe('setvar', () => {
    it ('converts version from task.json', async () => {
        expect(await version()).to.match(/\d+\.\d+\.\d+/)
    });

    

    
});

describe('converts os type to executable path', () => {
    it ('for windows', () => {
        expect(tool('Windows_NT')).to.eq('windows');
    });

    it ('for linux', () => {
        expect(tool('Linux')).to.eq('linux');
    });

    it ('for MacOs', () => {
        expect(tool('Darwin')).to.eq('darwin');
    });
    
    it ('for unkown', () => {
        try {
            tool('asdff');
            assert.fail();
        } catch (err) {
            expect(err).to.match(/not supported/);
        }
    });
})
