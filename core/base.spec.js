import Base from './base';
import {MockListener} from '../test/mock';


const TestCompatibility = {
    webextensions: {
        api: {
            test: {
                missing: {
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
                onMissing: {
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
                onUnsupported: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: false
                            },
                            firefox: {
                                version_added: false
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
                },
                errorUnknownAsync: {
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

    get unsupported() {
        return this.$property('unsupported');
    }

    get value() {
        return this.$property('value');
    }

    get onEvent() {
        return this.$listener('onEvent');
    }

    get onMissing() {
        return this.$listener('onMissing');
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

    missing() {
        return this.$call('missing');
    }

    successAsync() {
        return this.$promise('successAsync');
    }

    errorAsync() {
        return this.$promise('errorAsync');
    }

    errorUnknownAsync() {
        return this.$promise('errorUnknownAsync');
    }
}

describe('Base', () => {
    describe('Undefined API', () => {
        let test = new Test({
            title: 'Firefox',
            name: 'firefox',
            version: '55.0',

            promises: true,
            namespace: {}
        });

        describe('$listener', () => {
            it('should throw an exception on undefined api', () => {
                expect(() => test.onEvent.addListener(() => false)).toThrowError(
                    Error, 'Test API is not available'
                );
            });
        });

        describe('$promise', () => {
            it('should reject with an error on undefined api', (done) => {
                test.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Test API is not available');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should throw an exception on undefined api', () => {
                expect(() => test.value).toThrowError(
                    Error, 'Test API is not available'
                );
            });
        });
    });

    describe('Unknown Browser', () => {
        let test = new Test({
            title: 'Test',
            name: 'test',
            version: '55.0',

            promises: true,
            namespace: {}
        });

        describe('$listener', () => {
            it('should throw an exception on unknown browser', () => {
                expect(() => test.onEvent.addListener(() => false)).toThrowError(
                    Error, 'Test API is not available (Unknown browser: test)'
                );
            });
        });

        describe('$promise', () => {
            it('should reject with an error on unknown browser', (done) => {
                test.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Test API is not available (Unknown browser: test)');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should raise an exception on unknown browser', () => {
                expect(() => test.value).toThrowError(
                    Error, 'Test API is not available (Unknown browser: test)'
                );
            });
        });
    });

    describe('Chrome', () => {
        let onEvent = new MockListener();

        let runtime = {
            lastError: null
        };

        let test = new Test({
            title: 'Chrome',
            name: 'chrome',
            version: '54.0',

            promises: false,

            namespace: () => ({
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
                    },
                    errorUnknownAsync: (callback) => {
                        runtime.lastError = { };
                        callback();
                    }
                }
            })
        });

        describe('$call', () => {
            it('should return value', () => {
                expect(test.success()).toBe('Success');
            });

            it('should throw an exception', () => {
                expect(() => test.error()).toThrowError(Error, 'Exception');
            });

            it('should throw an exception on missing function', () => {
                expect(() => test.missing()).toThrowError(
                    Error, 'Test API doesn\'t support "missing"'
                );
            });
        });

        describe('$promise', () => {
            it('should return value', () => {
                return test.successAsync().then((result) => {
                    expect(result).toBe('Success');
                });
            });

            it('should reject with error', (done) => {
                test.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Error');
                    done();
                });
            });

            it('should reject with unknown error', (done) => {
                test.errorUnknownAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Unknown Error');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should return value', () => {
                expect(test.value).toBe('value');
            });

            it('should throw an exception on unsupported browsers', () => {
                expect(() => test.unsupported).toThrowError(
                    Error, 'Test API doesn\'t support "unsupported" (Unknown method)'
                );
            });
        });

        describe('$listener', () => {
            it('should support addListener(listener)', (done) => {
                test.onEvent.addListener((result) => {
                    expect(result).toBe('event');
                    done();
                });

                // Emit event
                onEvent.emit('event');
            });

            it('should support hasListener(listener)', () => {
                function listener() { }

                // Add listener
                test.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(test.onEvent.hasListener(listener)).toBeTruthy();
            });

            it('should support removeListener(listener)', () => {
                function listener() { }

                // Add listener
                test.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(test.onEvent.hasListener(listener)).toBeTruthy();

                // Remove listener
                test.onEvent.removeListener(listener);

                // Ensure listener has been removed
                expect(test.onEvent.hasListener(listener)).toBeFalsy();
            });

            it('should throw an exception on missing event', () => {
                expect(() => test.onMissing.addListener(() => false)).toThrowError(
                    Error, 'Test API doesn\'t support "onMissing"'
                );
            });

            it('should throw an exception on unsupported browsers', () => {
                expect(() => test.onUnsupported.addListener(() => false)).toThrowError(
                    Error, 'Test API doesn\'t support "onUnsupported" (Not Implemented)'
                );
            });
        });
    });

    describe('Firefox', () => {
        let onEvent = new MockListener();

        let runtime = {
            lastError: null
        };

        let test = new Test({
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
                expect(test.success()).toBe('Success');
            });

            it('should throw an exception', () => {
                expect(() => test.error()).toThrowError(Error, 'Exception');
            });

            it('should throw an exception on missing function', () => {
                expect(() => test.missing()).toThrowError(
                    Error, 'Test API doesn\'t support "missing"'
                );
            });
        });

        describe('$promise', () => {
            it('should return value', () => {
                return test.successAsync().then((result) => {
                    expect(result).toBe('Success');
                });
            });

            it('should reject with error', (done) => {
                test.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('Error');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should return value', () => {
                expect(test.value).toBe('value');
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => test.unsupported).toThrowError(
                    Error, 'Test API doesn\'t support "unsupported" (Unknown method)'
                );
            });
        });

        describe('$listener', () => {
            it('should support addListener(listener)', (done) => {
                test.onEvent.addListener((result) => {
                    expect(result).toBe('event');
                    done();
                });

                // Emit event
                onEvent.emit('event');
            });

            it('should support hasListener(listener)', () => {
                function listener() { }

                // Add listener
                test.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(test.onEvent.hasListener(listener)).toBeTruthy();
            });

            it('should support removeListener(listener)', () => {
                function listener() { }

                // Add listener
                test.onEvent.addListener(listener);

                // Ensure listener has been added
                expect(test.onEvent.hasListener(listener)).toBeTruthy();

                // Remove listener
                test.onEvent.removeListener(listener);

                // Ensure listener has been removed
                expect(test.onEvent.hasListener(listener)).toBeFalsy();
            });

            it('should throw an exception on missing event', () => {
                expect(() => test.onMissing.addListener(() => false)).toThrowError(
                    Error, 'Test API doesn\'t support "onMissing"'
                );
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => test.onUnsupported.addListener(() => false)).toThrowError(
                    Error, 'Test API doesn\'t support "onUnsupported" (Not Implemented)'
                );
            });
        });
    });
});
