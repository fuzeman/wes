import {MockAPI, MockDeclarativeEvent, MockEvent} from '../test/mock';
import Event, {DeclarativeEvent} from './event';


describe('Event', () => {
    describe('Basic', () => {
        let compatibility = {
            onAdded: {
                __compat: {
                    support: {
                        chrome: {
                            version_added: true
                        }
                    }
                }
            },
            onFuture: {
                __compat: {
                    support: {
                        chrome: {
                            version_added: '56'
                        }
                    }
                }
            }
        };

        describe('addListener', () => {
            it('should receive events', (done) => {
                let onAdded = new MockEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onAdded
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                event.addListener((result) => {
                    expect(result).toBe('event');
                    done();
                });

                // Emit event
                onAdded.emit('event');
            });

            it('should handle an undefined api', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {}
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                expect(() => event.addListener(() => false)).toThrowError(
                    Error, 'mock is not available'
                );
            });

            it('should handle an undefined event', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {}
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                expect(() => event.addListener(() => false)).toThrowError(
                    Error, 'mock.onAdded is not available'
                );
            });

            it('should handle an unsupported event', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {}
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onFuture');

                // Add listener
                expect(() => event.addListener(() => false)).toThrowError(
                    Error, 'mock.onFuture is not available (requires: chrome >= 56)'
                );
            });

            it('should handle a missing event', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {}
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onMissing');

                // Add listener
                expect(() => event.addListener(() => false)).toThrowError(
                    Error, 'mock.onMissing is not available (unknown member)'
                );
            });
        });

        describe('hasListener', () => {
            it('should return true', () => {
                let onAdded = new MockEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onAdded
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                function listener() { }

                event.addListener(listener);

                // Check if listener has been added
                expect(event.hasListener(listener)).toBe(true);
            });

            it('should return false', () => {
                let onAdded = new MockEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onAdded
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                function listener() { }

                // Check if listener has been added
                expect(event.hasListener(listener)).toBe(false);
            });
        });

        describe('hasListeners', () => {
            it('should return true', () => {
                let onAdded = new MockEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onAdded
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                event.addListener(() => false);

                // Check if there is any listeners
                expect(event.hasListeners()).toBe(true);
            });

            it('should return true', () => {
                let onAdded = new MockEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onAdded
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Check if there is any listeners
                expect(event.hasListeners()).toBe(false);
            });
        });

        describe('removeListener', () => {
            it('should remove listener', (done) => {
                let onAdded = new MockEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onAdded
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add rejection listener
                function listener() {
                    done.fail();
                }

                event.addListener(listener);

                // Add success listener
                event.addListener((result) => {
                    expect(result).toBe('event');
                    done();
                });

                // Remove listener
                event.removeListener(listener);

                // Emit event
                onAdded.emit('event');
            });

            it('should handle an undefined api', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {}
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                expect(() => event.removeListener(() => false)).toThrowError(
                    Error, 'mock is not available'
                );
            });

            it('should handle an undefined event', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {}
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onAdded');

                // Add listener
                expect(() => event.removeListener(() => false)).toThrowError(
                    Error, 'mock.onAdded is not available'
                );
            });

            it('should handle an unsupported event', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {}
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onFuture');

                // Add listener
                expect(() => event.removeListener(() => false)).toThrowError(
                    Error, 'mock.onFuture is not available (requires: chrome >= 56)'
                );
            });

            it('should handle a missing event', () => {
                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {}
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new Event(api, 'onMissing');

                // Add listener
                expect(() => event.removeListener(() => false)).toThrowError(
                    Error, 'mock.onMissing is not available (unknown member)'
                );
            });
        });
    });

    describe('Declarative', () => {
        let compatibility = {
            onChanged: {
                __compat: {
                    support: {
                        chrome: {
                            version_added: true
                        }
                    }
                },
                addRules: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            }
                        }
                    }
                },
                getRules: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            }
                        }
                    }
                },
                removeRules: {
                    __compat: {
                        support: {
                            chrome: {
                                version_added: true
                            }
                        }
                    }
                }
            }
        };

        describe('addRules', () => {
            it('should add rule', () => {
                let onChanged = new MockDeclarativeEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onChanged
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new DeclarativeEvent(api, 'onChanged');

                // Add rule
                return event.addRules([{ id: 'rule' }]).then((added) => {
                    expect(added.length).toBe(1);
                    expect(added[0].id).toBe('rule');
                });
            });
        });

        describe('getRules', () => {
            it('should return rules', () => {
                let onChanged = new MockDeclarativeEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onChanged
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new DeclarativeEvent(api, 'onChanged');

                // Add rule
                return event.addRules([{ id: 'rule' }]).then(() =>
                    // Retrieve current rules
                    event.getRules().then((rules) => {
                        expect(rules.length).toBe(1);
                        expect(rules[0].id).toBe('rule');
                    })
                );
            });
        });

        describe('removeRules', () => {
            it('should remove rules', () => {
                let onChanged = new MockDeclarativeEvent();

                let api = new MockAPI({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            mock: {
                                onChanged
                            }
                        }
                    },
                    compatibility: {
                        webextensions: {
                            api: {
                                mock: compatibility
                            }
                        }
                    }
                });

                // Create event wrapper
                let event = new DeclarativeEvent(api, 'onChanged');

                // Add rule
                return event.addRules([{ id: 'rule' }])
                    // Ensure the rule has been added
                    .then(() => event.getRules(['rule']).then((rules) => {
                        expect(rules.length).toBe(1);
                    }))
                    // Remove rule
                    .then(() => event.removeRules(['rule']))
                    // Ensure the rule has been removed
                    .then(() => event.getRules(['rule']).then((rules) => {
                        expect(rules.length).toBe(0);
                    }));
            });
        });
    });
});
