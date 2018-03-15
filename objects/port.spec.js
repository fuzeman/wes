import {MockListener} from '../test/mock';
import {MessageSender, Port} from './port';


describe('MessageSender', () => {
    describe('Chrome', () => {
        let sender = new MessageSender({
            tab: 'tab',
            frameId: 'frameId',
            id: 'id',
            url: 'url',
            tlsChannelId: 'tlsChannelId'
        }, {
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false
            }
        });

        // region Properties

        describe('tab', () => {
            it('should return value', () => {
                expect(sender.tab).toBe('tab');
            });
        });

        describe('frameId', () => {
            it('should return value', () => {
                expect(sender.frameId).toBe('frameId');
            });
        });

        describe('id', () => {
            it('should return value', () => {
                expect(sender.id).toBe('id');
            });
        });

        describe('url', () => {
            it('should return value', () => {
                expect(sender.url).toBe('url');
            });
        });

        describe('tlsChannelId', () => {
            it('should return value', () => {
                expect(sender.tlsChannelId).toBe('tlsChannelId');
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let sender = new MessageSender({
            tab: 'tab',
            frameId: 'frameId',
            id: 'id',
            url: 'url',
            tlsChannelId: 'tlsChannelId'
        }, {
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        // region Properties

        describe('tab', () => {
            it('should return value', () => {
                expect(sender.tab).toBe('tab');
            });
        });

        describe('frameId', () => {
            it('should return value', () => {
                expect(sender.frameId).toBe('frameId');
            });
        });

        describe('id', () => {
            it('should return value', () => {
                expect(sender.id).toBe('id');
            });
        });

        describe('url', () => {
            it('should return value', () => {
                expect(sender.url).toBe('url');
            });
        });

        describe('tlsChannelId', () => {
            it('should return value', () => {
                expect(sender.tlsChannelId).toBe('tlsChannelId');
            });
        });

        // endregion
    });
});

describe('Port', () => {
    describe('Chrome', () => {
        let onDisconnect = new MockListener();
        let onMessage = new MockListener();

        let port = new Port({
            name: 'name',
            sender: { id: 'id' },

            onDisconnect,
            onMessage,

            disconnect: () => false,
            postMessage: () => false
        }, {
            title: 'Chrome',
            name: 'chrome',
            version: '54.0',

            promises: false
        });

        // region Properties

        describe('name', () => {
            it('should return value', () => {
                expect(port.name).toBe('name');
            });
        });

        describe('sender', () => {
            it('should return value', () => {
                expect(port.sender).toBeDefined();
                expect(port.sender.id).toBe('id');
            });

            it('should return null if "sender" is undefined', () => {
                let port = new Port({
                    sender: null
                }, {
                    title: 'Chrome',
                    name: 'chrome',
                    version: '54.0',

                    promises: false
                });

                expect(port.sender).toBeNull();
            });
        });

        // endregion

        // region Events

        describe('onDisconnect', () => {
            it('supports addListener(listener)', (done) => {
                function listener(port) {
                    expect(port).toBe('port');
                    done();
                }

                // Add listener
                port.onDisconnect.addListener(listener);

                // Emit event
                onDisconnect.emit('port');
            });
        });

        describe('onMessage', () => {
            it('supports addListener(listener)', (done) => {
                function listener(message) {
                    expect(message).toBe('message');
                    done();
                }

                // Add listener
                port.onMessage.addListener(listener);

                // Emit event
                onMessage.emit('message');
            });
        });

        // endregion

        // region Methods

        describe('disconnect', () => {
            it('should call function', () => {
                port.disconnect();
            });
        });

        describe('postMessage', () => {
            it('should call function', () => {
                port.postMessage('message');
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let onDisconnect = new MockListener();
        let onMessage = new MockListener();

        let port = new Port({
            name: 'name',
            error: 'error',
            sender: { id: 'id' },

            onDisconnect,
            onMessage,

            disconnect: () => false,
            postMessage: () => false
        }, {
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        // region Properties

        describe('name', () => {
            it('should return value', () => {
                expect(port.name).toBe('name');
            });
        });

        describe('error', () => {
            it('should return value', () => {
                expect(port.error).toBe('error');
            });
        });

        describe('sender', () => {
            it('should return value', () => {
                expect(port.sender).toBeDefined();
                expect(port.sender.id).toBe('id');
            });

            it('should return null if "sender" is undefined', () => {
                let port = new Port({
                    sender: null
                }, {
                    title: 'Firefox',
                    name: 'firefox',
                    version: '54.0',

                    promises: true
                });

                expect(port.sender).toBeNull();
            });
        });

        // endregion

        // region Events

        describe('onDisconnect', () => {
            it('supports addListener(listener)', (done) => {
                function listener(port) {
                    expect(port).toBe('port');
                    done();
                }

                // Add listener
                port.onDisconnect.addListener(listener);

                // Emit event
                onDisconnect.emit('port');
            });
        });

        describe('onMessage', () => {
            it('supports addListener(listener)', (done) => {
                function listener(message) {
                    expect(message).toBe('message');
                    done();
                }

                // Add listener
                port.onMessage.addListener(listener);

                // Emit event
                onMessage.emit('message');
            });
        });

        // endregion

        // region Methods

        describe('disconnect', () => {
            it('should call function', () => {
                port.disconnect();
            });
        });

        describe('postMessage', () => {
            it('should call function', () => {
                port.postMessage('message');
            });
        });

        // endregion
    });
});
