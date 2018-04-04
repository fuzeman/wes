import {ContentScripts, RegisteredContentScript} from './contentScripts';


describe('RegisteredContentScript', () => {
    describe('Chrome', () => {
        let contentScript = new RegisteredContentScript(null, {
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false
            }
        });

        describe('unregister', () => {
            it('should throw an error', () => {
                expect(() => contentScript.unregister()).toThrowError(
                    Error, 'contentScripts is not available'
                );
            });
        });
    });

    describe('Firefox', () => {
        let contentScript = new RegisteredContentScript({
            unregister: () => true
        }, {
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        describe('unregister', () => {
            it('should be callable', () => {
                contentScript.unregister();
            });
        });
    });
});

describe('ContentScripts', () => {
    describe('Chrome', () => {
        let contentScripts = new ContentScripts({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: true,

                namespace: {}
            }
        });

        describe('register', () => {
            it('should reject with unsupported error', (done) => {
                contentScripts.register({
                    matches: ['*://test/*']
                }).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('contentScripts is not available');
                    done();
                });
            });
        });
    });

    describe('Firefox', () => {
        let contentScripts = new ContentScripts({
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true,

                namespace: {
                    contentScripts: {
                        register: (contentScriptOptions) => Promise.resolve(contentScriptOptions)
                    }
                }
            }
        });

        describe('register', () => {
            it('should return instance', () => {
                return contentScripts.register({
                    matches: ['*://test/*']
                }).then((contentScript) => {
                    expect(contentScript instanceof RegisteredContentScript).toBeTruthy();
                    expect(contentScript.$target.matches).toEqual(['*://test/*']);
                });
            });

            it('should return null', () => {
                return contentScripts.register().then((contentScript) => {
                    expect(contentScript).toBeNull();
                });
            });
        });
    });
});
