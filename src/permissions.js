import PermissionsCompatibility from 'mdn-browser-compat-data/webextensions/api/permissions.json';

import Base from './core/base';


/**
 * A Permissions object represents a collection of permissions.
 *
 * @see {@link https://developer.chrome.com/extensions/permissions#type-Permissions}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/Permissions}
 *
 * @typedef {Object} Permissions~Permissions
 *
 * @property {String[]} [origins]     - List of origin permissions.
 * @property {String[]} [permissions] - List of named permissions (does not include hosts or origins).
 */

/**
 * Fired when the extension is granted new permissions.
 *
 * @name added
 * @function
 * @param {Permissions~Permissions} permissions Permissions that were granted.
 */

/**
 * Fired when some permissions are removed from the extension.
 *
 * @name removed
 * @function
 * @param {Permissions~Permissions} permissions Permissions that were removed.
 */

/*
 * Enables extensions to request extra permissions at runtime, after they have been installed.
 *
 * Extensions need permissions to access more powerful WebExtension APIs. They can ask for
 * permissions at install time, by including the permissions they need in the "permissions"
 * manifest.json key. The main advantages of asking for permissions at install time are:
 *
 *  - The user is only asked once, so it's less disruptive for them, and a simpler decision.
 *
 *  - The extension can rely on the access to the APIs it needs, because if already running, the
 *    permissions have been granted.
 *
 * There is not yet a simple GUI, for users to view permissions of their installed WebExtension
 * Add-ons. Users must use about:debugging, go to the Add-ons section, then use the "Manifest Url"
 * link for this Add-on. This shows raw json, which includes a "permissions" block, showing the
 * permissions used by this addon.
 *
 * With the permissions API, an extension can ask for additional permissions at runtime. These
 * permissions need to be listed in the "optional_permissions" manifest.json key. Note that some
 * permissions are not allowed in "optional_permissions". The main advantages of this are:
 *
 *  - The extension can run with a smaller set of permissions, except when it actually needs them.
 *
 *  - The extension can handle permission denial in a graceful manner, instead of presenting the
 *    user with a global "all or nothing" choice at install time. You can still get a lot out of
 *    that map extension, without giving it access to your location, for example.
 *
 *  - The extension may need host permissions, but not know at install time which host permissions
 *    it needs. For example, the list of hosts may be a user setting. In this scenario, asking for
 *    a more specific range of hosts at runtime, can be an alternative to asking for "<all_urls>"
 *    at install time.
 *
 * To use the permissions API, decide which permissions your extension can request at runtime, and
 * list them in "optional_permissions". After this, you can request any permissions that were
 * included in "optional_permissions". Requests may only be made in the handler for a user
 * action (for example, a click handler).
 *
 * @see {@link https://developer.chrome.com/extensions/permissions}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions}
 */
export class Permissions extends Base {
    static Title = 'Permissions';

    static Name = 'permissions';
    static Compatibility = PermissionsCompatibility;

    /**
     * Fired when the extension is granted new permissions.
     *
     * @see {@link https://developer.chrome.com/extensions/permissions#event-onAdded}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/onAdded}
     *
     * @returns {Listener} Listener that emits {@link added} events
     */
    get onAdded() {
        return this.$listener('onAdded');
    }

    /**
     * Fired when some permissions are removed from the extension.
     *
     * @see {@link https://developer.chrome.com/extensions/permissions#event-onRemoved}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/onRemoved}
     *
     * @returns {Listener} Listener that emits {@link removed} events
     */
    get onRemoved() {
        return this.$listener('onRemoved');
    }

    /**
     * Check whether the extension has the permissions listed in the given `permissions` object.
     *
     * The `permissions` argument may contain either an `origins` property, which is an array of host permissions,
     * or a `permissions` property, which is an array of API permissions, or both.
     *
     * This is an asynchronous function that returns a Promise. The promise is fulfilled with true only if all
     * the extension currently has all the given permissions. For host permissions, if the extension's permissions
     * pattern-match the permissions listed in origins, then they are considered to match.
     *
     * @see {@link https://developer.chrome.com/extensions/permissions#method-contains}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/contains}
     *
     * @param {...Permissions~Permissions} permissions Permissions to check
     *
     * @returns {Promise} A `Promise` that will be fulfilled with `true` if the extension already has all the
     * permissions listed in the `permissions` argument, or `false` otherwise.
     */
    contains(permissions) {
        return this.$promise('contains', permissions);
    }

    /**
     * Retrieve a `permissions` object containing all the permissions currently granted to the extension.
     *
     * @see {@link https://developer.chrome.com/extensions/permissions#method-getAll}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/getAll}
     *
     * @returns {Promise} A `Promise` that will be fulfilled with Object { origins, permissions } containing all
     * the permissions currently granted to the extension. This includes all permissions the extension has
     * listed in the "permissions" key, and any permissions listed in "optional_permissions" that the
     * extension has been granted by calling {@link request}.
     */
    getAll() {
        return this.$promise('getAll');
    }

    /**
     * Ask to give up the permissions listed in the given `permissions` object.
     *
     * The `permissions` argument may contain either an origins property, which is an array of host permissions,
     * or a permissions property, which is an array of API permissions, or both. Permissions must come from the
     * set of permissions defined in the "optional_permissions" manifest.json key.
     *
     * @see {@link https://developer.chrome.com/extensions/permissions#method-remove}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/remove}
     *
     * @param {...Permissions~Permissions} permissions Permissions to remove
     *
     * @returns {Promise} A `Promise` that will be fulfilled with `true` if the permissions listed in the
     * `permissions` argument were removed, or `false` otherwise.
     */
    remove(permissions) {
        return this.$promise('remove', permissions);
    }

    /**
     * Ask for the set of permissions listed in the given `permissions` object.
     *
     * The `permissions` argument may contain either an origins property, which is an array of host permissions,
     * or a permissions property, which is an array of API permissions, or both. Permissions must come from the set of
     * permissions defined in the "optional_permissions" manifest.json key. The origins property may include permissions
     * that match a subset of the hosts matched by an optional permission: for example, if "optional_permissions"
     * include "*://mozilla.org/", then `permissions.origins` may include "https://developer.mozilla.org/".
     *
     * The request can only be made inside the handler for a user action, such as
     *
     *  - clicking the extension's browser action or page action
     *
     *  - selecting its context menu item
     *
     *  - activating a keyboard shortcut defined by the extension
     *
     *  - clicking a button in a page bundled with the extension.
     *
     * Depending on a circumstances, the browser will probably handle the request by asking the user whether to
     * grant the requested permissions. Only a single request is made for all requested permissions: thus either
     * all permissions are granted or none of them are.
     *
     * Any permissions granted are retained by the extension, even over upgrade and disable/enable cycling.
     *
     * @see {@link https://developer.chrome.com/extensions/permissions#method-request}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/permissions/request}
     *
     * @param {...Permissions~Permissions} permissions Permissions to request
     *
     * @returns {Promise} A `Promise` that will be fulfilled with `true` if the extension was granted all the
     * permissions listed in the `permissions` argument, or `false` otherwise.
     */
    request(permissions) {
        return this.$promise('request', permissions);
    }
}

export {
    PermissionsCompatibility
};

export default new Permissions();
