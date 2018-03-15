import StorageCompatibility from 'mdn-browser-compat-data/webextensions/api/storage.json';

import Base from './core/base';
import Event from './core/event';


/**
 * {@link StorageChange} is an object representing a change to a storage area.
 *
 * @see {@link https://developer.chrome.com/extensions/storage#type-StorageChange}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageChange}
 */
export class StorageChange extends Base {
    static Title = 'StorageChange';

    static Name = 'storage.StorageChange';
    static Prefix = false;

    static Compatibility = StorageCompatibility;

    static Standard = [
        'oldValue',
        'newValue'
    ];

    constructor(instance, options = null) {
        super(options);

        this._instance = instance;
    }

    get $namespace() {
        return this._instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * The old value of the item, if there was an old value.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#type-StorageChange}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageChange}
     *
     * @returns {any}
     */
    get oldValue() {
        return this.$property('oldValue');
    }

    /**
     * The new value of the item, if there is a new value.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#type-StorageChange}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageChange}
     *
     * @returns {any}
     */
    get newValue() {
        return this.$property('newValue');
    }
}

/**
 * {@link StorageArea} is an object representing a storage area.
 *
 * @see {@link https://developer.chrome.com/extensions/storage#type-StorageArea}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea}
 */
export class StorageArea extends Base {
    static Title = 'StorageArea';

    static Name = 'storage.StorageArea';
    static Prefix = false;

    static Compatibility = StorageCompatibility;

    constructor(instance, options = null) {
        super(options);

        this._instance = instance;
    }

    get $namespace() {
        return this._instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * Remove all items from the storage area.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#method-StorageArea-clear}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea/clear}
     *
     * @returns {Promise} A `Promise` that will be fulfilled with no arguments if the operation succeeded. If the
     *                    operation failed, the promise will be rejected with an error message.
     */
    clear() {
        return this.$promise('clear');
    }

    /**
     * Retrieve one or more items from the storage area.
     * &nbsp
     * Note: When used within a content script in Firefox versions prior to 52, the `Promise` returned by
     * `browser.storage.local.get()` is fulfilled with an Array containing one Object. The Object in the
     * Array contains the keys found in the storage area, as described above. The `Promise` is correctly
     * fulfilled with an Object when used in the background context (background scripts, popups, options
     * pages, etc.). When this API is used as `chrome.storage.local.get()`, it correctly passes an Object
     * to the callback function.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#method-StorageArea-get}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea/get}
     *
     * @param {String, String[]} [keys] A key (string) or keys (an array of strings or an object specifying default
     *                                values) to identify the item(s) to be retrieved from storage. If you pass an
     *                                empty string, object or array here, an empty object will be retrieved. If you
     *                                pass null, or an undefined value, the entire storage contents will be retrieved.
     *
     * @returns {Promise} A `Promise` that will be fulfilled with a `results` object containing every object in `keys`
     *                    that was found in the storage area. If the operation failed, the promise will be rejected
     *                    with an error message.
     */
    get(keys) {
        return this.$promise('get', keys);
    }

    /**
     * Get the amount of storage space, in bytes, used by one or more items being stored in the storage area.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#method-StorageArea-getBytesInUse}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea/getBytesInUse}
     *
     * @param {String, String[]} [keys] A key (string) or keys (an array of strings) to identify the item(s) whose
     *                                  storage space you want to retrieve. If an empty string or array is passed in,
     *                                  `0` will be returned. If you pass `null` here, the function will return the
     *                                  space used by the entire storage area.
     *
     * @returns {Promise} A `Promise` that will be fulfilled with an integer, `bytesUsed`, representing the storage
     *                    space used by the objects that were specified in `keys`. If the operation failed, the promise
     *                    will be rejected with an error message.
     */
    getBytesInUse(keys) {
        return this.$promise('getBytesInUse', keys);
    }

    /**
     * Remove one or more items from the storage area.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#method-StorageArea-remove}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea/remove}
     *
     * @param {String, String[]} keys A string, or array of strings, representing the key(s) of the item(s) to
     *                                be removed.
     *
     * @returns {Promise} A `Promise` that will be fulfilled with no arguments if the operation succeeded. If the
     *                    operation failed, the promise will be rejected with an error message.
     */
    remove(keys) {
        return this.$promise('remove', keys);
    }

    /**
     * Store one or more items in the storage area, or update existing items.
     * &nbsp
     * Values may be primitive types (such as numbers, booleans, and strings) or Array types.
     * &nbsp
     * It's generally not possible to store other types, such as Function, Date, RegExp, Set, Map, ArrayBuffer
     * and so on. Some of these unsupported types will restore as an empty object, and some cause set() to
     * throw an error. The exact behavior here is browser-specific.
     * &nbsp
     * When you store or update a value using this API, the {@link Storage#onChanged} event will fire.
     *
     * @see {@link https://developer.chrome.com/extensions/storage#method-StorageArea-set}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/StorageArea/set}
     *
     * @param {Object} keys An object containing one or more key/value pairs to be stored in storage. If an item
     *                      already exists, its value will be updated.
     *
     * @returns {Promise} A `Promise` that will be fulfilled with no arguments if the operation succeeded. If the
     *                    operation failed, the promise will be rejected with an error message.
     */
    set(keys) {
        return this.$promise('set', keys);
    }
}

/**
 * Enables extensions to store and retrieve data, and listen for changes to stored items.
 * &nbsp
 * The storage system is based on the Web Storage API, with a few differences. Among other differences,
 * these include:
 * &nbsp
 *  - It's asynchronous.
 * &nbsp
 *  - Values are scoped to the extension, not to a specific domain (i.e. the same set of key/value pairs
 *    are available to all scripts in the background context and content scripts).
 * &nbsp
 *  - The values stored can be any JSON-ifiable value, not just String. Among other things, this includes:
 *    Array and Object, but only when their contents can can be represented as JSON, which does not include
 *    DOM nodes. You don't need to convert your values to JSON Strings prior to storing them, but they are
 *    represented as JSON internally, thus the requirement that they be JSON-ifiable.
 * &nbsp
 *  - Multiple key/value pairs can be set or retrieved in the same API call.
 * &nbsp
 * To use this API you need to include the "storage" permission in your manifest.json file.
 * &nbsp
 * Each extension has its own storage area, which can be split into different types of storage.
 * &nbsp
 * Although this API is similar to Window.localStorage it is recommended that you don't use Window.localStorage
 * in the extension code to store extension-related data. Firefox will clear data stored by extensions using the
 * localStorage API in various scenarios where users clear their browsing history and data for privacy reasons,
 * while data saved using the storage.local API will be correctly persisted in these scenarios.
 *
 * @see {@link https://developer.chrome.com/extensions/storage}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage}
 */
export class Storage extends Base {
    static Title = 'Storage';

