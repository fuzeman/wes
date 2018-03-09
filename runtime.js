import IsNil from 'lodash/isNil';
import RuntimeCompatibility from 'mdn-browser-compat-data/webextensions/api/runtime.json';

import Base from './core/base';


/**
 * Runtime Error.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#property-lastError}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/lastError}
 *
 * @typedef {Object} Runtime~Error
 *
 * @property {String} message - Details about the error which occurred.
 */

/**
 * Browser Information.
 *
 * @typedef {Object} Runtime~BrowserInfo
 *
 * @property {String} [name]    - Browser Name (e.g. "Firefox")
 * @property {String} [vendor]  - Browser Vendor (e.g. "Mozilla")
 * @property {String} [version] - Browser Version (e.g. "51.0" or "51.0a2")
 * @property {String} [buildID] - Browser Build ID (e.g. "20161018004015")
 */

/**
 * Connection Information.
 *
 * @typedef {Object} Runtime~ConnectInfo
 *
 * @property {String} [name]                 - Will be passed to `onConnect`.
 * @property {Boolean} [includeTlsChannelId] - Whether the TLS channel ID should be passed to `onConnectExternal`.
 */

/**
 * Platform Information.
 *
 * @typedef {Object} Runtime~PlatformInfo
 *
 * @property {PlatformArch} [arch]          - The platform's processor architecture.
 * @property {PlatformNaclArch} [nacl_arch] - The native client architecture.
 * @property {PlatformOs} [os]              - The platform's operating system
 */

/**
 * The machine's processor architecture.
 *
 * @type {{arm: string, "x86-32": string, "x86-64": string}}
 */
export const PlatformArch = {
    'arm': 'arm',
    'x86-32': 'x86-32',
    'x86-64': 'x86-64'
};

/**
 * The native client architecture. This may be different from arch on some platforms.
 *
 * @type {{arm: string, "x86-32": string, "x86-64": string}}
 */
export const PlatformNaclArch = {
    'arm': 'arm',
    'x86-32': 'x86-32',
    'x86-64': 'x86-64'
};

/**
 * The operating system the browser is running on.
 *
 * @type {{android: string, cros: string, linux: string, mac: string, openbsd: string, win: string}}
 */
export const PlatformOs = {
    android: 'android',
    cros: 'cros',
    linux: 'linux',
    mac: 'mac',
    openbsd: 'openbsd',
    win: 'win'
};

/**
 * Request Update Check Result.
 *
 * @typedef {Object} Runtime~RequestUpdateCheck
 *
 * @property {RequestUpdateCheckStatus} [status]           - The platform's processor architecture.
 * @property {Runtime~RequestUpdateCheckDetails} [details] - The native client architecture.
 */

/**
 * Request Update Check Details.
 *
 * @typedef {Object} Runtime~RequestUpdateCheckDetails
 *
 * @property {String} [version] - The update's version.
 */

/**
 * Status of the call to {@link Runtime#requestUpdateCheck}.
 *
 * @enum {String}
 */
export const RequestUpdateCheckStatus = {
    /** Update is throttled. */
    throttled: 'throttled',

    /** No update is available. */
    no_update: 'no_update',

    /** An update of the extension is available. */
    update_available: 'update_available'
};

/**
 * {@link Runtime#sendMessage} Options.
 *
 * @typedef {Object} Runtime~SendMessageOptions
 *
 * @property {Boolean} [includeTlsChannelId] - Whether the TLS channel ID should be passed to `onMessageExternal`.
 * @property {Boolean} [toProxyScript]       - If the message is intended for a PAC file loaded using the proxy API.
 */

/**
 * Fired when the other end of the {@link Port} has called {@link Port#disconnect}.
 *
 * @name portDisconnectEvent
 * @function
 * @param {Port} port Port
 */

/**
 * Fired when the other end of the {@link Port} has sent this port a message.
 *
 * @name portMessageEvent
 * @function
 * @param {Object} message Message
 */

/**
 * Fired when an update for the browser is available, but it isn't installed immediately
 * because a browser restart is required.
 *
 * @name browserUpdateAvailableEvent
 * @function
 */

