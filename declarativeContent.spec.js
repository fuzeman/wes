import {
    MockDeclarativeAction,
    MockDeclarativeCondition,
    MockDeclarativeEvent
} from './test/mock';

import {
    DeclarativeContent,
    PageStateMatcher,
    RequestContentScript,
    SetIcon,
    ShowPageAction
} from './declarativeContent';


class MockPageStateMatcher extends MockDeclarativeCondition {
    constructor(options) {
        super();

        this.options = options;
    }
}

class MockRequestContentScript extends MockDeclarativeAction {
    constructor(options) {
        super();

        this.options = options;
    }
}

class MockSetIcon extends MockDeclarativeAction {
    constructor(options) {
        super();

        this.options = options;
    }
}

class MockShowPageAction extends MockDeclarativeAction { }

describe('PageStateMatcher', () => {
    describe('Chrome', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    declarativeContent: {
                        PageStateMatcher: MockPageStateMatcher
                    }
                }
            }
        });

        let matcher = new PageStateMatcher({
            pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
            css: ['input[type="password"]']
        });

        describe('$create', () => {
            it('should return value', () => {
                expect(matcher.$create(declarativeContent).options).toEqual({
                    pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
                    css: ['input[type="password"]']
                });
            });
        });
    });

    describe('Firefox', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {}
            }
        });

        let matcher = new PageStateMatcher({
            pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
            css: ['input[type="password"]']
        });

        describe('$create', () => {
            it('should throw an error', () => {
                expect(() => matcher.$create(declarativeContent)).toThrowError(
                    Error, 'declarativeContent is not available'
                );
            });
        });
    });
});

describe('RequestContentScript', () => {
    describe('Chrome', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    declarativeContent: {
                        RequestContentScript: MockRequestContentScript
                    }
                }
            }
        });

        let action = new RequestContentScript({
            css: ['test.css']
        });

        describe('$create', () => {
            it('should return value', () => {
                expect(action.$create(declarativeContent).options).toEqual({
                    css: ['test.css']
                });
            });
        });
    });

    describe('Firefox', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {}
            }
        });

        let action = new RequestContentScript({
            css: ['test.css']
        });

        describe('$create', () => {
            it('should throw an error', () => {
                expect(() => action.$create(declarativeContent)).toThrowError(
                    Error, 'declarativeContent is not available'
                );
            });
        });
    });
});

describe('SetIcon', () => {
    describe('Chrome', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    declarativeContent: {
                        SetIcon: MockSetIcon
                    }
                }
            }
        });

        let action = new SetIcon({
            imageData: 'imageData'
        });

        describe('$create', () => {
            it('should return value', () => {
                expect(action.$create(declarativeContent).options).toEqual({
                    imageData: 'imageData'
                });
            });
        });
    });

    describe('Firefox', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {}
            }
        });

        let matcher = new SetIcon({
            imageData: 'imageData'
        });

        describe('$create', () => {
            it('should throw an error', () => {
                expect(() => matcher.$create(declarativeContent)).toThrowError(
                    Error, 'declarativeContent is not available'
                );
            });
        });
    });
});

describe('ShowPageAction', () => {
    describe('Chrome', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    declarativeContent: {
                        ShowPageAction: MockShowPageAction
                    }
                }
            }
        });

        let action = new ShowPageAction();

        describe('$create', () => {
            it('should return instance', () => {
                let instance = action.$create(declarativeContent);

                expect(instance instanceof MockShowPageAction).toBeTruthy();
            });
        });
    });

    describe('Firefox', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {}
            }
        });

        let action = new ShowPageAction();

        describe('$create', () => {
            it('should throw an error', () => {
                expect(() => action.$create(declarativeContent)).toThrowError(
                    Error, 'declarativeContent is not available'
                );
            });
        });
    });
});

