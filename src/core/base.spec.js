import Base from './base';
import {MockListener} from '../test/mock';


const TestCompatibility = {
    webextensions: {
        api: {
            test: {
                value: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            },
                            firefox: {
                                version_added: '55'
                            }
                        }
                    }
                },
                onEvent: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            },
                            firefox: {
                                version_added: '55'
                            }
                        }
                    }
                },
                success: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            },
                            firefox: {
                                version_added: '55'
                            }
                        }
                    }
                },
                error: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            },
                            firefox: {
                                version_added: '55'
                            }
                        }
                    }
                },
                successAsync: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            },
                            firefox: {
                                version_added: '55'
                            }
                        }
                    }
                },
                errorAsync: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            },
                            firefox: {
                                version_added: '55'
                            }
                        }
                    }
                }
            }
        }
    }
};

class Test extends Base {
    static Title = 'Test';

    static Name = 'test';
    static Compatibility = TestCompatibility;

    get value() {
        return this.$property('value');
    }

    get unsupported() {
        return this.$property('unsupported');
    }

    get onEvent() {
        return this.$listener('onEvent');
    }

    get onUnsupported() {
        return this.$listener('onUnsupported');
    }

    success() {
        return this.$call('success');
    }

    error() {
        return this.$call('error');
    }

    successAsync() {
        return this.$promise('successAsync');
    }

    errorAsync() {
        return this.$promise('errorAsync');
    }
}

describe('Base', () => {
    describe('Chrome', () => {
        let onEvent = new MockListener();

        let runtime = {
            lastError: null
        };

        let chrome = new Test({
            title: 'Chrome',
            name: 'chrome',
            version: '54.0',

            promises: false,

            namespace: {
                runtime,

                test: {
                    value: 'value',
                    onEvent,

                    success: () => {
                        return 'Success';
                    },
                    error: () => {
                        throw new Error('Exception');
                    },

                    successAsync: (callback) => {
                        callback('Success');
                    },
                    errorAsync: (callback) => {
                        runtime.lastError = { message: 'Error' };
                        callback();
                    }
                }
            }
        });

        describe('$call', () => {
            it('should return value', () => {
                expect(chrome.success()).toBe('Success');
            });

            it('should raise an exception', () => {
                expect(() => chrome.error()).toThrowError(Error, 'Exception');
            });
        });

        describe('$promise', () => {
            it('should return value', () => {
                return chrome.successAsync().then((result) => {
                    expect(result).toBe('Success');
                });
            });

            it('should reject with error', (done) => {
                chrome.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Error');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should return value', () => {
                expect(chrome.value).toBe('value');
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => chrome.unsupported).toThrowError(
                    Error, 'Test API doesn\'t support "unsupported" (Unknown method: test.unsupported)'
                );
            });
        });

        describe('$listener', () => {
            it('should support addListener(listener)', (done) => {
                chrome.onEvent.addListener((result) => {
                    expect(result).toBe('event');
                    done();
                });

                // Emit event
                onEvent.emit('event');
            });

            it('should support hasListener(listener)', () => {
                function listener() { }

                // Add listener
                chrome.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(chrome.onEvent.hasListener(listener)).toBeTruthy();
            });

            it('should support removeListener(listener)', () => {
                function listener() { }

                // Add listener
                chrome.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(chrome.onEvent.hasListener(listener)).toBeTruthy();

                // Remove listener
                chrome.onEvent.removeListener(listener);

                // Ensure listener has been removed
                expect(chrome.onEvent.hasListener(listener)).toBeFalsy();
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => chrome.onUnsupported.addListener(() => false)).toThrowError(
                    Error, 'Test API doesn\'t support "onUnsupported" (Unknown method: test.onUnsupported)'
                );
            });
        });
    });

    describe('Firefox', () => {
        let onEvent = new MockListener();

        let runtime = {
            lastError: null
        };

        let firefox = new Test({
            title: 'Firefox',
            name: 'firefox',
            version: '55.0',

            promises: true,

            namespace: {
                runtime,

                test: {
                    value: 'value',
                    onEvent,

                    success: () => {
                        return 'Success';
                    },
                    error: () => {
                        throw new Error('Exception');
                    },

                    successAsync: () => {
                        return Promise.resolve('Success');
                    },
                    errorAsync: () => {
                        return Promise.reject(new Error('Error'));
                    }
                }
            }
        });

        describe('$call', () => {
            it('should return value', () => {
                expect(firefox.success()).toBe('Success');
            });

            it('should raise exception', () => {
                expect(() => firefox.error()).toThrowError(Error, 'Exception');
            });
        });

        describe('$promise', () => {
            it('should return value', () => {
                return firefox.successAsync().then((result) => {
                    expect(result).toBe('Success');
                });
            });

            it('should reject with error', (done) => {
                firefox.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Error');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should return value', () => {
                expect(firefox.value).toBe('value');
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => firefox.unsupported).toThrowError(
                    Error, 'Test API doesn\'t support "unsupported" (Unknown method: test.unsupported)'
                );
            });
        });

        describe('$listener', () => {
            it('should support addListener(listener)', (done) => {
                firefox.onEvent.addListener((result) => {
                    expect(result).toBe('event');
                    done();
                });

                // Emit event
                onEvent.emit('event');
            });

            it('should support hasListener(listener)', () => {
                function listener() { }

                // Add listener
                firefox.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(firefox.onEvent.hasListener(listener)).toBeTruthy();
            });

            it('should support removeListener(listener)', () => {
                function listener() { }

                // Add listener
                firefox.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(firefox.onEvent.hasListener(listener)).toBeTruthy();

                // Remove listener
                firefox.onEvent.removeListener(listener);

                // Ensure listener has been removed
                expect(firefox.onEvent.hasListener(listener)).toBeFalsy();
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => firefox.onUnsupported.addListener(() => false)).toThrowError(
                    Error, 'Test API doesn\'t support "onUnsupported" (Unknown method: test.onUnsupported)'
                );
            });
        });
    });
});
