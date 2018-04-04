import {MessageSender, Port} from './objects/port';
import {ImageFormat, Tab, Tabs} from './tabs';


describe('Tab', () => {
    describe('Chrome', () => {
        let tab = new Tab({
            active: true,
            audible: false,
            autoDiscardable: false,
            discarded: false,
            favIconUrl: 'favIconUrl',
            height: 100,
            hidden: false,
            highlighted: false,
            id: 'id',
            incognito: false,
            index: 1,
            openerTabId: null,
            pinned: true,
            selected: false,
            sessionId: 'sessionId',
            status: 'status',
            title: 'title',
            url: 'url',
            width: 400,
            windowId: 1,

            mutedInfo: {
                extensionId: null,
                muted: true,
                reason: 'user'
            }
        }, {
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false
            }
        });

        // region Properties

        describe('active', () => {
            it('should return value', () => {
                expect(tab.active).toBeTruthy();
            });
        });

        describe('audible', () => {
            it('should return value', () => {
                expect(tab.audible).toBeFalsy();
            });
        });

        describe('autoDiscardable', () => {
            it('should return value', () => {
                expect(tab.autoDiscardable).toBeFalsy();
            });
        });

        describe('cookieStoreId', () => {
            it('should throw an error', () => {
                expect(() => tab.cookieStoreId).toThrowError(
                    Error, 'cookieStoreId is not available (not implemented)'
                );
            });
        });

        describe('discarded', () => {
            it('should return value', () => {
                expect(tab.discarded).toBeFalsy();
            });
        });

        describe('favIconUrl', () => {
            it('should return value', () => {
                expect(tab.favIconUrl).toBe('favIconUrl');
            });
        });

        describe('height', () => {
            it('should return value', () => {
                expect(tab.height).toBe(100);
            });
        });

        describe('hidden', () => {
            it('should return value', () => {
                expect(tab.hidden).toBeFalsy();
            });
        });

        describe('highlighted', () => {
            it('should return value', () => {
                expect(tab.highlighted).toBeFalsy();
            });
        });

        describe('id', () => {
            it('should return value', () => {
                expect(tab.id).toBe('id');
            });
        });

        describe('incognito', () => {
            it('should return value', () => {
                expect(tab.incognito).toBeFalsy();
            });
        });

        describe('index', () => {
            it('should return value', () => {
                expect(tab.index).toBe(1);
            });
        });

        describe('isArticle', () => {
            it('should throw an error', () => {
                expect(() => tab.isArticle).toThrowError(
                    Error, 'isArticle is not available (not implemented)'
                );
            });
        });

        describe('isInReaderMode', () => {
            it('should throw an error', () => {
                expect(() => tab.isInReaderMode).toThrowError(
                    Error, 'isInReaderMode is not available (not implemented)'
                );
            });
        });

        describe('lastAccessed', () => {
            it('should throw an error', () => {
                expect(() => tab.lastAccessed).toThrowError(
                    Error, 'lastAccessed is not available (not implemented)'
                );
            });
        });

        describe('mutedInfo', () => {
            it('should return value', () => {
                expect(tab.mutedInfo).toEqual({
                    extensionId: null,
                    muted: true,
                    reason: 'user'
                });
            });
        });

        describe('openerTabId', () => {
            it('should return value', () => {
                expect(tab.openerTabId).toBeNull();
            });
        });

        describe('pinned', () => {
            it('should return value', () => {
                expect(tab.pinned).toBeTruthy();
            });
        });

        describe('selected', () => {
            it('should return value', () => {
                expect(tab.selected).toBeFalsy();
            });
        });

        describe('sessionId', () => {
            it('should return value', () => {
                expect(tab.sessionId).toBe('sessionId');
            });
        });

        describe('status', () => {
            it('should return value', () => {
                expect(tab.status).toBe('status');
            });
        });

        describe('title', () => {
            it('should return value', () => {
                expect(tab.title).toBe('title');
            });
        });

        describe('url', () => {
            it('should return value', () => {
                expect(tab.url).toBe('url');
            });
        });

        describe('width', () => {
            it('should return value', () => {
                expect(tab.width).toBe(400);
            });
        });

        describe('windowId', () => {
            it('should return value', () => {
                expect(tab.windowId).toBe(1);
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let tab = new Tab({
            active: true,
            audible: false,
            cookieStoreId: 'cookieStoreId',
            discarded: false,
            favIconUrl: 'favIconUrl',
            height: 100,
            hidden: false,
            highlighted: false,
            id: 'id',
            incognito: false,
            index: 1,
            isArticle: true,
            isInReaderMode: false,
            lastAccessed: 123,
            openerTabId: null,
            pinned: true,
            selected: false,
            status: 'status',
            title: 'title',
            url: 'url',
            width: 400,
            windowId: 1,

            mutedInfo: {
                extensionId: null,
                muted: true,
                reason: 'user'
            }
        }, {
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true
            }
        });

        // region Properties

        describe('active', () => {
            it('should return value', () => {
                expect(tab.active).toBeTruthy();
            });
        });

        describe('audible', () => {
            it('should return value', () => {
                expect(tab.audible).toBeFalsy();
            });
        });

        describe('autoDiscardable', () => {
            it('should throw an error', () => {
                expect(() => tab.autoDiscardable).toThrowError(
                    Error, 'autoDiscardable is not available (not implemented)'
                );
            });
        });

        describe('cookieStoreId', () => {
            it('should return value', () => {
                expect(tab.cookieStoreId).toBe('cookieStoreId');
            });
        });

        describe('discarded', () => {
            it('should return value', () => {
                expect(tab.discarded).toBeFalsy();
            });
        });

        describe('favIconUrl', () => {
            it('should return value', () => {
                expect(tab.favIconUrl).toBe('favIconUrl');
            });
        });

        describe('height', () => {
            it('should return value', () => {
                expect(tab.height).toBe(100);
            });
        });

        describe('hidden', () => {
            it('should return value', () => {
                expect(tab.hidden).toBeFalsy();
            });
        });

        describe('highlighted', () => {
            it('should return value', () => {
                expect(tab.highlighted).toBeFalsy();
            });
        });

        describe('id', () => {
            it('should return value', () => {
                expect(tab.id).toBe('id');
            });
        });

        describe('incognito', () => {
            it('should return value', () => {
                expect(tab.incognito).toBeFalsy();
            });
        });

        describe('index', () => {
            it('should return value', () => {
                expect(tab.index).toBe(1);
            });
        });

        describe('isArticle', () => {
            it('should return value', () => {
                expect(tab.isArticle).toBeTruthy();
            });
        });

        describe('isInReaderMode', () => {
            it('should return value', () => {
                expect(tab.isInReaderMode).toBeFalsy();
            });
        });

        describe('isInReaderMode', () => {
            it('should return value', () => {
                expect(tab.lastAccessed).toBe(123);
            });
        });

        describe('mutedInfo', () => {
            it('should return value', () => {
                expect(tab.mutedInfo).toEqual({
                    extensionId: null,
                    muted: true,
                    reason: 'user'
                });
            });
        });

        describe('openerTabId', () => {
            it('should return value', () => {
                expect(tab.openerTabId).toBeNull();
            });
        });

        describe('pinned', () => {
            it('should return value', () => {
                expect(tab.pinned).toBeTruthy();
            });
        });

        describe('selected', () => {
            it('should return value', () => {
                expect(tab.selected).toBeFalsy();
            });
        });

        describe('sessionId', () => {
            it('should throw an error', () => {
                expect(() => tab.sessionId).toThrowError(
                    Error, 'sessionId is not available (not implemented)'
                );
            });
        });

        describe('status', () => {
            it('should return value', () => {
                expect(tab.status).toBe('status');
            });
        });

        describe('title', () => {
            it('should return value', () => {
                expect(tab.title).toBe('title');
            });
        });

        describe('url', () => {
            it('should return value', () => {
                expect(tab.url).toBe('url');
            });
        });

        describe('width', () => {
            it('should return value', () => {
                expect(tab.width).toBe(400);
            });
        });

        describe('windowId', () => {
            it('should return value', () => {
                expect(tab.windowId).toBe(1);
            });
        });

        // endregion
    });
});

describe('Tabs', () => {
    describe('Chrome', () => {
        let tabs = new Tabs({
            browser: {
                title: 'Chrome',
                name: 'chrome',
                version: '54.0',

                promises: false,

                namespace: {
                    tabs: {
                        // region Methods

                        captureVisibleTab: (windowId, options, callback) => callback({ windowId, options }),

                        connect: (tabId, connectInfo) => ({
                            name: connectInfo.name,

                            sender: {
                                frameId: connectInfo.frameId,
                                id: tabId
                            }
                        }),

                        create: (createProperties, callback) => callback({ createProperties }),
                        detectLanguage: (tabId, callback) => callback({ tabId }),
                        discard: (tabIds, callback) => callback({ tabIds }),
                        duplicate: (tabId, callback) => callback({ tabId }),
                        executeScript: (tabId, details, callback) => callback({ tabId, details }),

                        get: (tabId, callback) => callback({ tabId }),
                        getAllInWindow: (windowId, callback) => callback({ windowId }),
                        getCurrent: (callback) => callback(true),
                        getSelected: (windowId, callback) => callback({ windowId }),
                        getZoom: (tabId, callback) => callback({ tabId }),
                        getZoomSettings: (tabId, callback) => callback({ tabId }),

                        highlight: (highlightInfo, callback) => callback({ highlightInfo }),
                        insertCSS: (tabId, details, callback) => callback({ tabId, details }),
                        move: (tabIds, moveProperties, callback) => callback({ tabIds, moveProperties }),
                        query: (queryInfo, callback) => callback({ queryInfo }),
                        reload: (tabId, reloadProperties, callback) => callback({ tabId, reloadProperties }),
                        remove: (tabIds, callback) => callback({ tabIds }),
                        sendMessage: (tabId, message, options, callback) => callback({ tabId, message, options }),
                        sendRequest: (tabId, request, callback) => callback({ tabId, request }),
                        setZoom: (tabId, zoomFactor, callback) => callback({ tabId, zoomFactor }),
                        setZoomSettings: (tabId, zoomSettings, callback) => callback({ tabId, zoomSettings }),
                        update: (tabId, updateProperties, callback) => callback({ tabId, updateProperties })

                        // endregion
                    }
                }
            }
        });

        // region Events

        // endregion

        // region Methods

        describe('captureTab', () => {
            it('should reject with unsupported error', (done) => {
                tabs.captureTab().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.captureTab is not available (not implemented)');
                    done();
                });
            });
        });

        describe('captureVisibleTab', () => {
            it('should return promise', () => {
                return tabs.captureVisibleTab(1, {
                    format: ImageFormat.JPEG, quality: 100
                }).then((result) => {
                    expect(result).toEqual({
                        windowId: 1,

                        options: {
                            format: ImageFormat.JPEG,
                            quality: 100
                        }
                    });
                });
            });
        });

        describe('connect', () => {
            it('should return instance', () => {
                let port = tabs.connect(1, { name: 'test', frameId: 2 });

                expect(port instanceof Port).toBeTruthy();
                expect(port.name).toBe('test');

                expect(port.sender instanceof MessageSender).toBeTruthy();
                expect(port.sender.frameId).toBe(2);
                expect(port.sender.id).toBe(1);
            });

            it('should return null if no port is returned', () => {
                let tabs = new Tabs({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            tabs: {
                                connect: () => null
                            }
                        }
                    }
                });

                expect(tabs.connect(1, { name: 'test' })).toBeNull();
            });
        });

        describe('create', () => {
            it('should return promise', () => {
                return tabs.create('createProperties').then((result) => {
                    expect(result).toEqual({
                        createProperties: 'createProperties'
                    });
                });
            });
        });

        describe('detectLanguage', () => {
            it('should return promise', () => {
                return tabs.detectLanguage(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('discard', () => {
            it('should return promise', () => {
                return tabs.discard(1).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1
                    });
                });
            });
        });

        describe('duplicate', () => {
            it('should return promise', () => {
                return tabs.duplicate(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('executeScript', () => {
            it('should return promise', () => {
                return tabs.executeScript(1, { allFrames: true }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        details: {
                            allFrames: true
                        }
                    });
                });
            });
        });

        describe('get', () => {
            it('should return promise', () => {
                return tabs.get(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('getAllInWindow', () => {
            it('should return promise', () => {
                return tabs.getAllInWindow(1).then((result) => {
                    expect(result).toEqual({
                        windowId: 1
                    });
                });
            });
        });

        describe('getCurrent', () => {
            it('should return promise', () => {
                return tabs.getCurrent().then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('getSelected', () => {
            it('should return promise', () => {
                return tabs.getSelected(1).then((result) => {
                    expect(result).toEqual({
                        windowId: 1
                    });
                });
            });
        });

        describe('getZoom', () => {
            it('should return promise', () => {
                return tabs.getZoom(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('getZoomSettings', () => {
            it('should return promise', () => {
                return tabs.getZoomSettings(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('hide', () => {
            it('should reject with unsupported error', (done) => {
                tabs.hide(1).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.hide is not available (not implemented)');
                    done();
                });
            });
        });

        describe('highlight', () => {
            it('should return promise', () => {
                return tabs.highlight({ tabs: 1 }).then((result) => {
                    expect(result).toEqual({
                        highlightInfo: {
                            tabs: 1
                        }
                    });
                });
            });
        });

        describe('insertCSS', () => {
            it('should return promise', () => {
                return tabs.insertCSS(1, { code: 'code' }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        details: {
                            code: 'code'
                        }
                    });
                });
            });
        });

        describe('move', () => {
            it('should return promise', () => {
                return tabs.move(1, { index: 2 }).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1,

                        moveProperties: {
                            index: 2
                        }
                    });
                });
            });
        });

        describe('print', () => {
            it('should reject with unsupported error', () => {
                expect(() => tabs.print()).toThrowError(
                    Error, 'tabs.print is not available (not implemented)'
                );
            });
        });

        describe('printPreview', () => {
            it('should reject with unsupported error', (done) => {
                tabs.printPreview().then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.printPreview is not available (not implemented)');
                    done();
                });
            });
        });

        describe('query', () => {
            it('should return promise', () => {
                return tabs.query({ active: true }).then((result) => {
                    expect(result).toEqual({
                        queryInfo: {
                            active: true
                        }
                    });
                });
            });
        });

        describe('reload', () => {
            it('should return promise', () => {
                return tabs.reload(1, { bypassCache: false }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        reloadProperties: {
                            bypassCache: false
                        }
                    });
                });
            });
        });

        describe('remove', () => {
            it('should return promise', () => {
                return tabs.remove(1).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1
                    });
                });
            });
        });

        describe('removeCSS', () => {
            it('should reject with unsupported error', (done) => {
                tabs.removeCSS(1, { code: 'code' }).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.removeCSS is not available (not implemented)');
                    done();
                });
            });
        });

        describe('saveAsPDF', () => {
            it('should reject with unsupported error', (done) => {
                tabs.saveAsPDF({ scaling: 1 }).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.saveAsPDF is not available (not implemented)');
                    done();
                });
            });
        });

        describe('sendMessage', () => {
            it('should return promise', () => {
                return tabs.sendMessage(1, 'message', { frameId: 1 }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,
                        message: 'message',

                        options: {
                            frameId: 1
                        }
                    });
                });
            });
        });

        describe('sendRequest', () => {
            it('should return promise', () => {
                return tabs.sendRequest(1, 'request').then((result) => {
                    expect(result).toEqual({
                        tabId: 1,
                        request: 'request'
                    });
                });
            });
        });

        describe('setZoom', () => {
            it('should return promise', () => {
                return tabs.setZoom(1, 1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,
                        zoomFactor: 1
                    });
                });
            });
        });

        describe('setZoomSettings', () => {
            it('should return promise', () => {
                return tabs.setZoomSettings(1, { defaultZoomFactor: 1 }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        zoomSettings: {
                            defaultZoomFactor: 1
                        }
                    });
                });
            });
        });

        describe('show', () => {
            it('should reject with unsupported error', (done) => {
                tabs.show(1).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.show is not available (not implemented)');
                    done();
                });
            });
        });

        describe('toggleReaderMode', () => {
            it('should reject with unsupported error', (done) => {
                tabs.toggleReaderMode(1).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.toggleReaderMode is not available (not implemented)');
                    done();
                });
            });
        });

        describe('update', () => {
            it('should return promise', () => {
                return tabs.update(1, { active: true }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        updateProperties: {
                            active: true
                        }
                    });
                });
            });
        });

        // endregion
    });

    describe('Firefox', () => {
        let tabs = new Tabs({
            browser: {
                title: 'Firefox',
                name: 'firefox',
                version: '54.0',

                promises: true,

                namespace: {
                    tabs: {
                        // region Methods

                        captureTab: (tabId, options) => Promise.resolve({ tabId, options }),
                        captureVisibleTab: (windowId, options) => Promise.resolve({ windowId, options }),

                        connect: (tabId, connectInfo) => ({
                            name: connectInfo.name,

                            sender: {
                                frameId: connectInfo.frameId,
                                id: tabId
                            }
                        }),

                        create: (createProperties) => Promise.resolve({ createProperties }),
                        detectLanguage: (tabId) => Promise.resolve({ tabId }),
                        discard: (tabIds) => Promise.resolve({ tabIds }),
                        duplicate: (tabId) => Promise.resolve({ tabId }),
                        executeScript: (tabId, details) => Promise.resolve({ tabId, details }),

                        get: (tabId) => Promise.resolve({ tabId }),
                        getAllInWindow: (windowId) => Promise.resolve({ windowId }),
                        getCurrent: () => Promise.resolve(true),
                        getZoom: (tabId) => Promise.resolve({ tabId }),
                        getZoomSettings: (tabId) => Promise.resolve({ tabId }),

                        hide: (tabIds) => Promise.resolve({ tabIds }),
                        insertCSS: (tabId, details) => Promise.resolve({ tabId, details }),
                        move: (tabIds, moveProperties) => Promise.resolve({ tabIds, moveProperties }),
                        print: () => true,
                        printPreview: () => Promise.resolve(true),
                        query: (queryInfo) => Promise.resolve({ queryInfo }),
                        reload: (tabId, reloadProperties) => Promise.resolve({ tabId, reloadProperties }),
                        remove: (tabIds) => Promise.resolve({ tabIds }),
                        removeCSS: (tabId, details) => Promise.resolve({ tabId, details }),
                        saveAsPDF: (pageSettings) => Promise.resolve({ pageSettings }),
                        sendMessage: (tabId, message, options) => Promise.resolve({ tabId, message, options }),
                        setZoom: (tabId, zoomFactor) => Promise.resolve({ tabId, zoomFactor }),
                        show: (tabIds) => Promise.resolve({ tabIds }),
                        toggleReaderMode: (tabId) => Promise.resolve({ tabId }),
                        update: (tabId, updateProperties) => Promise.resolve({ tabId, updateProperties })

                        // endregion
                    }
                }
            }
        });

        // region Events

        // endregion

        // region Methods

        describe('captureTab', () => {
            it('should return promise', () => {
                tabs.captureTab(1, {
                    format: ImageFormat.JPEG,
                    quality: 100
                }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        options: {
                            format: ImageFormat.JPEG,
                            quality: 100
                        }
                    });
                });
            });
        });

        describe('captureVisibleTab', () => {
            it('should return promise', () => {
                return tabs.captureVisibleTab(1, {
                    format: ImageFormat.JPEG,
                    quality: 100
                }).then((result) => {
                    expect(result).toEqual({
                        windowId: 1,

                        options: {
                            format: ImageFormat.JPEG,
                            quality: 100
                        }
                    });
                });
            });
        });

        describe('connect', () => {
            it('should return instance', () => {
                let port = tabs.connect(1, { name: 'test', frameId: 2 });

                expect(port instanceof Port).toBeTruthy();
                expect(port.name).toBe('test');

                expect(port.sender instanceof MessageSender).toBeTruthy();
                expect(port.sender.frameId).toBe(2);
                expect(port.sender.id).toBe(1);
            });

            it('should return null if no port is returned', () => {
                let tabs = new Tabs({
                    browser: {
                        title: 'Chrome',
                        name: 'chrome',
                        version: '54.0',

                        promises: false,

                        namespace: {
                            tabs: {
                                connect: () => null
                            }
                        }
                    }
                });

                expect(tabs.connect(1, { name: 'test' })).toBeNull();
            });
        });

        describe('create', () => {
            it('should return promise', () => {
                return tabs.create('createProperties').then((result) => {
                    expect(result).toEqual({
                        createProperties: 'createProperties'
                    });
                });
            });
        });

        describe('detectLanguage', () => {
            it('should return promise', () => {
                return tabs.detectLanguage(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('discard', () => {
            it('should return promise', () => {
                return tabs.discard(1).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1
                    });
                });
            });
        });

        describe('duplicate', () => {
            it('should return promise', () => {
                return tabs.duplicate(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('executeScript', () => {
            it('should return promise', () => {
                return tabs.executeScript(1, { allFrames: true }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        details: {
                            allFrames: true
                        }
                    });
                });
            });
        });

        describe('get', () => {
            it('should return promise', () => {
                return tabs.get(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('getAllInWindow', () => {
            it('should return promise', () => {
                return tabs.getAllInWindow(1).then((result) => {
                    expect(result).toEqual({
                        windowId: 1
                    });
                });
            });
        });

        describe('getCurrent', () => {
            it('should return promise', () => {
                return tabs.getCurrent().then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('getSelected', () => {
            it('should reject with unsupported error', (done) => {
                tabs.getSelected(1).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.getSelected is not available (not implemented)');
                    done();
                });
            });
        });

        describe('getZoom', () => {
            it('should return promise', () => {
                return tabs.getZoom(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('getZoomSettings', () => {
            it('should return promise', () => {
                return tabs.getZoomSettings(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('hide', () => {
            it('should return promise', () => {
                return tabs.hide(1).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1
                    });
                });
            });
        });

        describe('highlight', () => {
            it('should reject with unsupported error', (done) => {
                tabs.highlight({ tabs: 1 }).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.highlight is not available (not implemented)');
                    done();
                });
            });
        });

        describe('insertCSS', () => {
            it('should return promise', () => {
                return tabs.insertCSS(1, { code: 'code' }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        details: {
                            code: 'code'
                        }
                    });
                });
            });
        });

        describe('move', () => {
            it('should return promise', () => {
                return tabs.move(1, { index: 2 }).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1,

                        moveProperties: {
                            index: 2
                        }
                    });
                });
            });
        });

        describe('print', () => {
            it('should call function', () => {
                tabs.print();
            });
        });

        describe('printPreview', () => {
            it('should return promise', () => {
                return tabs.printPreview().then((result) => {
                    expect(result).toBe(true);
                });
            });
        });

        describe('query', () => {
            it('should return promise', () => {
                return tabs.query({ active: true }).then((result) => {
                    expect(result).toEqual({
                        queryInfo: {
                            active: true
                        }
                    });
                });
            });
        });

        describe('reload', () => {
            it('should return promise', () => {
                return tabs.reload(1, { bypassCache: false }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        reloadProperties: {
                            bypassCache: false
                        }
                    });
                });
            });
        });

        describe('remove', () => {
            it('should return promise', () => {
                return tabs.remove(1).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1
                    });
                });
            });
        });

        describe('removeCSS', () => {
            it('should return promise', () => {
                return tabs.removeCSS(1, { code: 'code' }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        details: {
                            code: 'code'
                        }
                    });
                });
            });
        });

        describe('saveAsPDF', () => {
            it('should return promise', () => {
                return tabs.saveAsPDF({ scaling: 1 }).then((result) => {
                    expect(result).toEqual({
                        pageSettings: {
                            scaling: 1
                        }
                    });
                });
            });
        });

        describe('sendMessage', () => {
            it('should return promise', () => {
                return tabs.sendMessage(1, 'message', { frameId: 1 }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,
                        message: 'message',

                        options: {
                            frameId: 1
                        }
                    });
                });
            });
        });

        describe('sendRequest', () => {
            it('should reject with unsupported error', (done) => {
                tabs.sendRequest(1, 'request').then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.sendRequest is not available (not implemented)');
                    done();
                });
            });
        });

        describe('setZoom', () => {
            it('should return promise', () => {
                return tabs.setZoom(1, 1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,
                        zoomFactor: 1
                    });
                });
            });
        });

        describe('setZoomSettings', () => {
            it('should reject with unsupported error', (done) => {
                tabs.setZoomSettings(1, { defaultZoomFactor: 1 }).then(() => {
                    done.fail('Promise wasn\'t rejected');
                }, (err) => {
                    expect(err.message).toBe('tabs.setZoomSettings is not available (not implemented)');
                    done();
                });
            });
        });

        describe('show', () => {
            it('should return promise', () => {
                return tabs.show(1).then((result) => {
                    expect(result).toEqual({
                        tabIds: 1
                    });
                });
            });
        });

        describe('toggleReaderMode', () => {
            it('should return promise', () => {
                return tabs.toggleReaderMode(1).then((result) => {
                    expect(result).toEqual({
                        tabId: 1
                    });
                });
            });
        });

        describe('update', () => {
            it('should return promise', () => {
                return tabs.update(1, { active: true }).then((result) => {
                    expect(result).toEqual({
                        tabId: 1,

                        updateProperties: {
                            active: true
                        }
                    });
                });
            });
        });

        // endregion
    });
});
