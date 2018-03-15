import IsNil from 'lodash/isNil';
import RuntimeCompatibility from 'mdn-browser-compat-data/webextensions/api/runtime.json';

import Base from './core/base';
import Event from './core/event';
import {Port} from './objects/port';


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
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getBrowserInfo}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#method-connect}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/connect}
 *
 * @typedef {Object} Runtime~ConnectInfo
 *
 * @property {String} [name]                 - Will be passed to `onConnect`.
 * @property {Boolean} [includeTlsChannelId] - Whether the TLS channel ID should be passed to `onConnectExternal`.
 */

// region Platform

/**
 * Platform Information.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-PlatformInfo}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/PlatformInfo}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#type-PlatformArch}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/PlatformArch}
 *
 * @enum {String}
 */
export const PlatformArch = {
    /** The platform is based on arm architecture. */
    'arm': 'arm',

    /** The platform is based on x86 32-bit architecture. */
    'x86-32': 'x86-32',

    /** The platform is based on x86 64-bit architecture. */
    'x86-64': 'x86-64'
};

/**
 * The native client architecture. This may be different from arch on some platforms.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-PlatformNaclArch}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/PlatformNaclArch}
 *
 * @enum {String}
 */
export const PlatformNaclArch = {
    'arm': 'arm',
    'x86-32': 'x86-32',
    'x86-64': 'x86-64'
};

/**
 * The operating system the browser is running on.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-PlatformOs}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/PlatformOs}
 *
 * @enum {String}
 */
export const PlatformOs = {
    /** The underlying operating system is Android. */
    android: 'android',

    /** The underlying operating system is Chrome OS. */
    cros: 'cros',

    /** The underlying operating system is Linux. */
    linux: 'linux',

    /** The underlying operating system is Mac OS X. */
    mac: 'mac',

    /** The underlying operating system is Open/FreeBSD. */
    openbsd: 'openbsd',

    /** The underlying operating system is Windows. */
    win: 'win'
};

// endregion

// region Request Update Check

/**
 * Request Update Check Result.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#method-requestUpdateCheck}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/requestUpdateCheck}
 *
 * @typedef {Object} Runtime~RequestUpdateCheck
 *
 * @property {RequestUpdateCheckStatus} [status]           - The platform's processor architecture.
 * @property {Runtime~RequestUpdateCheckDetails} [details] - The native client architecture.
 */

/**
 * Request Update Check Details.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#method-requestUpdateCheck}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/requestUpdateCheck}
 *
 * @typedef {Object} Runtime~RequestUpdateCheckDetails
 *
 * @property {String} [version] - The update's version.
 */

/**
 * Status of the call to {@link Runtime#requestUpdateCheck}.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-RequestUpdateCheckStatus}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/RequestUpdateCheckStatus}
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

// endregion

/**
 * {@link Runtime#sendMessage} Options.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#method-sendMessage}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/sendMessage}
 *
 * @typedef {Object} Runtime~SendMessageOptions
 *
 * @property {Boolean} [includeTlsChannelId] - Whether the TLS channel ID should be passed to `onMessageExternal`.
 * @property {Boolean} [toProxyScript]       - If the message is intended for a PAC file loaded using the proxy API.
 */

// region Events

/**
 * Fired when the other end of the {@link Port} has called {@link Port#disconnect}.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
 *
 * @name portDisconnectEvent
 * @function
 * @param {Port} port Port
 */

/**
 * Fired when the other end of the {@link Port} has sent this port a message.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
 *
 * @name portMessageEvent
 * @function
 * @param {Object} message Message
 */

/**
 * Fired when an update for the browser is available, but it isn't installed immediately
 * because a browser restart is required.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onBrowserUpdateAvailable}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onBrowserUpdateAvailable}
 *
 * @name browserUpdateAvailableEvent
 * @function
 */

/**
 * Fired when a connection is made with either an extension process or a content script.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onConnect}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onConnect}
 *
 * @name connectEvent
 * @function
 * @param {Port} port Port connecting the current script to the other context it is connecting to.
 */

