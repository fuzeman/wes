import PermissionsCompatibility from 'mdn-browser-compat-data/webextensions/api/permissions.json';

import Base from './core/base';


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
 */
export class Permissions extends Base {
    static Title = 'Permissions';

    static Name = 'permissions';
    static Compatibility = PermissionsCompatibility;

    /**
     * Fired when the extension is granted new permissions.
     *
     * @returns Listener
     */
    get onAdded() {
        return this.$listener('onAdded');
    }

    /**
     * Fired when some permissions are removed from the extension.
     *
     * @returns Listener
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
     * @param {object} permissions Permissions {origins, permissions}
     * @returns Promise
     */
    contains(permissions) {
        return this.$promise('contains', permissions);
    }

    /**
     * Retrieve a `permissions` object containing all the permissions currently granted to the extension.
     *
     * This is an asynchronous function that returns a Promise.
     *
     * @returns Promise
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
     * This is an asynchronous function that returns a Promise.
     *
     * @param {object} permissions Permissions {origins, permissions}
     * @returns Promise
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
     * This is an asynchronous function that returns a Promise.
     *
     * @param {object} permissions Permissions {origins, permissions}
     * @returns Promise
     */
    request(permissions) {
        return this.$promise('request', permissions);
    }
}
export {
    PermissionsCompatibility
};

export default new Permissions();
