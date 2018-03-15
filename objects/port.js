import IsNil from 'lodash/isNil';
import RuntimeCompatibility from 'mdn-browser-compat-data/webextensions/api/runtime.json';

import Event from '../core/event';
import Base from '../core/base';


/**
 * An object containing information about the sender of a message or connection request; this is passed to
 * the {@link Runtime#onMessage} listener.
 * &nbsp
 * It is also a property of {@link Port}, but only in the {@link Port} instance passed into the
 * {@link Runtime#onConnect} or {@link Runtime#onConnectExternal} listeners.
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-MessageSender}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/MessageSender}
 */
export class MessageSender extends Base {
    static Title = 'MessageSender';

    static Name = 'runtime.MessageSender';
    static Prefix = false;

    static Compatibility = RuntimeCompatibility;

    static Standard = [
        // Properties
        'tab',
        'id'
    ];

    constructor(instance, browser = null) {
        super(browser);

        this._instance = instance;
    }

    get $namespace() {
        return this._instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * The tab which opened the connection. This property will only be defined when the connection was opened
     * from a tab (including content scripts).
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#type-MessageSender}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/MessageSender}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#type-MessageSender}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/MessageSender}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#type-MessageSender}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/MessageSender}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#type-MessageSender}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/MessageSender}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#type-MessageSender}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/MessageSender}
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
 *
 * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
 */
export class Port extends Base {
    static Title = 'Port';

    static Name = 'runtime.Port';
    static Prefix = false;

    static Compatibility = RuntimeCompatibility;

    static Standard = [
        // Properties
        'name',
        'sender',

        // Events
        'onDisconnect',
        'onMessage',

        // Methods
        'disconnect',
        'postMessage'
    ];

    constructor(instance, browser = null) {
        super(browser);

        this._instance = instance;

        /**
         * Listener will be called when the other end has called {@link Port#disconnect}. This event will only be
         * fired once for each port. The listener function will be passed the {@link Port} object. If the port was
         * disconnected due to an error, then the {@link Port} argument will contain an error property giving more
         * information about the error.
         * &nbsp
         * Note that on Chrome {@link Port#error} is not supported: instead, use {@link Runtime#lastError} to get
         * the error message.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
         *
         * @returns {Event} Listener that emits {@link portDisconnectEvent disconnect} events
         */
        this.onDisconnect = new Event(this, 'onDisconnect');

        /**
         * Listener will be called when the other end has sent this port a message. The listener will be passed the
         * JSON object that the other end sent.
         *
         * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
         *
         * @returns {Event} Listener that emits {@link portMessageEvent message} events
         */
        this.onMessage = new Event(this, 'onMessage');
    }

    get $namespace() {
        return this._instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * If the port was disconnected due to an error, this will be set to an object with a string property message,
     * giving you more information about the error. See {@link onDisconnect}.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
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
     * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
     *
     * @returns {MessageSender}
     */
    get sender() {
        let instance = this.$property('sender');

        if(IsNil(instance)) {
            return null;
        }

        return new MessageSender(instance, {
            browser: this.$browser
        });
    }

    /**
     * Disconnects a port. Either end can call this when they have finished with the port. It will cause
     * {@link onDisconnect} to be fired at the other end. This is useful if the other end is maintaining
     * some state relating to this port, which can be cleaned up on disconnect. If this port is connected
     * to a native application, this function will close the native application.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
     */
    disconnect() {
        this.$call('disconnect');
    }

    /**
     *  Send a message to the other end. This takes one argument, which is a JSON object representing the message
     *  to send. It will be delivered to any script listening to the port's {@link Port#onMessage} event, or to
     *  the native application if this port is connected to a native application.
     *
     * @see {@link https://developer.chrome.com/extensions/runtime#type-Port}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/runtime/Port}
     *
     *  @param {Object} message Message
     */
    postMessage(message) {
        this.$call('postMessage', message);
    }
}