/**
 * Fired when an extension receives a connection request from a different extension.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onConnectExternal}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onConnectExternal}
 *
 * @name connectExternalEvent
 * @function
 * @param {Port} port Port connecting the current script to the other extension it is connecting to.
 */

/**
 * Fired when the extension is first installed, when the extension is updated to a new version, and
 * when the browser is updated to a new version.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onInstalled}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onInstalled}
 *
 * @name installedEvent
 * @function
 * @param {OnInstalledDetails} details Installation event details
 */

/**
 * {@link Runtime#onInstalled} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onInstalled}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onInstalled}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#type-OnInstalledReason}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/OnInstalledReason}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onMessage}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onMessage}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onMessageExternal}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onMessageExternal}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onRestartRequired}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onRestartRequired}
 *
 * @name restartRequiredEvent
 * @function
 *
 * @param {OnRestartRequiredReason} reason The reason that the event is being dispatched.
 */

/**
 * Reason that the {@link Runtime#onRestartRequired} event was dispatched.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-OnRestartRequiredReason}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/OnRestartRequiredReason}
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
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onStartup}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onStartup}
 *
 * @name startupEvent
 * @function
 */

/**
 * Fired on the event page just before it is unloaded.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onSuspend}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onSuspend}
 *
 * @name suspendEvent
 * @function
 */

/**
 * Fired after {@link Runtime#onSuspend} to indicate that the app won't be unloaded after all.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onSuspendCanceled}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onSuspendCanceled}
 *
 * @name suspendCanceledEvent
 * @function
 */

/**
 * Fired when an update to the extension is available. This event enables an extension to delay an update:
 * for example, because it is in the middle of some operation which should not be interrupted.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onUpdateAvailable}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onUpdateAvailable}
 *
 * @name updateAvailableEvent
 * @function
 * @param {OnUpdateAvailableDetails} details Update Details
 */

/**
 * {@link Runtime#onUpdateAvailable} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#event-onUpdateAvailable}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onUpdateAvailable}
 *
 * @typedef {Object} OnUpdateAvailableDetails
 *
 * @property {String} [version] - Version of the update.
 */

