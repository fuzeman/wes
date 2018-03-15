import ExtensionCompatibility from 'mdn-browser-compat-data/webextensions/api/extension.json';

import Base from './core/base';
import Event from './core/event';


/**
 * Extension Error.
 *
 * @see {@link https://developer.chrome.com/extensions/extension#property-lastError}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/lastError}
 *
 * @typedef {Object} Extension~Error
 *
 * @property {String} message - Description of the error that has taken place.
 */

/**
 * Fetch properties for {@link Extension~getViews}.
 *
 * @see {@link https://developer.chrome.com/extensions/extension#method-getViews}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/getViews}
 *
 * @typedef {Object} Extension~FetchProperties
 *
 * @property {String} [type]     - {@link ViewType} indicating the type of view to get.
 * @property {Number} [windowId] - The window to restrict the search to.
 */

/**
 * The type of extension view.
 *
 * @see {@link https://developer.chrome.com/extensions/extension#type-ViewType}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/ViewType}
 *
 * @enum {String}
 */
export const ViewType = {
    Notification: 'notification',
    Popup: 'popup',
    Tab: 'tab'
};

/**
 * Utilities related to your extension. Get URLs to resources packages with your extension, get
 * the `Window` object for your extension's pages, get the values for various settings. Note that
 * the messaging APIs in this module are deprecated in favor of the equivalent APIs in the
 * `runtime` module.
 *
 * @see {@link https://developer.chrome.com/extensions/extension}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension}
 */
export class Extension extends Base {
    static Title = 'Extension';

    static Name = 'extension';
    static Compatibility = ExtensionCompatibility;

    constructor(options = null) {
        super(options);

        // region Events

        /**
         * Fired when a request is sent from either an extension process or a content script.
         *
         * @deprecated Deprecated, use `runtime.onMessage` instead.
         *
         * @see {@link https://developer.chrome.com/extensions/extension#event-onRequest}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/onRequest}
         *
         * @returns {Event}
         */
        this.onRequest = new Event(this, 'onRequest');

        /**
         * Fired when a request is sent from another extension.
         *
         * @deprecated Deprecated, use `runtime.onMessageExternal` instead.
         *
         * @see {@link https://developer.chrome.com/extensions/extension#event-onRequestExternal}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/onRequestExternal}
         *
         * @returns {Event}
         */
        this.onRequestExternal = new Event(this, 'onRequestExternal');

        // endregion
    }

    /**
     * True for content scripts running inside incognito tabs, and for extension pages running
     * inside an incognito process. The latter only applies to extensions with 'split'
     * incognito_behavior.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#property-inIncognitoContext}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/inIncognitoContext}
     *
     * @returns { Boolean }
     */
    get inIncognitoContext() {
        return this.$property('inIncognitoContext');
    }

    /**
     * Set for the lifetime of a callback if an asynchronous extension api has resulted in
     * an error. If no error has occurred lastError will be `undefined`.
     *
     * @deprecated Deprecated, use `runtime.lastError` instead.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#property-lastError}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/lastError}
     *
     * @returns {...Extension~Error} Error
     */
    get lastError() {
        return this.$property('lastError');
    }

    /**
     * Returns the `Window` object for the background page running inside the current extension. Returns null
     * if the extension has no background page.
     *
     * An alias for `runtime.getBackgroundPage()`.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-getBackgroundPage}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/getBackgroundPage}
     *
     * @returns {Window} Window of the background page.
     */
    getBackgroundPage() {
        return this.$call('getBackgroundPage');
    }

    /**
     * Returns an array of the JavaScript `Window` objects for each of the tabs running inside the
     * current extension. If `windowId` is specified, returns only the `Window` objects of tabs
     * attached to the specified window.
     *
     * @deprecated Deprecated, use `extension.getViews` instead.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-getExtensionTabs}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/getExtensionTabs}
     *
     * @param {Number} [windowId]
     *
     * @returns {Window[]} Array of global window objects
     */
    getExtensionTabs(windowId) {
        return this.$call('getExtensionTabs', windowId);
    }

    /**
     * Converts a relative path within an extension install directory to a fully-qualified URL.
     *
     * @deprecated Deprecated, use `runtime.getURL` instead.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-getURL}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/getURL}
     *
     * @param {String} path A path to a resource within an extension expressed relative to its install directory.
     *
     * @returns {String} The fully-qualified URL to the resource.
     */
    getURL(path) {
        return this.$call('getURL', path);
    }

    /**
     * Returns an array of the `Window` objects for each of the pages running inside the current extension.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-getViews}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/getViews}
     *
     * @param {...Extension~FetchProperties} [fetchProperties]
     *
     * @returns {Window[]} Array of `Window` objects.
     */
    getViews(fetchProperties) {
        return this.$call('getViews', fetchProperties);
    }

    /**
     * Retrieves the state of the extension's access to the 'file://' scheme (as determined by the
     * user-controlled 'Allow access to File URLs' checkbox). True if the extension is allowed access
     * to "file://" URLs, false otherwise.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-isAllowedFileSchemeAccess}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/isAllowedFileSchemeAccess}
     *
     * @returns {Promise} A `Promise` that will be fulfilled with a boolean
     */
    isAllowedFileSchemeAccess() {
        return this.$promise('isAllowedFileSchemeAccess');
    }

    /**
     * Retrieves the state of the extension's access to Incognito-mode (as determined by the
     * user-controlled 'Allowed in Incognito' checkbox). True if the extension is allowed access
     * to private tabs, false otherwise.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-isAllowedIncognitoAccess}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/isAllowedIncognitoAccess}
     *
     * @returns {Promise} A `Promise` that will be fulfilled with a boolean
     */
    isAllowedIncognitoAccess() {
        return this.$promise('isAllowedIncognitoAccess');
    }

    /**
     * Sends a single request to other listeners within the extension. Similar to `runtime.connect`,
     * but only sends a single request with an optional response. The `extension.onRequest` event is
     * fired in each page of the extension.
     *
     * @deprecated Deprecated, use `runtime.sendMessage` instead.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-sendRequest}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/sendRequest}
     *
     * @param {String} [extensionId] The extension ID of the extension you want to connect to.
     * @param {Object} request Request Message
     * @param {Function} [responseCallback] Function(response)
     */
    sendRequest(extensionId, request, responseCallback) {
        this.$call('sendRequest', extensionId, request, responseCallback);
    }

    /**
     * Sets parameters for the extension's update URL. This value is ignored for extensions that are hosted
     * in the browser vendor's store.
     *
     * @see {@link https://developer.chrome.com/extensions/extension#method-setUpdateUrlData}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/extension/setUpdateUrlData}
     *
     * @param {String} data
     */
    setUpdateUrlData(data) {
        this.$call('setUpdateUrlData', data);
    }
}

export {
    ExtensionCompatibility
};

export default new Extension();