describe('DeclarativeContent', () => {
    describe('Chrome', () => {
        let onPageChanged = new MockDeclarativeEvent();

        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    declarativeContent: {
                        RequestContentScript: MockRequestContentScript,
                        SetIcon: MockSetIcon,
                        ShowPageAction: MockShowPageAction,

                        PageStateMatcher: MockPageStateMatcher,

                        onPageChanged
                    }
                }
            }
        });

        describe('onPageChanged', () => {
            describe('addRules', () => {
                it('should add rule to event', () => {
                    return declarativeContent.onPageChanged.addRules([{
                        actions: [
                            new RequestContentScript({ css: ['test.css'] }),
                            new SetIcon({ imageData: 'imageData' }),
                            new ShowPageAction()
                        ],
                        conditions: [
                            new PageStateMatcher({
                                pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
                                css: ['input[type="password"]']
                            })
                        ]
                    }]).then((added) => {
                        expect(added.length).toBe(1);

                        // Actions
                        expect(added[0].actions.length).toBe(3);

                        // RequestContentScript
                        expect(added[0].actions[0] instanceof MockRequestContentScript).toBeTruthy();
                        expect(added[0].actions[0].options).toEqual({
                            css: ['test.css']
                        });

                        // SetIcon
                        expect(added[0].actions[1] instanceof MockSetIcon).toBeTruthy();
                        expect(added[0].actions[1].options).toEqual({
                            imageData: 'imageData'
                        });

                        // ShowPageAction
                        expect(added[0].actions[2] instanceof MockShowPageAction).toBeTruthy();

                        // Conditions
                        expect(added[0].conditions.length).toBe(1);

                        // PageStateMatcher
                        expect(added[0].conditions[0] instanceof MockPageStateMatcher).toBeTruthy();
                        expect(added[0].conditions[0].options).toEqual({
                            pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
                            css: ['input[type="password"]']
                        });
                    });
                });

                it('should throw an error on empty actions', (done) => {
                    declarativeContent.onPageChanged.addRules([{
                        actions: [],
                        conditions: [
                            new PageStateMatcher({
                                pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
                                css: ['input[type="password"]']
                            })
                        ]
                    }]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('At least one action is required');
                        done();
                    });
                });

                it('should throw an error on empty conditions', (done) => {
                    declarativeContent.onPageChanged.addRules([{
                        actions: [
                            new ShowPageAction()
                        ],
                        conditions: []
                    }]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('At least one condition is required');
                        done();
                    });
                });

                it('should throw an error on nil rule', (done) => {
                    declarativeContent.onPageChanged.addRules([null]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('Invalid rule: null');
                        done();
                    });
                });

                it('should throw an error on invalid rule', (done) => {
                    declarativeContent.onPageChanged.addRules([false]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('Invalid rule: false');
                        done();
                    });
                });

                it('should throw an error on invalid actions', (done) => {
                    declarativeContent.onPageChanged.addRules([{
                        actions: false,
                        conditions: [
                            new PageStateMatcher({
                                pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
                                css: ['input[type="password"]']
                            })
                        ]
                    }]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('Invalid actions: false');
                        done();
                    });
                });

                it('should throw an error on invalid conditions', (done) => {
                    declarativeContent.onPageChanged.addRules([{
                        actions: [
                            new ShowPageAction()
                        ],
                        conditions: false
                    }]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('Invalid conditions: false');
                        done();
                    });
                });

                it('should throw an error on invalid action', (done) => {
                    declarativeContent.onPageChanged.addRules([{
                        actions: [
                            'error'
                        ],
                        conditions: [
                            new PageStateMatcher({
                                pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
                                css: ['input[type="password"]']
                            })
                        ]
                    }]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('Invalid action: error');
                        done();
                    });
                });

                it('should throw an error on invalid condition', (done) => {
                    declarativeContent.onPageChanged.addRules([{
                        actions: [
                            new ShowPageAction()
                        ],
                        conditions: [
                            'error'
                        ]
                    }]).then(() => {
                        done.fail('Promise wasn\'t rejected');
                    }, (err) => {
                        expect(err.message).toBe('Invalid condition: error');
                        done();
                    });
                });
            });
        });
    });

    describe('Firefox', () => {
        let declarativeContent = new DeclarativeContent({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {}
            }
        });

        let action = new RequestContentScript({
            css: ['test.css']
        });

        describe('$create', () => {
            it('should throw an error', () => {
                expect(() => action.$create(declarativeContent)).toThrowError(
                    Error, 'declarativeContent is not available'
                );
            });
        });
    });
});