// endregion

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

    constructor(options = null) {
        super(options);

        // region Events

        /**
         * Fired when an update for the browser is available, but isn't installed immediately because a
         * browser restart is required.
         * &nbsp
         * @deprecated Deprecated, use `runtime.onRestartRequired` instead.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onBrowserUpdateAvailable}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onBrowserUpdateAvailable}
         *
         * @returns {Event} Listener that emits {@link browserUpdateAvailableEvent browserUpdateAvailable} events
         */
        this.onBrowserUpdateAvailable = new Event(this, 'onBrowserUpdateAvailable');

        /**
         * Fired when a connection is made with either an extension process or a content script.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onConnect}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onConnect}
         *
         * @returns {Event} Listener that emits {@link connectEvent connect} events
         */
        this.onConnect = new Event(this, 'onConnect');

        /**
         * Fired when a connection is made with another extension.
         * &nbsp
         * To send a message which will be received by the {@link onConnectExternal} listener, use {@link connect},
         * passing the ID of the recipient in the `extensionId` parameter.
         * &nbsp
         * The listener is passed a {@link Port} which it can then use to send and receive messages. The Port also
         * contains a `sender` property, which is a {@link MessageSender} object, and which the recipient can use
         * to check the sender's ID.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onConnectExternal}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onConnectExternal}
         *
         * @returns {Event} Listener that emits {@link connectExternalEvent connectExternal} events
         */
        this.onConnectExternal = new Event(this, 'onConnectExternal');

        /**
         * Fired when the extension is first installed, when the extension is updated to a new version,
         * and when the browser is updated to a new version.
         * &nbsp
         * Note that {@link onInstalled} is not the same as {@link Management#onInstalled}. The {@link onInstalled}
         * event is fired only for your extension. The {@link Management#onInstalled} event is fired for any extensions.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onInstalled}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onInstalled}
         *
         * @returns {Event} Listener that emits {@link installedEvent installed} events.
         */
        this.onInstalled = new Event(this, 'onInstalled');

        /**
         * Fired when a message is sent from either an extension process or a content script.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onMessage}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onMessage}
         *
         * @returns {Event} Listener that emits {@link messageEvent message} events.
         */
        this.onMessage = new Event(this, 'onMessage');

        /**
         * Fired when a message is sent from another extension. Cannot be used in a content script.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onMessageExternal}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onMessageExternal}
         *
         * @returns {Event} Listener that emits {@link messageExternalEvent messageExternal} events.
         */
        this.onMessageExternal = new Event(this, 'onMessageExternal');

        /**
         * Fired when an app or the device that it runs on needs to be restarted. The app should close all
         * its windows at its earliest convenience to let the restart happen. If the app does nothing, a
         * restart will be enforced after a 24-hour grace period has passed. Currently, this event is only
         * fired for Chrome OS kiosk apps.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onRestartRequired}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onRestartRequired}
         *
         * @returns {Event} Listener that emits {@link restartRequiredEvent restartRequired} events.
         */
        this.onRestartRequired = new Event(this, 'onRestartRequired');

        /**
         * Fired when a profile that has this extension installed first starts up. This event is not fired
         * when a private browsing/incognito profile is started, even if this extension is operating in
         * 'split' incognito mode.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onStartup}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onStartup}
         *
         * @returns {Event} Listener that emits {@link startupEvent startup} events.
         */
        this.onStartup = new Event(this, 'onStartup');

        /**
         * Sent to the event page just before it is unloaded. This gives the extension an opportunity to
         * do some cleanup. Note that since the page is unloading, any asynchronous operations started
         * while handling this event are not guaranteed to complete.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onSuspend}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onSuspend}
         *
         * @returns {Event} Listener that emits {@link suspendEvent suspend} events.
         */
        this.onSuspend = new Event(this, 'onSuspend');

        /**
         * Sent after {@link onSuspend} to indicate that the extension won't be unloaded after all.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onSuspendCanceled}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onSuspendCanceled}
         *
         * @returns {Event} Listener that emits {@link suspendCanceledEvent suspendCanceled} events.
         */
        this.onSuspendCanceled = new Event(this, 'onSuspendCanceled');

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
         * @see {@link https://developer.chrome.com/extensions/runtime#event-onUpdateAvailable}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/onUpdateAvailable}
         *
         * @returns {Event} Listener that emits {@link updateAvailableEvent updateAvailable} events.
         */
        this.onUpdateAvailable = new Event(this, 'onUpdateAvailable');

        // endregion
    }

    // region Properties

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

    // endregion

    // region Methods

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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-connect}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/connect}
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

        return new Port(instance, {
            browser: this.$browser
        });
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-connectNative}
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

        return new Port(instance, {
            browser: this.$browser
        });
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-getBackgroundPage}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-getBrowserInfo}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getBrowserInfo}
     *
     * @returns {Promise} A Promise that will be fulfilled with {@link Runtime~BrowserInfo}
     */
    getBrowserInfo() {
        return this.$promise('getBrowserInfo');
    }

    /**
     * Get the complete manifest.json file, serialized to a JSON object.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#method-getManifest}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getManifest}
     *
     * @returns {Object} A JSON object representing the manifest.
     */
    getManifest() {
        return this.$call('getManifest');
    }

    /**
     * Returns a DirectoryEntry object representing the package directory.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#method-getPackageDirectoryEntry}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getPackageDirectoryEntry}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-getPlatformInfo}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getPlatformInfo}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-getURL}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/getURL}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-openOptionsPage}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/openOptionsPage}
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
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#method-reload}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/reload}
     */
    reload() {
        this.$call('reload');
    }

    /**
     * Check to see if an update for the extension is available.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#method-requestUpdateCheck}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/requestUpdateCheck}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-sendMessage}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/sendMessage}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-sendNativeMessage}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/sendNativeMessage}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#method-setUninstallURL}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/setUninstallURL}
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

    // endregion
}

export {
    RuntimeCompatibility
};

export default new Runtime();
