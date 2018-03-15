import {Extension, ViewType} from './extension';
import {MockListener} from './test/mock';


describe('Extension', () => {
    describe('Chrome', () => {
        let onRequest = new MockListener();
        let onRequestExternal = new MockListener();

        let extension = new Extension({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    extension: {
                        // region Properties

                        inIncognitoContext: true,
                        lastError: null,

                        // endregion

                        // region Events

                        onRequest,
                        onRequestExternal,

                        // endregion

                        // region Methods

                        getBackgroundPage: () => 'getBackgroundPage',
                        getExtensionTabs: (windowId) => windowId,
                        getURL: (path) => path,
                        getViews: (fetchProperties) => fetchProperties,

                        isAllowedFileSchemeAccess: (callback) => callback('isAllowedFileSchemeAccess'),
                        isAllowedIncognitoAccess: (callback) => callback('isAllowedIncognitoAccess'),

                        sendRequest: () => false,
                        setUpdateUrlData: () => false

                        // endregion
                    }
                }
            }
        });

        // region Properties

        describe('inIncognitoContext', () => {
            it('should return value', () => {
                expect(extension.inIncognitoContext).toBe(true);
            });
        });

        describe('lastError', () => {
            it('should return null', () => {
                expect(extension.lastError).toBeNull();
            });
        });

        // endregion

        // region Events

        describe('onRequest', () => {
            it('supports addListener(listener)', (done) => {
                function listener(request, sender, sendResponse) {
                    expect(request).toBe('request');
                    expect(sender).toBe('sender');
                    expect(sendResponse).toBe('sendResponse');
                    done();
                }

                // Add listener
                extension.onRequest.addListener(listener);

                // Emit event
                onRequest.emit('request', 'sender', 'sendResponse');
            });
        });

        describe('onRequestExternal', () => {
            it('supports addListener(listener)', (done) => {
                function listener(request, sender, sendResponse) {
                    expect(request).toBe('request');
                    expect(sender).toBe('sender');
                    expect(sendResponse).toBe('sendResponse');
                    done();
                }

                // Add listener
                extension.onRequestExternal.addListener(listener);

                // Emit event
                onRequestExternal.emit('request', 'sender', 'sendResponse');
            });
        });

        // endregion

        // region Methods

        describe('getBackgroundPage', () => {
            it('should return value', () => {
                expect(extension.getBackgroundPage()).toBe('getBackgroundPage');
            });
        });

        describe('getExtensionTabs', () => {
            it('should return value', () => {
                expect(extension.getExtensionTabs(5)).toBe(5);
            });
        });

        describe('getURL', () => {
            it('should return value', () => {
                expect(extension.getURL('path')).toBe('path');
            });
        });

        describe('getViews', () => {
            it('should return value', () => {
                expect(extension.getViews({type: ViewType.Notification})).toEqual({
                    type: ViewType.Notification
                });
            });
        });

        describe('isAllowedFileSchemeAccess', () => {
            it('should return promise', () => {
                return extension.isAllowedFileSchemeAccess().then((result) => {
                    expect(result).toBe('isAllowedFileSchemeAccess');
                });
            });
        });

        describe('isAllowedIncognitoAccess', () => {
            it('should return promise', () => {
                return extension.isAllowedIncognitoAccess().then((result) => {
                    expect(result).toBe('isAllowedIncognitoAccess');
                });
            });
        });

        describe('sendRequest', () => {
            it('should call function', () => {
                extension.sendRequest('extensionId', 'request', () => false);
            });
        });

        describe('setUpdateUrlData', () => {
            it('should call function', () => {
                extension.setUpdateUrlData('url');
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let extension = new Extension({
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true,

                namespace: {
                    extension: {
                        // region Properties

                        inIncognitoContext: true,
                        lastError: null,

                        // endregion

                        // region Methods

                        getBackgroundPage: () => 'getBackgroundPage',
                        getURL: (path) => path,
                        getViews: (fetchProperties) => fetchProperties,

                        isAllowedFileSchemeAccess: () => Promise.resolve('isAllowedFileSchemeAccess'),
                        isAllowedIncognitoAccess: () => Promise.resolve('isAllowedIncognitoAccess')

                        // endregion
                    }
                }
            }
        });

        // region Properties

        describe('inIncognitoContext', () => {
            it('should return value', () => {
                expect(extension.inIncognitoContext).toBe(true);
            });
        });

        describe('lastError', () => {
            it('should return null', () => {
                expect(extension.lastError).toBeNull();
            });
        });

        // endregion

        // region Events

        describe('onRequest', () => {
            it('should throw an error from addListener(listener)', () => {
                expect(() => extension.onRequest.addListener(() => false)).toThrowError(
                    Error, 'extension.onRequest is not available (not implemented)'
                );
            });
        });

        describe('onRequestExternal', () => {
            it('should throw an error from addListener(listener)', () => {
                expect(() => extension.onRequestExternal.addListener(() => false)).toThrowError(
                    Error, 'extension.onRequestExternal is not available (not implemented)'
                );
            });
        });

        // endregion

        // region Methods

        describe('getBackgroundPage', () => {
            it('should return promise', () => {
                expect(extension.getBackgroundPage()).toBe('getBackgroundPage');
            });
        });

        describe('getExtensionTabs', () => {
            it('should reject with unsupported error', () => {
                expect(() => extension.getExtensionTabs(5)).toThrowError(
                    Error, 'extension.getExtensionTabs is not available (not implemented)'
                );
            });
        });

        describe('getURL', () => {
            it('should return value', () => {
                expect(extension.getURL('path')).toBe('path');
            });
        });

        describe('getViews', () => {
            it('should return value', () => {
                expect(extension.getViews({ type: ViewType.Notification })).toEqual({
                    type: ViewType.Notification
                });
            });
        });

        describe('isAllowedFileSchemeAccess', () => {
            it('should return promise', () => {
                return extension.isAllowedFileSchemeAccess().then((result) => {
                    expect(result).toBe('isAllowedFileSchemeAccess');
                });
            });
        });

        describe('isAllowedIncognitoAccess', () => {
            it('should return promise', () => {
                return extension.isAllowedIncognitoAccess().then((result) => {
                    expect(result).toBe('isAllowedIncognitoAccess');
                });
            });
        });

        describe('sendRequest', () => {
            it('should reject with unsupported error', () => {
                expect(() => extension.sendRequest('extensionId', 'request', () => false)).toThrowError(
                    Error, 'extension.sendRequest is not available (not implemented)'
                );
            });
        });

        describe('setUpdateUrlData', () => {
            it('should reject with unsupported error', () => {
                expect(() => extension.setUpdateUrlData('url')).toThrowError(
                    Error, 'extension.setUpdateUrlData is not available (not implemented)'
                );
            });
        });

        // endregion
    });
});
