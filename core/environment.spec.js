import IsFunction from 'lodash/isFunction';

import {Browsers, Browser, getBrowserName} from './environment';


describe('Environment', () => {
    describe('Browsers', () => {
        describe('chrome', () => {
            it('should be defined', () => {
                expect(Browsers.chrome).toBeDefined();
            });

            describe('namespace', () => {
                it('should be a function', () => {
                    expect(IsFunction(Browsers.chrome.namespace)).toBeTruthy();
                });

                it('should throw error', () => {
                    expect(() => Browsers.chrome.namespace()).toThrowError(ReferenceError, 'chrome is not defined');
                });
            });
        });

        describe('firefox', () => {
            it('should be defined', () => {
                expect(Browsers.firefox).toBeDefined();
            });

            describe('namespace', () => {
                it('should be a function', () => {
                    expect(IsFunction(Browsers.firefox.namespace)).toBeTruthy();
                });

                it('should throw error', () => {
                    expect(() => Browsers.firefox.namespace()).toThrowError(ReferenceError, 'browser is not defined');
                });
            });
        });
    });

    describe('Browser', () => {
        it('should be null', () => {
            expect(Browser).toBeNull();
        });
    });

    describe('getBrowserName', () => {
        it('should return "chrome"', () => {
            expect(getBrowserName({ chrome: true })).toBe('chrome');
        });

        it('should return "firefox"', () => {
            expect(getBrowserName({ firefox: true })).toBe('firefox');
        });

        it('should default to null', () => {
            expect(getBrowserName({})).toBeNull();
        });
    });
});