/**
 * Fired when a connection is made with either an extension process or a content script.
 *
 * @name connectEvent
 * @function
 * @param {Port} port Port connecting the current script to the other context it is connecting to.
 */

/**
 * Fired when an extension receives a connection request from a different extension.
 *
 * @name connectExternalEvent
 * @function
 * @param {Port} port Port connecting the current script to the other extension it is connecting to.
 */

/**
 * Fired when the extension is first installed, when the extension is updated to a new version, and
 * when the browser is updated to a new version.
 *
 * @name installedEvent
 * @function
 * @param {OnInstalledDetails} details Installation event details
 */

/**
 * {@link Runtime#onInstalled} Details.
 *
 * @typedef {Object} OnInstalledDetails
 *
 * @property {String} [id]                - The ID of the imported shared module extension that updated.
 * @property {String} [previousVersion]   - The previous version of the extension just updated.
 * @property {OnInstalledReason} [reason] - Reason that this event is being dispatched.
 * @property {Boolean} [temporary]        - True if the add-on was installed temporarily.
 */

/**
 * Reason that the {@link Runtime#onInstalled} event was dispatched.
 *
 * @enum {String}
 */
export const OnInstalledReason = {
    /** The extension was installed. */
    install: 'install',

    /** The extension was updated to a new version. */
    update: 'update',

    /** The browser was updated to a new version. */
    browser_update: 'browser_update',

    /** Another extension, which contains a module used by this extension, was updated. */
    shared_module_update: 'shared_module_update'
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 * &nbsp
 * If you have more than one {@link Runtime#onMessage} listener in the same document, then only one may
 * send a response.
 * &nbsp
 * To send a response synchronously, call `sendResponse` before the listener function returns. To send a
 * response asynchronously:
 * &nbsp
 *  - either keep a reference to the `sendResponse` argument and return true from the listener function. You
 *    will then be able to call `sendResponse` after the listener function has returned.
 * &nbsp
 *  - or return a Promise from the listener function and resolve the promise when the response is ready.
 *
 * @name messageEvent
 * @function
 *
 * @param {Object} message The message itself. This is a JSON-ifiable object.
 *
 * @param {MessageSender} sender Object representing the sender of the message.
 *
 * @param {Function} sendResponse A function to call, at most once, to send a response to the message. The
 *                                function takes a single argument, which may be any JSON-ifiable object.
 *                                This argument is passed back to the message sender.
 *
 * @returns {Boolean, Promise}
 */

/**
 * Fired when a message is sent from another extension. Cannot be used in a content script.
 * &nbsp
 * If you have more than one {@link Runtime#onMessageExternal} listener in the same document, then only one may
 * send a response.
 * &nbsp
 * To send a response synchronously, call `sendResponse` before the listener function returns. To send a
 * response asynchronously:
 * &nbsp
 *  - either keep a reference to the `sendResponse` argument and return true from the listener function. You
 *    will then be able to call `sendResponse` after the listener function has returned.
 * &nbsp
 *  - or return a Promise from the listener function and resolve the promise when the response is ready.
 *
 * @name messageExternalEvent
 * @function
 *
 * @param {Object} message The message itself. This is a JSON-ifiable object.
 *
 * @param {MessageSender} sender Object representing the sender of the message.
 *
 * @param {Function} sendResponse A function to call, at most once, to send a response to the message. The
 *                                function takes a single argument, which may be any JSON-ifiable object.
 *                                This argument is passed back to the message sender.
 *
 * @returns {Boolean, Promise}
 */

/**
 * Fired when an app or the device that it runs on needs to be restarted.
 *
 * @name restartRequiredEvent
 * @function
 *
 * @param {OnRestartRequiredReason} reason The reason that the event is being dispatched.
 */

/**
 * Reason that the {@link Runtime#onRestartRequired} event was dispatched.
 *
 * @enum {String}
 */
export const OnRestartRequiredReason = {
    /** The application is being updated to a newer version. */
    app_update: 'app_update',

    /** The browser/OS is updated to a newer version. */
    os_update: 'os_update',

    /** The system has run for more than the permitted uptime set in the enterprise policy. */
    periodic: 'periodic'
};

/**
 * Fired when a profile that has this extension installed first starts up.
 *
 * @name startupEvent
 * @function
 */

/**
 * Fired on the event page just before it is unloaded.
 *
 * @name suspendEvent
 * @function
 */

/**
 * Fired after {@link Runtime#onSuspend} to indicate that the app won't be unloaded after all.
 *
 * @name suspendCanceledEvent
 * @function
 */

/**
 * Fired when an update to the extension is available. This event enables an extension to delay an update:
 * for example, because it is in the middle of some operation which should not be interrupted.
 *
 * @name updateAvailableEvent
 * @function
 * @param {OnUpdateAvailableDetails} details Update Details
 */

/**
 * {@link Runtime#onUpdateAvailable} Details.
 *
 * @typedef {Object} OnUpdateAvailableDetails
 *
 * @property {String} [version] - Version of the update.
 */

/**
 * An object containing information about the sender of a message or connection request; this is passed to
 * the {@link Runtime#onMessage} listener.
 * &nbsp
 * It is also a property of {@link Port}, but only in the {@link Port} instance passed into the
 * {@link Runtime#onConnect} or {@link Runtime#onConnectExternal} listeners.
 */
export class MessageSender extends Base {
    static Title = 'MessageSender';

    static Name = 'runtime.MessageSender';
    static Compatibility = RuntimeCompatibility;

    constructor(instance, browser = null) {
        super(browser);

        this._instance = instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * The tab which opened the connection. This property will only be defined when the connection was opened
     * from a tab (including content scripts).
     *
     * @returns {Tab}
     */
    get tab() {
        return this.$property('tab');
    }

    /**
     * The frame that opened the connection. Zero for top-level frames, positive for child frames. This will
     * only be set when tab is set.
     *
     * @returns {Number}
     */
    get frameId() {
        return this.$property('frameId');
    }

    /**
     * The ID of the extension that sent the message, if the message was sent by an extension. If the sender set
     * an ID explicitly using the applications key in manifest.json, then id will have this value. Otherwise it
     * will have the ID that was generated for the sender.
     * &nbsp
     * Note that in Firefox, before version 54, this value was the extension's internal ID (that is, the UUID
     * that appears in the extension's URL).
     *
     * @returns {String}
     */
    get id() {
        return this.$property('id');
    }

    /**
     * The URL of the page or frame hosting the script that sent the message.
     * &nbsp
     * If the sender is a script running in an extension page (such as a background page,
     * an options page, or a browser action or page action popup), the URL will be in the form
     * "moz-extension://<extension-internal-id>/path/to/page.html". If the sender is a background script
     * and you haven't included a background page, it will be "moz-extension://<extension-internal-id>/_blank.html".
     * &nbsp
     * If the sender is a script running in a web page (including content scripts as well as normal page scripts),
     * then url will be the web page URL. If the script is running in an iframe, url will be the iframe's URL.
     *
     * @returns {String}
     */
    get url() {
        return this.$property('url');
    }

    /**
     * The TLS channel ID of the page or frame that opened the connection, if requested by the extension,
     * and if available.
     *
     * @returns {String}
     */
    get tlsChannelId() {
        return this.$property('tlsChannelId');
    }
}

/**
 * A Port object represents one end of a connection between two specific contexts, which can be used to
 * exchange messages.
 * &nbsp
 * One side initiates the connection, using a {@link Runtime#connect} API. This returns a {@link Port} object. The
 * other side listens for connection attempts using an {@link Runtime#onConnect} listener. This is passed a
 * corresponding {@link Port} object.
 * &nbsp
 * Once both sides have {@link Port} objects, they can exchange JSON messages using {@link Port#postMessage} and
 * {@link Port#onMessage}. When they are finished, either end can disconnect using {@link Port#disconnect}, which
 * will generate a {@link Port#onDisconnect} event at the other end, enabling the other end to do any cleanup required.
 * &nbsp
 * You can use this pattern to communicate between:
 * &nbsp
 *  - different parts of your extension (for example, between content scripts and background scripts)
 * &nbsp
 *  - between your extension and a native application running on the user's computer.
 * &nbsp
 *  - between your extension and a different extension
 */
export class Port extends Base {
    static Title = 'Port';

    static Name = 'runtime.Port';
    static Compatibility = RuntimeCompatibility;

    constructor(instance, browser = null) {
        super(browser);

        this._instance = instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * If the port was disconnected due to an error, this will be set to an object with a string property message,
     * giving you more information about the error. See {@link onDisconnect}.
     *
     * @returns {Object}
     */
    get error() {
        return this.$property('error');
    }

    /**
     * The port's name, defined in the {@link Runtime#connect} or {@link Tabs#connect} call that created it. If
     * this port is connected to a native application, its name is the name of the native application.
     *
     * @returns {String}
     */
    get name() {
        return this.$property('name');
    }

    /**
     * Contains information about the sender of the message. This property will only be present on ports passed
     * to {@link Runtime#onConnect}/{@link Runtime#onConnectExternal} listeners.
     *
     * @returns {MessageSender}
     */
    get sender() {
        let instance = this.$property('sender');

        if(IsNil(instance)) {
            return null;
        }

        return new MessageSender(instance);
    }

    /**
     * Listener will be called when the other end has called {@link Port#disconnect}. This event will only be
     * fired once for each port. The listener function will be passed the {@link Port} object. If the port was
     * disconnected due to an error, then the {@link Port} argument will contain an error property giving more
     * information about the error.
     * &nbsp
     * Note that on Chrome {@link Port#error} is not supported: instead, use {@link Runtime#lastError} to get
     * the error message.
     *
     * @returns {Listener} Listener that emits {@link portDisconnectEvent disconnect} events
     */
    get onDisconnect() {
        return this.$listener('onDisconnect');
    }

    /**
     * Listener will be called when the other end has sent this port a message. The listener will be passed the
     * JSON object that the other end sent.
     *
     * @returns {Listener} Listener that emits {@link portMessageEvent message} events
     */
    get onMessage() {
        return this.$listener('onMessage');
    }

    /**
     * Disconnects a port. Either end can call this when they have finished with the port. It will cause
     * {@link onDisconnect} to be fired at the other end. This is useful if the other end is maintaining
     * some state relating to this port, which can be cleaned up on disconnect. If this port is connected
     * to a native application, this function will close the native application.
     */
    disconnect() {
        this.$call('disconnect');
    }

    /**
     *  Send a message to the other end. This takes one argument, which is a JSON object representing the message
     *  to send. It will be delivered to any script listening to the port's {@link Port#onMessage} event, or to
     *  the native application if this port is connected to a native application.
     *
     *  @param {Object} message Message
     */
    postMessage(message) {
        this.$call('postMessage', message);
    }
}

/**
 * This module provides information about your extension and the environment it's running in.
 *
 * It also provides messaging APIs enabling you to:
 *
 *  - Communicate between different parts of your extension.
 *  - Communicate with other extensions.
 *  - Communicate with native applications.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime}
 */
export class Runtime extends Base {
    static Title = 'Runtime';

    static Name = 'runtime';
    static Compatibility = RuntimeCompatibility;

    /**
     * The ID of the extension/app.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#property-id}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/id}
     *
     * @returns {String}
     */
    get id() {
        return this.$property('id');
    }

    /**
     * This will be defined during an API method callback if there was an error.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#property-lastError}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/lastError}
     *
     * @returns {...Runtime~Error}
     */
    get lastError() {
        return this.$property('lastError');
    }

    /**
     * Fired when an update for the browser is available, but isn't installed immediately because a
     * browser restart is required.
     * &nbsp
     * @deprecated Deprecated, use `runtime.onRestartRequired` instead.
     *
     * @returns {Listener} Listener that emits {@link browserUpdateAvailableEvent browserUpdateAvailable} events
     */
    get onBrowserUpdateAvailable() {
        return this.$listener('onBrowserUpdateAvailable');
    }

    /**
     * Fired when a connection is made with either an extension process or a content script.
     *
     * @returns {Listener} Listener that emits {@link connectEvent connect} events
     */
    get onConnect() {
        return this.$listener('onConnect');
    }

    /**
     * Fired when a connection is made with another extension.
     * &nbsp
     * To send a message which will be received by the {@link onConnectExternal} listener, use {@link connect}, passing
     * the ID of the recipient in the `extensionId` parameter.
     * &nbsp
     * The listener is passed a {@link Port} which it can then use to send and receive messages. The Port also contains
     * a `sender` property, which is a {@link MessageSender} object, and which the recipient can use to check the
     * sender's ID.
     *
     * @returns {Listener} Listener that emits {@link connectExternalEvent connectExternal} events
     */
    get onConnectExternal() {
        return this.$listener('onConnectExternal');
    }

    /**
     * Fired when the extension is first installed, when the extension is updated to a new version,
     * and when the browser is updated to a new version.
     * &nbsp
     * Note that {@link onInstalled} is not the same as {@link Management#onInstalled}. The {@link onInstalled}
     * event is fired only for your extension. The {@link Management#onInstalled} event is fired for any extensions.
     *
     * @returns {Listener} Listener that emits {@link installedEvent installed} events.
     */
    get onInstalled() {
        return this.$listener('onInstalled');
    }

    /**
     * Fired when a message is sent from either an extension process or a content script.
     *
     * @returns {Listener} Listener that emits {@link messageEvent message} events.
     */
    get onMessage() {
        return this.$listener('onMessage');
    }

    /**
     * Fired when a message is sent from another extension. Cannot be used in a content script.
     *
     * @returns {Listener} Listener that emits {@link messageExternalEvent messageExternal} events.
     */
    get onMessageExternal() {
        return this.$listener('onMessageExternal');
    }

    /**
     * Fired when an app or the device that it runs on needs to be restarted. The app should close all
     * its windows at its earliest convenience to let the restart happen. If the app does nothing, a
     * restart will be enforced after a 24-hour grace period has passed. Currently, this event is only
     * fired for Chrome OS kiosk apps.
     *
     * @returns {Listener} Listener that emits {@link restartRequiredEvent restartRequired} events.
     */
    get onRestartRequired() {
        return this.$listener('onRestartRequired');
    }

    /**
     * Fired when a profile that has this extension installed first starts up. This event is not fired
     * when a private browsing/incognito profile is started, even if this extension is operating in
     * 'split' incognito mode.
     *
     * @returns {Listener} Listener that emits {@link startupEvent startup} events.
     */
    get onStartup() {
        return this.$listener('onStartup');
    }

    /**
     * Sent to the event page just before it is unloaded. This gives the extension an opportunity to
     * do some cleanup. Note that since the page is unloading, any asynchronous operations started
     * while handling this event are not guaranteed to complete.
     *
     * @returns {Listener} Listener that emits {@link suspendEvent suspend} events.
     */
    get onSuspend() {
        return this.$listener('onSuspend');
    }

    /**
     * Sent after {@link onSuspend} to indicate that the extension won't be unloaded after all.
     *
     * @returns {Listener} Listener that emits {@link suspendCanceledEvent suspendCanceled} events.
     */
    get onSuspendCanceled() {
        return this.$listener('onSuspendCanceled');
    }

    /**
     * Fired when an update to the extension is available. This event enables an extension to delay an
     * update: for example, because it is in the middle of some operation which should not be interrupted.
     * &nbsp
     * If the extension is not listening for this event when an update becomes available, the extension is
     * reloaded immediately and the update is applied. If the extension is listening, then the update will
     * be applied the next time the extension is reloaded. This happens if:
     * &nbsp
     *  - the browser is restarted
     * &nbsp
     *  - the extension is disabled and re-enabled
     * &nbsp
     *  - the extension explicitly reloads itself by calling {@link reload}.
     *
     * @returns {Listener} Listener that emits {@link updateAvailableEvent updateAvailable} events.
     */
    get onUpdateAvailable() {
        return this.$listener('onUpdateAvailable');
    }

    /**
     * Make a connection between different contexts inside the extension.
     * &nbsp
     * You can call this:
     * &nbsp
     *  - in an extension's content scripts, to establish a connection with the extension's background scripts (or
     *    similarly privileged scripts, like popup scripts or options page scripts).
     * &nbsp
     *  - in an extension's background scripts (or similarly privileged scripts), to establish a connection with a
     *    different extension.
     * &nbsp
     * Note that you can't use this function to connect an extension to its content scripts. To do this, use
     * {@link Tabs#connect}.
     *
     * @param {String} [extensionId] The ID of the extension to connect to. If the target has set an ID explicitly
     * using the "applications" key in manifest.json, then `extensionId` should have that value. Otherwise it
     * should have the ID that was generated for the target.
     *
     * @param {...Runtime.ConnectInfo} [connectInfo] Details of the connection.
     *
     * @returns {Port} Port through which messages can be sent and received. The port's `onDisconnect` event
     * is fired if the extension does not exist.
     */
    connect(extensionId, connectInfo) {
        let instance = this.$call('connect', extensionId, connectInfo);

        if(IsNil(instance)) {
            return null;
        }

        return new Port(instance);
    }

    /**
     * Connects the extension to a native application on the user's computer.
     * &nbsp
     * This takes the name of a native application as a parameter. It starts the native application and returns
     * a {@link Port} object to the caller.
     * &nbsp
     * The caller can then use the Port to exchange messages with the native application using {@link Port#postMessage}
     * and {@link Port#onMessage}.
     * &nbsp
     * The native application will run until it exits itself, or the caller calls {@link Port#disconnect}, or the page
     * that created the Port is destroyed. Once the Port is disconnected the browser will give the process
     * a few seconds to exit gracefully, and then kill it if it has not exited.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/connectNative}
     *
     * @param {String} application The name of the native application to connect to. This must match the "name"
     *                             property in the native application's manifest file.
     *
     * @returns {Port} The port which the caller can use to exchange messages with the native application.
     */
    connectNative(application) {
        let instance = this.$call('connectNative', application);

        if(IsNil(instance)) {
            return null;
        }

        return new Port(instance);
    }

    /**
     * Retrieve the Window object for the background page running inside the current extension.
     * &nbsp
     * This provides a convenient way for other privileged extension scripts to get direct access to the background
     * script's scope. This enables them to access variables or call functions defined in that scope. "Privileged
     * script" here includes scripts running in options pages, or scripts running in browser action or page action
     * popups, but does not include content scripts.
     * &nbsp
     * Note that variables that were declared using const or let do not appear in the Window object returned by
     * this function.
     *&nbsp
     * Also note that this method cannot be used in a private window in Firefox - it always returns null.
     *&nbsp
     * If the background page is an event page, the system will ensure it is loaded before resolving the promise.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getBackgroundPage}
     *
     * @returns {Promise} A `Promise` that will be fulfilled with the `Window` object for the background page, if there
     *                    is one. If the extension does not include a background page, the promise is rejected with an
     *                    error message.
     */
    getBackgroundPage() {
        return this.$promise('getBackgroundPage');
    }

    /**
     * Returns information about the browser in which the extension is installed.
     *
     * @returns {Promise} A Promise that will be fulfilled with {@link Runtime~BrowserInfo}
     */
    getBrowserInfo() {
        return this.$promise('getBrowserInfo');
    }

    /**
     * Get the complete manifest.json file, serialized to a JSON object.
     *
     * @returns {Object} A JSON object representing the manifest.
     */
    getManifest() {
        return this.$call('getManifest');
    }

    /**
     * Returns a DirectoryEntry object representing the package directory.
     *
     * @returns {Promise} A Promise that will be fulfilled with a DirectoryEntry object representing the
     *                    package directory.
     */
    getPackageDirectoryEntry() {
        return this.$promise('getPackageDirectoryEntry');
    }

    /**
     * Returns information about the current platform.
     *
     * @returns {Promise} A Promise that will be fulfilled with {@link Runtime~PlatformInfo}
     */
    getPlatformInfo() {
        return this.$promise('getPlatformInfo');
    }

    /**
     * Given a relative path from the manifest.json to a resource packaged with the extension, return a
     * fully-qualified URL.
     * &nbsp
     * This function does not check that the resource actually exists at that URL.
     *
     * @param {String} path A relative path from the manifest.json to a resource packaged with the extension.
     *
     * @returns {String} The fully-qualified URL to the resource.
     */
    getURL(path) {
        return this.$call('getURL', path);
    }

    /**
     * If your extension has an options page defined, this method opens it.
     *
     * @returns {Promise} A Promise that will be fulfilled with no arguments when the options page has been
     *                    created successfully, or rejected with an error message if the operation failed.
     */
    openOptionsPage() {
        return this.$promise('openOptionsPage');
    }

    /**
     * Reloads the extension.
     * &nbsp
     * If there are any pending updates for the extension, that have been deferred by listening to
     * {@link onUpdateAvailable}, then they will be applied on reload.
     */
    reload() {
        this.$call('reload');
    }

    /**
     * Check to see if an update for the extension is available.
     *
     * @returns {Promise} A Promise that will be fulfilled with {@link Runtime~RequestUpdateCheck}.
     */
    requestUpdateCheck() {
        return this.$promise('requestUpdateCheck');
    }

    /**
     * Sends a single message to event listeners within your extension or a different extension.
     * &nbsp
     * If sending to your extension, omit the `extensionId` argument. The {@link onMessage} event will be fired in
     * each page in your extension, except for the frame that called {@link sendMessage}.
     * &nbsp
     * If sending to a different extension, include the `extensionId` argument set to the other
     * extension's ID. {@link onMessageExternal} will be fired in the other extension.
     * &nbsp
     * Extensions cannot send messages to content scripts using this method. To send messages to
     * content scripts, use {@link Tabs#sendMessage}.
     *
     * @param {String} [extensionId] The ID of the extension to send the message to. Include this to send the
     *                               message to a different extension. If the intended recipient has set an ID
     *                               explicitly using the applications key in manifest.json, then `extensionId`
     *                               should have that value. Otherwise it should have the ID that was generated
     *                               for the intended recipient. If `extensionId` is omitted, the message will
     *                               be sent to your own extension.
     *
     * @param {Object} message An object that can be serialized to JSON.
     *
     * @param {Runtime~SendMessageOptions} [options] Options
     *
     * @returns {Promise} A Promise. If the receiver sent a response, this will be fulfilled with the response
     *                    as a JSON object. Otherwise it will be fulfilled with no arguments. If an error occurs
     *                    while connecting to the extension, the promise will be rejected with an error message.
     */
    sendMessage(extensionId, message, options) {
        return this.$promise('sendMessage', extensionId, message, options);
    }

    /**
     * Sends a single message from an extension to a native application.
     * &nbsp
     * This takes two mandatory parameters: the name of the native application and a JSON object which is the
     * message to send it. The browser will launch the native application and deliver the message.
     * &nbsp
     * This is an asynchronous function that returns a Promise. The first message sent by the native application
     * is treated as a response to the sendNativeMessage() call, and the promise will be fulfilled with this
     * message as a parameter. Note that you can't use {@link onMessage} to get responses from the application:
     * you must use the callback function instead.
     * &nbsp
     * A new instance of the application is launched for the call to {@link sendNativeMessage}. The browser will
     * terminate the native application after getting a reply. To terminate a native application, the browser
     * will close the pipe, give the process a few seconds to exit gracefully, and then kill it if it has not exited.
     *
     * @param {String} application The name of the native application. This must match the "name" property in the
     *                             native application's manifest file.
     *
     * @param {Object} message A JSON object that will be sent to the native application.
     *
     * @returns {Promise} If the sender sent a response, this will be fulfilled with the response as a JSON object.
     *                    Otherwise it will be fulfilled with no arguments. If an error occurs while connecting to
     *                    the native application, the promise will be rejected with an error message.
     */
    sendNativeMessage(application, message) {
        return this.$promise('sendNativeMessage', application, message);
    }

    /**
     * Sets the URL to be visited when the extension is uninstalled. This may be used to clean up server-side
     * data, do analytics, or implement surveys. The URL can be a maximum 255 characters.
     *
     * @param {String} url URL to be opened after the extension is uninstalled. This URL must have an http or
     *                     https scheme. Set it to an empty string to not open a new tab upon uninstallation.
     *
     * @returns {Promise} A Promise that will be fulfilled with no arguments when the URL has been set, or
     *                    rejected with an error message if the operation failed.
     */
    setUninstallURL(url) {
        return this.$promise('setUninstallURL', url);
    }
}

export {
    RuntimeCompatibility
};

export default new Runtime();
