import {MessageSender, Port} from './objects/port';
import {MockListener} from './test/mock';
import {Runtime} from './runtime';


describe('Runtime', () => {
    describe('Chrome', () => {
        let onBrowserUpdateAvailable = new MockListener();
        let onConnect = new MockListener();
        let onConnectExternal = new MockListener();
        let onInstalled = new MockListener();
        let onMessage = new MockListener();
        let onMessageExternal = new MockListener();
        let onRestartRequired = new MockListener();
        let onStartup = new MockListener();
        let onSuspend = new MockListener();
        let onSuspendCanceled = new MockListener();
        let onUpdateAvailable = new MockListener();

        let runtime = new Runtime({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    runtime: {
                        // region Properties

                        id: 'wes',
                        lastError: null,

                        // endregion

                        // region Events

                        onBrowserUpdateAvailable,
                        onConnect,
                        onConnectExternal,
                        onInstalled,
                        onMessage,
                        onMessageExternal,
                        onRestartRequired,
                        onStartup,
                        onSuspend,
                        onSuspendCanceled,
                        onUpdateAvailable,

                        // endregion

                        // region Methods

                        connect: (extensionId, connectInfo) => ({name: connectInfo.name, sender: {id: extensionId}}),
                        connectNative: (application) => ({name: application, sender: {id: application}}),

                        getBackgroundPage: (callback) => callback('getBackgroundPage'),
                        getManifest: () => 'getManifest',
                        getPackageDirectoryEntry: (callback) => callback('getPackageDirectoryEntry'),
                        getPlatformInfo: (callback) => callback('getPlatformInfo'),
                        getURL: (path) => path,

                        openOptionsPage: (callback) => callback('openOptionsPage'),
                        reload: () => true,
                        requestUpdateCheck: (callback) => callback('requestUpdateCheck'),
                        setUninstallURL: (url, callback) => callback(url),

                        sendMessage: (extensionId, message, options, callback) => callback({
                            extensionId,
                            message,
                            options
                        }),

                        sendNativeMessage: (application, message, callback) => callback({
                            application,
                            message
                        })

                        // endregion
                    }
                }
            }
        });

        // region Properties

        describe('id', () => {
            it('should return value', () => {
                expect(runtime.id).toBe('wes');
            });
        });

        describe('lastError', () => {
            it('should return null', () => {
                expect(runtime.lastError).toBeNull();
            });
        });

        // endregion

        // region Events

        describe('onBrowserUpdateAvailable', () => {
            it('supports addListener(listener)', (done) => {
                function listener() {
                    done();
                }

                // Add listener
                runtime.onBrowserUpdateAvailable.addListener(listener);

                // Emit event
                onBrowserUpdateAvailable.emit();
            });
        });

        describe('onConnect', () => {
            it('supports addListener(listener)', (done) => {
                function listener(port) {
                    expect(port).toBe('port');
                    done();
                }

                // Add listener
                runtime.onConnect.addListener(listener);

                // Emit event
                onConnect.emit('port');
            });
        });

        describe('onConnectExternal', () => {
            it('supports addListener(listener)', (done) => {
                function listener(port) {
                    expect(port).toBe('port');
                    done();
                }

                // Add listener
                runtime.onConnectExternal.addListener(listener);

                // Emit event
                onConnectExternal.emit('port');
            });
        });

        describe('onInstalled', () => {
            it('supports addListener(listener)', (done) => {
                function listener(details) {
                    expect(details).toBe('details');
                    done();
                }

                // Add listener
                runtime.onInstalled.addListener(listener);

                // Emit event
                onInstalled.emit('details');
            });
        });

        describe('onMessage', () => {
            it('supports addListener(listener)', (done) => {
                function listener(message, sender, sendResponse) {
                    expect(message).toBe('message');
                    expect(sender).toBe('sender');
                    expect(sendResponse).toBe('sendResponse');
                    done();
                }

                // Add listener
                runtime.onMessage.addListener(listener);

                // Emit event
                onMessage.emit('message', 'sender', 'sendResponse');
            });
        });

        describe('onMessageExternal', () => {
            it('supports addListener(listener)', (done) => {
                function listener(message, sender, sendResponse) {
                    expect(message).toBe('message');
                    expect(sender).toBe('sender');
                    expect(sendResponse).toBe('sendResponse');
                    done();
                }

                // Add listener
                runtime.onMessageExternal.addListener(listener);

                // Emit event
                onMessageExternal.emit('message', 'sender', 'sendResponse');
            });
        });

        describe('onRestartRequired', () => {
            it('supports addListener(listener)', (done) => {
                function listener(reason) {
                    expect(reason).toBe('reason');
                    done();
                }

                // Add listener
                runtime.onRestartRequired.addListener(listener);

                // Emit event
                onRestartRequired.emit('reason');
            });
        });

        describe('onStartup', () => {
            it('supports addListener(listener)', (done) => {
                function listener() {
                    done();
                }

                // Add listener
                runtime.onStartup.addListener(listener);

                // Emit event
                onStartup.emit();
            });
        });

        describe('onSuspend', () => {
            it('supports addListener(listener)', (done) => {
                function listener() {
                    done();
                }

                // Add listener
                runtime.onSuspend.addListener(listener);

                // Emit event
                onSuspend.emit();
            });
        });

        describe('onSuspendCanceled', () => {
            it('supports addListener(listener)', (done) => {
                function listener() {
                    done();
                }

                // Add listener
                runtime.onSuspendCanceled.addListener(listener);

                // Emit event
                onSuspendCanceled.emit();
            });
        });

        describe('onUpdateAvailable', () => {
            it('supports addListener(listener)', (done) => {
                function listener(details) {
                    expect(details).toBe('details');
                    done();
                }

                // Add listener
                runtime.onUpdateAvailable.addListener(listener);

                // Emit event
                onUpdateAvailable.emit('details');
            });
        });

        // endregion

        // region Methods

        describe('connect', () => {
            it('should return a wrapped Port', () => {
                let port = runtime.connect('wes', { name: 'test' });

                expect(port instanceof Port).toBeTruthy();
                expect(port.name).toBe('test');

                expect(port.sender instanceof MessageSender).toBeTruthy();
                expect(port.sender.id).toBe('wes');
            });

            it('should return null if no port is returned', () => {
                let runtime = new Runtime({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            runtime: {
                                connect: () => null
                            }
                        }
                    }
                });

                expect(runtime.connect('wes', { name: 'test' })).toBeNull();
            });
        });

        describe('connectNative', () => {
            it('should return a wrapped Port', () => {
                let port = runtime.connectNative('wes');

                expect(port instanceof Port).toBeTruthy();
                expect(port.name).toBe('wes');

                expect(port.sender instanceof MessageSender).toBeTruthy();
                expect(port.sender.id).toBe('wes');
            });

            it('should return null if no port is returned', () => {
                let runtime = new Runtime({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            runtime: {
                                connectNative: () => null
                            }
                        }
                    }
                });

                expect(runtime.connectNative('wes')).toBeNull();
            });
        });

        describe('getBackgroundPage', () => {
            it('should return promise', () => {
                return runtime.getBackgroundPage().then((result) => {
                    expect(result).toBe('getBackgroundPage');
                });
            });
        });

        describe('getBrowserInfo', () => {
            it('should reject with unsupported error', (done) => {
                runtime.getBrowserInfo().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('runtime.getBrowserInfo is not available (not implemented)');
                    done();
                });
            });
        });

        describe('getManifest', () => {
            it('should return value', () => {
                expect(runtime.getManifest()).toBe('getManifest');
            });
        });

        describe('getPackageDirectoryEntry', () => {
            it('should return promise', () => {
                return runtime.getPackageDirectoryEntry().then((result) => {
                    expect(result).toBe('getPackageDirectoryEntry');
                });
            });
        });

        describe('getPlatformInfo', () => {
            it('should return promise', () => {
                return runtime.getPlatformInfo().then((result) => {
                    expect(result).toBe('getPlatformInfo');
                });
            });
        });

        describe('getURL', () => {
            it('should return value', () => {
                expect(runtime.getURL('path')).toBe('path');
            });
        });

        describe('openOptionsPage', () => {
            it('should return promise', () => {
                return runtime.openOptionsPage().then((result) => {
                    expect(result).toBe('openOptionsPage');
                });
            });
        });

        describe('reload', () => {
            it('should call function', () => {
                runtime.reload();
            });
        });

        describe('requestUpdateCheck', () => {
            it('should return promise', () => {
                return runtime.requestUpdateCheck().then((result) => {
                    expect(result).toBe('requestUpdateCheck');
                });
            });
        });

        describe('sendMessage', () => {
            it('should return promise', () => {
                return runtime.sendMessage('extensionId', 'message', { includeTlsChannelId: true }).then((result) => {
                    expect(result).toEqual({
                        extensionId: 'extensionId',
                        message: 'message',
                        options: {
                            includeTlsChannelId: true
                        }
                    });
                });
            });
        });

        describe('sendNativeMessage', () => {
            it('should return promise', () => {
                return runtime.sendNativeMessage('application', 'message').then((result) => {
                    expect(result).toEqual({
                        application: 'application',
                        message: 'message'
                    });
                });
            });
        });

        describe('setUninstallURL', () => {
            it('should return promise', () => {
                return runtime.setUninstallURL('url').then((result) => {
                    expect(result).toBe('url');
                });
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let onConnect = new MockListener();
        let onConnectExternal = new MockListener();
        let onInstalled = new MockListener();
        let onMessage = new MockListener();
        let onMessageExternal = new MockListener();
        let onStartup = new MockListener();
        let onUpdateAvailable = new MockListener();

        let runtime = new Runtime({
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true,

                namespace: {
                    runtime: {
                        // region Properties

                        id: 'wes',
                        lastError: null,

                        // endregion

                        // region Events

                        onConnect,
                        onConnectExternal,
                        onInstalled,
                        onMessage,
                        onMessageExternal,
                        onStartup,
                        onUpdateAvailable,

                        // endregion

                        // region Methods

                        connect: (extensionId, connectInfo) => ({
                            name: connectInfo.name,
                            sender: { id: extensionId }
                        }),

                        connectNative: (application) => ({
                            name: application,
                            sender: { id: application }
                        }),

                        getBackgroundPage: () => Promise.resolve('getBackgroundPage'),
                        getBrowserInfo: () => Promise.resolve('getBrowserInfo'),
                        getManifest: () => 'getManifest',
                        getPlatformInfo: () => Promise.resolve('getPlatformInfo'),
                        getURL: (path) => path,

                        openOptionsPage: () => Promise.resolve('openOptionsPage'),
                        reload: () => true,
                        setUninstallURL: (url) => Promise.resolve(url),

                        sendMessage: (extensionId, message, options) => Promise.resolve({
                            extensionId,
                            message,
                            options
                        }),

                        sendNativeMessage: (application, message) => Promise.resolve({
                            application,
                            message
                        })

                        // endregion
                    }
                }
            }
        });

        // region Properties

        describe('id', () => {
            it('should return value', () => {
                expect(runtime.id).toBe('wes');
            });
        });

        describe('lastError', () => {
            it('should return null', () => {
                expect(runtime.lastError).toBeNull();
            });
        });

        // endregion

        // region Events

        describe('onBrowserUpdateAvailable', () => {
            it('should throw an error from addListener(listener)', () => {
                expect(() => runtime.onBrowserUpdateAvailable.addListener(() => false)).toThrowError(
                    Error, 'runtime.onBrowserUpdateAvailable is not available (not implemented)'
                );
            });
        });

        describe('onConnect', () => {
            it('supports addListener(listener)', (done) => {
                function listener(port) {
                    expect(port).toBe('port');
                    done();
                }

                // Add listener
                runtime.onConnect.addListener(listener);

                // Emit event
                onConnect.emit('port');
            });
        });

        describe('onConnectExternal', () => {
            it('supports addListener(listener)', (done) => {
                function listener(port) {
                    expect(port).toBe('port');
                    done();
                }

                // Add listener
                runtime.onConnectExternal.addListener(listener);

                // Emit event
                onConnectExternal.emit('port');
            });
        });

        describe('onInstalled', () => {
            it('supports addListener(listener)', (done) => {
                function listener(details) {
                    expect(details).toBe('details');
                    done();
                }

                // Add listener
                runtime.onInstalled.addListener(listener);

                // Emit event
                onInstalled.emit('details');
            });
        });

        describe('onMessage', () => {
            it('supports addListener(listener)', (done) => {
                function listener(message, sender, sendResponse) {
                    expect(message).toBe('message');
                    expect(sender).toBe('sender');
                    expect(sendResponse).toBe('sendResponse');
                    done();
                }

                // Add listener
                runtime.onMessage.addListener(listener);

                // Emit event
                onMessage.emit('message', 'sender', 'sendResponse');
            });
        });

        describe('onMessageExternal', () => {
            it('supports addListener(listener)', (done) => {
                function listener(message, sender, sendResponse) {
                    expect(message).toBe('message');
                    expect(sender).toBe('sender');
                    expect(sendResponse).toBe('sendResponse');
                    done();
                }

                // Add listener
                runtime.onMessageExternal.addListener(listener);

                // Emit event
                onMessageExternal.emit('message', 'sender', 'sendResponse');
            });
        });

        describe('onRestartRequired', () => {
            it('should throw an error from addListener(listener)', () => {
                expect(() => runtime.onRestartRequired.addListener(() => false)).toThrowError(
                    Error, 'runtime.onRestartRequired is not available (not implemented)'
                );
            });
        });

        describe('onStartup', () => {
            it('supports addListener(listener)', (done) => {
                function listener() {
                    done();
                }

                // Add listener
                runtime.onStartup.addListener(listener);

                // Emit event
                onStartup.emit();
            });
        });

        describe('onSuspend', () => {
            it('should throw an error from addListener(listener)', () => {
                expect(() => runtime.onSuspend.addListener(() => false)).toThrowError(
                    Error, 'runtime.onSuspend is not available (not implemented)'
                );
            });
        });

        describe('onSuspendCanceled', () => {
            it('should throw an error from addListener(listener)', () => {
                expect(() => runtime.onSuspendCanceled.addListener(() => false)).toThrowError(
                    Error, 'runtime.onSuspendCanceled is not available (not implemented)'
                );
            });
        });

        describe('onUpdateAvailable', () => {
            it('supports addListener(listener)', (done) => {
                function listener(details) {
                    expect(details).toBe('details');
                    done();
                }

                // Add listener
                runtime.onUpdateAvailable.addListener(listener);

                // Emit event
                onUpdateAvailable.emit('details');
            });
        });

        // endregion

        // region Methods

        describe('connect', () => {
            it('should return a wrapped Port', () => {
                let port = runtime.connect('wes', { name: 'test' });

                expect(port instanceof Port).toBeTruthy();
                expect(port.name).toBe('test');

                expect(port.sender instanceof MessageSender).toBeTruthy();
                expect(port.sender.id).toBe('wes');
            });

            it('should return null if no port is returned', () => {
                let runtime = new Runtime({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            runtime: {
                                connect: () => null
                            }
                        }
                    }
                });

                expect(runtime.connect('wes', { name: 'test' })).toBeNull();
            });
        });

        describe('connectNative', () => {
            it('should return a wrapped Port', () => {
                let port = runtime.connectNative('wes');

                expect(port instanceof Port).toBeTruthy();
                expect(port.name).toBe('wes');

                expect(port.sender instanceof MessageSender).toBeTruthy();
                expect(port.sender.id).toBe('wes');
            });

            it('should return null if no port is returned', () => {
                let runtime = new Runtime({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            runtime: {
                                connectNative: () => null
                            }
                        }
                    }
                });

                expect(runtime.connectNative('wes')).toBeNull();
            });
        });

        describe('getBackgroundPage', () => {
            it('should return promise', () => {
                return runtime.getBackgroundPage().then((result) => {
                    expect(result).toBe('getBackgroundPage');
                });
            });
        });

        describe('getBrowserInfo', () => {
            it('should return promise', () => {
                return runtime.getBrowserInfo().then((result) => {
                    expect(result).toBe('getBrowserInfo');
                });
            });
        });

        describe('getManifest', () => {
            it('should return value', () => {
                expect(runtime.getManifest()).toBe('getManifest');
            });
        });

        describe('getPackageDirectoryEntry', () => {
            it('should return promise', (done) => {
                runtime.getPackageDirectoryEntry().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe(
                        'runtime.getPackageDirectoryEntry is not available (not implemented)'
                    );

                    done();
                });
            });
        });

        describe('getPlatformInfo', () => {
            it('should return promise', () => {
                return runtime.getPlatformInfo().then((result) => {
                    expect(result).toBe('getPlatformInfo');
                });
            });
        });

        describe('getURL', () => {
            it('should return value', () => {
                expect(runtime.getURL('path')).toBe('path');
            });
        });

        describe('openOptionsPage', () => {
            it('should return promise', () => {
                return runtime.openOptionsPage().then((result) => {
                    expect(result).toBe('openOptionsPage');
                });
            });
        });

        describe('reload', () => {
            it('should call function', () => {
                runtime.reload();
            });
        });

        describe('requestUpdateCheck', () => {
            it('should return promise', (done) => {
                runtime.requestUpdateCheck().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe(
                        'runtime.requestUpdateCheck is not available (not implemented)'
                    );

                    done();
                });
            });
        });

        describe('sendMessage', () => {
            it('should return promise', () => {
                return runtime.sendMessage('extensionId', 'message', { includeTlsChannelId: true }).then((result) => {
                    expect(result).toEqual({
                        extensionId: 'extensionId',
                        message: 'message',
                        options: {
                            includeTlsChannelId: true
                        }
                    });
                });
            });
        });

        describe('sendNativeMessage', () => {
            it('should return promise', () => {
                return runtime.sendNativeMessage('application', 'message').then((result) => {
                    expect(result).toEqual({
                        application: 'application',
                        message: 'message'
                    });
                });
            });
        });

        describe('setUninstallURL', () => {
            it('should return promise', () => {
                return runtime.setUninstallURL('url').then((result) => {
                    expect(result).toBe('url');
                });
            });
        });

        // endregion
    });
});
