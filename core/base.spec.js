import Base from './base';
import Event from './event';
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
                deprecated: {
                    __compat: {
                        status: {
                            deprecated: true
                        },
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
                experimental: {
                    __compat: {
                        status: {
                            experimental: true
                        },
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

                unknownBrowser: {
                    __compat: {
                        support: {
                            unknown: {
                                version_added: true
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

    constructor(options = null) {
        super(options);

        this.onEvent = new Event(this, 'onEvent');
        this.onMissing = new Event(this, 'onMissing');
        this.onUnsupported = new Event(this, 'onUnsupported');
    }

    get unsupported() {
        return this.$property('unsupported');
    }

    get value() {
        return this.$property('value');
    }

    deprecated() {
        return this.$call('deprecated');
    }

    error() {
        return this.$call('error');
    }

    errorAsync() {
        return this.$promise('errorAsync');
    }

    errorUnknownAsync() {
        return this.$promise('errorUnknownAsync');
    }

    experimental() {
        return this.$call('experimental');
    }

    missing() {
        return this.$call('missing');
    }

    success() {
        return this.$call('success');
    }

    successAsync() {
        return this.$promise('successAsync');
    }

    unknownBrowser() {
        return this.$call('unknownBrowser');
    }

    unknownMember() {
        return this.$call('unknownMember');
    }
}

describe('Base', () => {
    describe('Undefined API', () => {
        let test = new Test({
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '55.0',

                promises: true,
                namespace: {}
            }
        });

        describe('Events', () => {
            it('should throw an exception on undefined api', () => {
                expect(() => test.onEvent.addListener(() => false)).toThrowError(
                    Error, 'test is not available'
                );
            });
        });

        describe('$promise', () => {
            it('should reject with an error on undefined api', (done) => {
                test.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('test is not available');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should throw an exception on undefined api', () => {
                expect(() => test.value).toThrowError(
                    Error, 'test is not available'
                );
            });
        });
    });

    describe('Unknown Browser', () => {
        let test = new Test({
            browser: {
                title: 'Test',
                name: 'test',
                version: '55.0',

                promises: true,
                namespace: {
                    test: {}
                }
            }
        });

        describe('Events', () => {
            it('should throw an exception on unknown browser', () => {
                expect(() => test.onEvent.addListener(() => false)).toThrowError(
                    Error, 'test.onEvent is not available (unknown browser: test)'
                );
            });
        });

        describe('$promise', () => {
            it('should reject with an error on unknown browser', (done) => {
                test.errorAsync().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('test.errorAsync is not available (unknown browser: test)');
                    done();
                });
            });
        });

        describe('$property', () => {
            it('should raise an exception on unknown browser', () => {
                expect(() => test.value).toThrowError(
                    Error, 'test.value is not available (unknown browser: test)'
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
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: () => ({
                    runtime,

                    test: {
                        value: 'value',
                        onEvent,

                        deprecated: () => 'deprecated',
                        experimental: () => 'experimental',

                        success: () => {
                            return 'Success';
                        },
                        successAsync: (callback) => {
                            callback('Success');
                        },
                        error: () => {
                            throw new Error('Exception');
                        },
                        errorAsync: (callback) => {
                            runtime.lastError = { message: 'Error' };
                            callback();
                        },
                        errorUnknownAsync: (callback) => {
                            runtime.lastError = { };
                            callback();
                        },

                        unknownBrowser: () => 'unknownBrowser',
                        unknownMember: () => 'unknownMember'
                    }
                })
            }
        });

        describe('Events', () => {
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
                    Error, 'test.onMissing is not available'
                );
            });

            it('should throw an exception on unsupported browsers', () => {
                expect(() => test.onUnsupported.addListener(() => false)).toThrowError(
                    Error, 'test.onUnsupported is not available (not implemented)'
                );
            });
        });

        describe('$call', () => {
            it('should return value', () => {
                expect(test.success()).toBe('Success');
            });

            it('should return value on deprecated function', () => {
                expect(test.deprecated()).toBe('deprecated');
            });

            it('should return value on experimental function', () => {
                expect(test.experimental()).toBe('experimental');
            });

            it('should return value on unknown browser', () => {
                expect(test.unknownBrowser()).toBe('unknownBrowser');
            });

            it('should return value on unknown member', () => {
                expect(test.unknownMember()).toBe('unknownMember');
            });

            it('should throw an exception', () => {
                expect(() => test.error()).toThrowError(Error, 'Exception');
            });

            it('should throw an exception on missing function', () => {
                expect(() => test.missing()).toThrowError(
                    Error, 'test.missing is not available'
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
                    Error, 'test.unsupported is not available (unknown member)'
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
            browser: {
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
            }
        });

        describe('Events', () => {
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
                    Error, 'test.onMissing is not available'
                );
            });

            it('should raise an exception on unsupported browsers', () => {
                expect(() => test.onUnsupported.addListener(() => false)).toThrowError(
                    Error, 'test.onUnsupported is not available (not implemented)'
                );
            });
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
                    Error, 'test.missing is not available'
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
                    Error, 'test.unsupported is not available (unknown member)'
                );
            });
        });
    });
});