    static Name = 'storage';
    static Compatibility = StorageCompatibility;

    constructor(options = null) {
        super(options);

        // region Areas

        /**
         * Represents the local storage area. Items in local storage are local to the machine the extension was
         * installed on.
         * &nbsp
         * The browser may restrict the amount of data that an extension can store in the local storage area:
         * &nbsp
         *  - Chrome limits the extension to 5MB of data using this API unless it has the "unlimitedStorage"
         *    permission.
         * &nbsp
         *  - Firefox enables you to ask for the "unlimitedStorage" permission from version 56 onwards. It does not
         *    yet restrict the amount of data your extension can store, but will start doing so in a future release:
         *    so it's a good idea to ask for the "unlimitedStorage" permission now, if you intend to store a large
         *    amount of data.
         * &nbsp
         * When the extension is uninstalled, its associated local storage is cleared.
         * &nbsp
         * Also in Firefox, you can prevent the browser from clearing local storage on uninstall by visiting
         * "about:config" and setting the following two browser preferences to true: "keepUuidOnUninstall" and
         * "keepStorageOnUninstall". This feature is provided to help developers test their extensions. Extensions
         * themselves are not able to change these preferences.
         * &nbsp
         * Although this API is similar to {@link Window#localStorage} it is recommended that you don't use
         * {@link Window#localStorage} in extension code. Firefox will clear data stored by extensions using
         * the localStorage API in various scenarios where users clear their browsing history and data for
         * privacy reasons, while data saved using the storage.local API will be correctly persisted in
         * these scenarios.
         *
         * @see {@link https://developer.chrome.com/extensions/storage#property-local}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/local}
         *
         * @returns {StorageArea}
         */
        this.local = new StorageArea(this.$target.local);

        /**
         * Represents the managed storage area. Items in managed storage are set by the domain administrator or other
         * native applications installed on user's computer, and are read-only for the extension. Trying to modify
         * this storage area results in an error.
         *
         * @see {@link https://developer.chrome.com/extensions/storage#property-managed}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/managed}
         *
         * @returns {StorageArea}
         */
        this.managed = new StorageArea(this.$target.managed);

        /**
         * Represents the sync storage area. Items in sync storage are synced by the browser, and are available across
         * all instances of that browser that the user is logged into (e.g. via Firefox sync, or a Google account),
         * across different devices.
         * &nbsp
         * For Firefox a user must have Add-ons checked under the "Sync Settings" options in "about:preferences".
         * &nbsp
         * Note that the implementation of {@link Storage#sync} in Firefox relies on the Add-on ID. If you use
         * {@link Storage#sync}, you must set an ID for your extension using the "applications" manifest.json key.
         * &nbsp
         * The main use case of this API is to store preferences about your extension and allow the user to sync them
         * to different profiles. You can store up to 100KB of data using this API. If you try to store more than
         * this, the call will fail with an error message. The API is provided without any guarantees about uptime
         * or performance.
         *
         * @returns {StorageArea}
         */
        this.sync = new StorageArea(this.$target.sync);

        // endregion

        // region Events

        /**
         * Fired when one or more items change in a storage area.
         *
         * @see {@link https://developer.chrome.com/extensions/storage#event-onChanged}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/storage/onChanged}
         */
        this.onChanged = new Event(this, 'onChanged');

        // endregion
    }
}

export {
    StorageCompatibility
};

export default new Storage();
