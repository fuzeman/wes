import {MockListener} from './test/mock';
import {Permissions} from './permissions';


describe('Permissions', () => {
    describe('Chrome', () => {
        let onAdded = new MockListener();
        let onRemoved = new MockListener();

        let runtime = {
            lastError: null
        };

        let chrome = new Permissions({
            title: 'Chrome',
            name: 'chrome',
            version: '54.0',

            promises: false,

            namespace: {
                runtime,

                permissions: {
                    onAdded,
                    onRemoved,

                    contains: (permissions, callback) => {
                        callback(true);
                    },
                    getAll: (callback) => {
                        callback({
                            origins: ['https://google.com'],
                            permissions: ['tabs']
                        });
                    },
                    remove: (permissions, callback) => {
                        callback(true);
                    },
                    request: (permissions, callback) => {
                        callback(true);
                    }
                }
            }
        });

        describe('onAdded', () => {
            it('supports addListener(listener)', (done) => {
                function listener(result) {
                    expect(result).toBe('added');
                    done();
                }

                // Add listener
                chrome.onAdded.addListener(listener);

                // Emit event
                onAdded.emit('added');
            });
        });

        describe('onRemoved', () => {
            it('supports addListener(listener)', (done) => {
                function listener(result) {
                    expect(result).toBe('removed');
                    done();
                }

                // Add listener
                chrome.onRemoved.addListener(listener);

                // Emit event
                onRemoved.emit('removed');
            });
        });

        describe('contains', () => {
            it('should return value', () => {
                return chrome.contains({}).then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('getAll', () => {
            it('should return value', () => {
                return chrome.getAll().then((result) => {
                    expect(result).toEqual({
                        origins: ['https://google.com'],
                        permissions: ['tabs']
                    });
                });
            });
        });

        describe('remove', () => {
            it('should return value', () => {
                return chrome.remove({
                    origins: ['https://google.com'],
                    permissions: ['tabs']
                }).then((result) => {
                    expect(result).toEqual(true);
                });
            });
        });

        describe('request', () => {
            it('should return value', () => {
                return chrome.request({
                    origins: ['https://google.com'],
                    permissions: ['tabs']
                }).then((result) => {
                    expect(result).toEqual(true);
                });
            });
        });
    });

    describe('Firefox 54', () => {
        let firefox54 = new Permissions({
            title: 'Firefox',
            name: 'firefox',
            version: '54.0',

            promises: true,

            namespace: {}
        });

        describe('contains', () => {
            it('should reject with unsupported error', (done) => {
                firefox54.contains({}).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Permissions API is not available (Requires: Firefox >= 55)');
                    done();
                });
            });
        });
    });

    describe('Firefox 55', () => {
        let firefox55 = new Permissions({
            title: 'Firefox',
            name: 'firefox',
            version: '55.0',

            promises: true,

            namespace: {
                permissions: {
                    contains: (permissions) => {
                        return Promise.resolve(true);
                    },
                    getAll: () => {
                        return Promise.resolve({
                            origins: ['https://google.com'],
                            permissions: ['tabs']
                        });
                    },
                    remove: (permissions) => {
                        return Promise.resolve(true);
                    },
                    request: (permissions) => {
                        return Promise.resolve(true);
                    }
                }
            }
        });

        describe('contains', () => {
            it('should return value', () => {
                return firefox55.contains({}).then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('getAll', () => {
            it('should return value', () => {
                return firefox55.getAll().then((result) => {
                    expect(result).toEqual({
                        origins: ['https://google.com'],
                        permissions: ['tabs']
                    });
                });
            });
        });

        describe('remove', () => {
            it('should return value', () => {
                return firefox55.remove({
                    origins: ['https://google.com'],
                    permissions: ['tabs']
                }).then((result) => {
                    expect(result).toEqual(true);
                });
            });
        });

        describe('request', () => {
            it('should return value', () => {
                return firefox55.request({
                    origins: ['https://google.com'],
                    permissions: ['tabs']
                }).then((result) => {
                    expect(result).toEqual(true);
                });
            });
        });
    });
});
