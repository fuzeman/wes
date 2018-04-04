import {Storage, StorageChange, StorageArea} from './storage';


describe('StorageChange', () => {
    describe('Chrome', () => {
        let change = new StorageChange({
            oldValue: 'oldValue',
            newValue: 'newValue'
        }, {
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false
            }
        });

        describe('oldValue', () => {
            it('should return value', () => {
                expect(change.oldValue).toBe('oldValue');
            });
        });

        describe('newValue', () => {
            it('should return value', () => {
                expect(change.newValue).toBe('newValue');
            });
        });
    });

    describe('Firefox', () => {
        let change = new StorageChange({
            oldValue: 'oldValue',
            newValue: 'newValue'
        }, {
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        describe('oldValue', () => {
            it('should return value', () => {
                expect(change.oldValue).toBe('oldValue');
            });
        });

        describe('newValue', () => {
            it('should return value', () => {
                expect(change.newValue).toBe('newValue');
            });
        });
    });
});

describe('StorageArea', () => {
    describe('Chrome', () => {
        let area = new StorageArea({
            clear: (callback) => callback(true),
            get: (keys, callback) => callback({ keys }),
            getBytesInUse: (keys, callback) => callback({ keys }),
            remove: (keys, callback) => callback({ keys }),
            set: (keys, callback) => callback({ keys })
        }, {
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false
            }
        });

        describe('clear', () => {
            it('should return promise', () => {
                return area.clear().then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('get', () => {
            it('should return promise', () => {
                return area.get(['key']).then((result) => {
                    expect(result).toEqual({
                        keys: ['key']
                    });
                });
            });
        });

        describe('getBytesInUse', () => {
            it('should return promise', () => {
                return area.getBytesInUse(['key']).then((result) => {
                    expect(result).toEqual({
                        keys: ['key']
                    });
                });
            });
        });

        describe('remove', () => {
            it('should return promise', () => {
                return area.remove(['key']).then((result) => {
                    expect(result).toEqual({
                        keys: ['key']
                    });
                });
            });
        });

        describe('set', () => {
            it('should return promise', () => {
                return area.set({ key: 'value' }).then((result) => {
                    expect(result).toEqual({
                        keys: {
                            key: 'value'
                        }
                    });
                });
            });
        });
    });

    describe('Firefox', () => {
        let area = new StorageArea({
            clear: () => Promise.resolve(true),
            get: (keys) => Promise.resolve({ keys }),
            getBytesInUse: (keys) => Promise.resolve({ keys }),
            remove: (keys) => Promise.resolve({ keys }),
            set: (keys) => Promise.resolve({ keys })
        }, {
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        describe('clear', () => {
            it('should return promise', () => {
                return area.clear().then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('get', () => {
            it('should return promise', () => {
                return area.get(['key']).then((result) => {
                    expect(result).toEqual({
                        keys: ['key']
                    });
                });
            });
        });

        describe('getBytesInUse', () => {
            it('should return promise', () => {
                return area.getBytesInUse(['key']).then((result) => {
                    expect(result).toEqual({
                        keys: ['key']
                    });
                });
            });
        });

        describe('remove', () => {
            it('should return promise', () => {
                return area.remove(['key']).then((result) => {
                    expect(result).toEqual({
                        keys: ['key']
                    });
                });
            });
        });

        describe('set', () => {
            it('should return promise', () => {
                return area.set({ key: 'value' }).then((result) => {
                    expect(result).toEqual({
                        keys: {
                            key: 'value'
                        }
                    });
                });
            });
        });
    });
});

describe('Storage', () => {
    describe('Chrome', () => {
        let storage = new Storage({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false
            }
        });

        // region Properties

        describe('local', () => {
            it('should return instance', () => {
                expect(storage.local instanceof StorageArea).toBeTruthy();
            });
        });

        describe('managed', () => {
            it('should return instance', () => {
                expect(storage.managed instanceof StorageArea).toBeTruthy();
            });
        });

        describe('sync', () => {
            it('should return instance', () => {
                expect(storage.sync instanceof StorageArea).toBeTruthy();
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let storage = new Storage({
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        // region Properties

        describe('local', () => {
            it('should return instance', () => {
                expect(storage.local instanceof StorageArea).toBeTruthy();
            });
        });

        describe('managed', () => {
            it('should return instance', () => {
                expect(storage.managed instanceof StorageArea).toBeTruthy();
            });
        });

        describe('sync', () => {
            it('should return instance', () => {
                expect(storage.sync instanceof StorageArea).toBeTruthy();
            });
        });

        // endregion
    });
});
