import IsNil from 'lodash/isNil';
import TabsCompatibility from 'mdn-browser-compat-data/webextensions/api/tabs.json';

import Base from './core/base';
import Event from './core/event';
import {Port} from './objects/port';
import {ImageFormat, RunAt} from './extensionTypes';


/**
 * Fires when the active tab in a window changes.
 * &nbsp
 * Note that the tab's URL may not be set at the time this event fired, but you can listen to {@link Tabs#onUpdated}
 * events to be notified when a URL is set.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onActivated}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActivated}
 *
 * @name activatedEvent
 * @function
 * @param {OnActivatedDetails} activeInfo Activation details.
 */

/**
 * {@link Tabs#onActivated} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onActivated}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActivated}
 *
 * @typedef {Object} OnActivatedDetails
 *
 * @property {Number} tabId    - The ID of the tab that has become active.
 * @property {Number} windowId - The ID of the window the active tab changed inside of.
 */

/**
 * Fires when the selected tab in a window changes.
 * &nbsp
 * Note that the tab's URL may not be set at the time this event fired, but you can listen to {@link onUpdated}
 * events to be notified when a URL is set.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onActiveChanged}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActiveChanged}
 *
 * @name activeChangedEvent
 * @function
 * @param {Number} tabId The ID of the tab that has become active.
 * @param {OnActiveChangedDetails} selectInfo Selection details.
 */

/**
 * {@link Tabs#onActiveChanged} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onActiveChanged}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActiveChanged}
 *
 * @typedef {Object} OnActiveChangedDetails
 *
 * @property {Number} windowId - The ID of the window the active tab changed inside of.
 */

/**
 * Fired when a tab is attached to a window, for example because it was moved between windows.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onAttached}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached}
 *
 * @name attachedEvent
 * @function
 * @param {Number} tabId The ID of the tab that has become active.
 * @param {OnAttachedDetails} attachInfo Attach details.
 */

/**
 * {@link Tabs#onAttached} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onAttached}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached}
 *
 * @typedef {Object} OnAttachedDetails
 *
 * @property {Number} newWindowId - ID of the new window.
 * @property {Number} newPosition - Index position that the tab has in the new window.
 */

/**
 * Fired when a tab is created.
 * &nbsp
 * Note that the tab's URL may not be given its final value at the time this event fired. In particular,
 * Firefox opens a new tab with the URL "about:blank" before loading the new page into it. You
 * can listen to {@link Tabs#onUpdated} events to be notified when a URL is set.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onCreated}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onCreated}
 *
 * @name createdEvent
 * @function
 * @param {Tab} tab Details of the tab that was created.
 */

/**
 * Fired when a tab is detached from a window, for example because it is being moved between windows.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onDetached}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onDetached}
 *
 * @name detachedEvent
 * @function
 * @param {Number} tabId ID of the tab that was detached.
 * @param {OnDetachedDetails} detachInfo Detach details.
 */

/**
 * {@link Tabs#onDetached} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onDetached}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onDetached}
 *
 * @typedef {Object} OnDetachedDetails
 *
 * @property {Number} oldWindowId - ID of the previous window.
 * @property {Number} oldPosition -  Index position that the tab had in the old window.
 */

/**
 * Fired when the highlighted or selected tabs in a window changes.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onHighlightChanged}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlightChanged}
 *
 * @name highlightChangedEvent
 * @function
 * @param {OnHighlightChangedDetails} selectInfo Selection details.
 */

/**
 * {@link Tabs#onHighlightChanged} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onHighlightChanged}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlightChanged}
 *
 * @typedef {Object} OnHighlightChangedDetails
 *
 * @property {Number} windowId - The window whose tabs changed.
 * @property {Number[]} tabIds - All highlighted tabs in the window.
 */

/**
 * Fired when the set of highlighted tabs in a window changes.
 *
 * Firefox doesn't have the concept of highlighting multiple tabs, and so in Firefox highlighting is just an alias
 * for tab activation. So this event will fire only when the active tab in a window changes, and the `tabIds`
 * property of `highlightInfo` will always be an array of length one, with the `tabId` referring to the active
 * tab.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onHighlighted}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlighted}
 *
 * @name highlightedEvent
 * @function
 * @param {OnHighlightedDetails} highlightInfo Highlight details.
 */

/**
 * {@link Tabs#onHighlighted} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onHighlighted}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlighted}
 *
 * @typedef {Object} OnHighlightedDetails
 *
 * @property {Number} windowId - ID of the window whose tabs changed.
 * @property {Number[]} tabIds - IDs of the highlighted tabs in the window.
 */

/**
 * Fired when a tab is moved within a window.
 *
 * Only one move event is fired, representing the tab the user directly moved. Move events are not fired for
 * the other tabs that must move in response. This event is not fired when a tab is moved between windows.
 * For that, see {@link Tabs#onDetached}.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onMoved}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onMoved}
 *
 * @name movedEvent
 * @function
 * @param {Number} tabId ID of the tab the user moved.
 * @param {OnMovedDetails} moveInfo Information about the move.
 */

/**
 * {@link Tabs#onMoved} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onMoved}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onMoved}
 *
 * @typedef {Object} OnMovedDetails
 *
 * @property {Number} windowId  - ID of this tab's window.
 * @property {Number} fromIndex - Initial index of this tab in the window.
 * @property {Number} toIndex   - Final index of this tab in the window.
 */

/**
 * Fired when a tab is closed.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onRemoved}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onRemoved}
 *
 * @name removedEvent
 * @function
 * @param {Number} tabId ID of the tab that closed.
 * @param {OnRemovedDetails} removeInfo Removal information.
 */

/**
 * {@link Tabs#onRemoved} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onRemoved}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onRemoved}
 *
 * @typedef {Object} OnRemovedDetails
 *
 * @property {Number} windowId         - The window whose tab is closed.
 * @property {Boolean} isWindowClosing - `true` if the tab is being closed because its window is being closed.
 */

/**
 * Fired when a tab is replaced with another tab due to prerendering or instant.
 * &nbsp
 * This event may not be relevant for or supported by browsers other than Chrome.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onReplaced}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onReplaced}
 *
 * @name replacedEvent
 * @function
 * @param {Number} addedTabId ID of the replacement tab.
 * @param {Number} removedTabId ID of the tab that was replaced.
 */

/**
 * Fires when the selected tab in a window changes.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onSelectionChanged}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onSelectionChanged}
 *
 * @name selectionChangedEvent
 * @function
 * @param {Number} tabId The ID of the tab that has become active.
 * @param {OnSelectionChangedDetails} selectInfo Selection information.
 */

/**
 * {@link Tabs#onSelectionChanged} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onSelectionChanged}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onSelectionChanged}
 *
 * @typedef {Object} OnSelectionChangedDetails
 *
 * @property {Number} windowId - The ID of the window the selected tab changed inside of.
 */

/**
 * Fired when a tab is updated.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onUpdated}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onUpdated}
 *
 * @name updatedEvent
 * @function
 * @param {Number} tabId ID of the tab that was updated.
 * @param {OnUpdatedDetails} changeInfo Contains properties for the tab properties that have changed.
 * @param {Tab} tab The new state of the tab.
 */

/**
 * {@link Tabs#onUpdated} Details.
 * &nbsp
 * Lists the changes to the state of the tab that was updated. To learn more about these properties,
 * see the {@link Tab} documentation.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onUpdated}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onUpdated}
 *
 * @typedef {Object} OnUpdatedDetails
 *
 * @property {Boolean} [audible]     - The tab's new audible state.
 * @property {Boolean} [discarded]   - Whether the tab is discarded.
 * @property {String} [favIconUrl]   - The tab's new favicon URL.
 * @property {MutedInfo} [mutedInfo] - The tab's new muted state and the reason for the change.
 * @property {Boolean} [pinned]      - The tab's new pinned state.
 * @property {String} [status]       - The status of the tab. Can be either "loading" or "complete".
 * @property {String} [title]        - The tab's new title.
 * @property {String} [url]          - The tab's URL if it has changed.
 */

/**
 * Fired when a tab is zoomed.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onZoomChange}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onZoomChange}
 *
 * @name zoomChangeEvent
 * @function
 * @param {OnZoomChangeDetails} zoomInfo Information about the zoom event.
 */

/**
 * {@link Tabs#onZoomChange} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#event-onZoomChange}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onZoomChange}
 *
 * @typedef {Object} OnZoomChangeDetails
 *
 * @property {Boolean} [tabId]             - ID of the tab that was zoomed.
 * @property {Boolean} [oldZoomFactor]     - The previous zoom factor.
 * @property {Boolean} [newZoomFactor]     - The new zoom factor.
 * @property {ZoomSettings} [zoomSettings] - Zoom settings for the tab.
 */

/**
 * Indicates whether the tab has finished loading.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-TabStatus}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/TabStatus}
 *
 * @enum {String}
 */
export const TabStatus = {
    Complete: 'complete',
    Loading: 'loading'
};

/**
 * The type of window that hosts this tab.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-WindowType}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/WindowType}
 *
 * @enum {String}
 */
export const WindowType = {
    App: 'app',
    DevTools: 'devtools',
    Normal: 'normal',
    Panel: 'panel',
    Popup: 'popup'
};

/**
 * Contains information about a tab. This provides access to information about what content is in the tab,
 * how large the content is, what special states or restrictions are in effect, and so forth.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/Tab}
 */
export class Tab extends Base {
    static Title = 'Tab';

    static Name = 'tabs.Tab';
    static Prefix = false;

    static Compatibility = TabsCompatibility;

    static Standard = [
        'hidden'
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

    // region Properties

    /**
     * Whether the tab is active in its window. This may be true even if the tab's window is not currently focused.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get active() {
        return this.$property('active');
    }

    /**
     * If the tab is not muted: whether the tab is producing sound. If the tab is muted: whether the tab would be
     * producing sound, if it were not muted.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get audible() {
        return this.$property('audible');
    }

    /**
     * Whether the tab can be discarded automatically by the browser when resources are low.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get autoDiscardable() {
        return this.$property('autoDiscardable');
    }

    /**
     * The cookie store of the tab. If different tabs can have different cookie stores (for example, to support
     * contextual identity), you can pass this as the `storeId` option into various methods of the cookies API,
     * to set and get cookies associated with this tab's cookie store. Only present if the extension has the
     * "cookies" permission.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {String}
     */
    get cookieStoreId() {
        return this.$property('cookieStoreId');
    }

    /**
     * Whether the tab is discarded. A discarded tab is one whose content has been unloaded from memory, but is
     * still visible in the tab strip. Its content gets reloaded the next time it's activated.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get discarded() {
        return this.$property('discarded');
    }

    /**
     * The URL of the tab's favicon. Only present if the extension has the "tabs" permission. It may also be
     * an empty string if the tab is loading.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {String}
     */
    get favIconUrl() {
        return this.$property('favIconUrl');
    }

    /**
     * The height of the tab in pixels.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get height() {
        return this.$property('height');
    }

    /**
     * Whether the tab is hidden.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get hidden() {
        return this.$property('hidden');
    }

    /**
     * Whether the tab is highlighted.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get highlighted() {
        return this.$property('highlighted');
    }

    /**
     * The tab's ID. Tab IDs are unique within a browser session. The tab ID may also be set to {@link TAB_ID_NONE}
     * for browser windows that don't host content tabs (for example, devtools windows).
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get id() {
        return this.$property('id');
    }

    /**
     * Whether the tab is in a private browsing window.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get incognito() {
        return this.$property('incognito');
    }

    /**
     * The zero-based index of the tab within its window.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get index() {
        return this.$property('index');
    }

    /**
     * Whether the tab can be rendered in Reader Mode.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get isArticle() {
        return this.$property('isArticle');
    }

    /**
     * Whether the tab is currently being rendered in Reader Mode.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get isInReaderMode() {
        return this.$property('isInReaderMode');
    }

    /**
     * Time at which the tab was last accessed, in milliseconds since the epoch.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get lastAccessed() {
        return this.$property('lastAccessed');
    }

    /**
     * The current muted state for the tab and the reason for the last state change.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {MutedInfo}
     */
    get mutedInfo() {
        return this.$property('mutedInfo');
    }

    /**
     * The ID of the tab that opened this tab, if any. This property is only present if the opener tab still exists.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get openerTabId() {
        return this.$property('openerTabId');
    }

    /**
     * Whether the tab is pinned.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get pinned() {
        return this.$property('pinned');
    }

    /**
     * Whether the tab is selected.
     * &nbsp
     * @deprecated Deprecated, use {@link Tab#highlighted} instead.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Boolean}
     */
    get selected() {
        return this.$property('selected');
    }

    /**
     * The session ID used to uniquely identify a {@link Tab} obtained from the sessions API.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {String}
     */
    get sessionId() {
        return this.$property('sessionId');
    }

    /**
     * Either {@link TabStatus#Loading} or {@link TabStatus#Complete}.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {TabStatus}
     */
    get status() {
        return this.$property('status');
    }

    /**
     * The title of the tab. Only present if the extension has the "tabs" permission.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {String}
     */
    get title() {
        return this.$property('title');
    }

    /**
     * The URL of the document that the tab is displaying. Only present if the extension has the "tabs" permission.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {String}
     */
    get url() {
        return this.$property('url');
    }

    /**
     * The width of the tab in pixels.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get width() {
        return this.$property('width');
    }

    /**
     * The ID of the window that hosts this tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#type-Tab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/Tab}
     *
     * @returns {Number}
     */
    get windowId() {
        return this.$property('windowId');
    }

    // endregion
}

/**
 * This object contains a boolean indicating whether the tab is muted, and the reason for the last state change.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-MutedInfo}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/MutedInfo}
 *
 * @typedef {Object} MutedInfo
 *
 * @property {String} [extensionId]     - The ID of the extension that last changed the muted state.
 * @property {Boolean} muted            - Whether the tab is currently muted.
 * @property {MutedInfoReason} [reason] - The reason the tab was muted or unmuted.
 */

/**
 * Specifies the reason a tab was muted or unmuted.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-MutedInfoReason}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/MutedInfoReason}
 *
 * @enum {String}
 */
export const MutedInfoReason = {
    /** Tab capture started, forcing a muted state change. */
    capture: 'capture',

    /** An extension set the muted state. */
    extension: 'extension',

    /** The user set the muted state. */
    user: 'user'
};

/**
 * Defines zoom settings for a tab.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-ZoomSettings}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/ZoomSettings}
 *
 * @typedef {Object} ZoomSettings
 *
 * @property {Number} [defaultZoomFactor] - The default zoom level for the current tab.
 * @property {ZoomSettingsMode} [mode]    - Whether zoom changes are handled by the browser, by the extension, or are disabled.
 * @property {ZoomSettingsScope} [scope]  - Whether zoom changes will persist for the page's origin, or only take effect in this tab.
 */

/**
 * Defines how zoom changes are handled. Extensions can pass this value into {@link Tabs#setZoomSettings} to control
 * how the browser handles attempts to change zoom settings for a tab. Defaults to "automatic".
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-ZoomSettingsMode}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/ZoomSettingsMode}
 *
 * @enum {String}
 */
export const ZoomSettingsMode = {
    /** Zoom changes are handled normally by the browser. */
    automatic: 'automatic',

    /** Disables all zooming in the tab. */
    disabled: 'disabled',

    /** The extension will handle zoom changes, by listening for the {@link Tabs#onZoomChange} event and scaling the page accordingly. */
    manual: 'manual'
};

/**
 * Defines whether zoom changes will persist for the page's origin, or only take effect in this tab. This defaults to
 * `per-origin` when {@link ZoomSettingsMode} is "automatic", and is always `per-tab` otherwise.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#type-ZoomSettingsScope}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/ZoomSettingsScope}
 *
 * @enum {String}
 */
export const ZoomSettingsScope = {
    /** All other tabs with the same origin as this tab will have the zoom changes applied to them. */
    'per-origin': 'per-origin',

    /** Zoom changes only take effect in this tab, and zoom changes in other tabs will not affect the zooming of this tab. */
    'per-tab': 'per-tab'
};

/**
 * {@link Tabs#create} Properties to give the new tab.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-create}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create}
 *
 * @typedef {Object} Tabs~CreateProperties
 *
 * @property {Boolean} [active]           - Whether the tab should become the active tab in the window.
 * @property {String} [cookieStoreId]     - Use this to create a tab whose cookie store ID is `cookieStoreId`.
 * @property {Number} [index]             - The position the tab should take in the window.
 * @property {Number} [openerTabId]       - The ID of the tab that opened this tab.
 * @property {Boolean} [openInReaderMode] - If true, open this tab in Reader Mode. Defaults to `false`.
 * @property {Boolean} [pinned]           - Whether the tab should be pinned. Defaults to `false`.
 * @property {Boolean} [selected]         - (deprecated) Whether the tab should become the selected tab in the window. Defaults to `true`.
 * @property {String} [url]               - The URL to navigate the tab to initially. Defaults to the New Tab Page.
 * @property {Number} [windowId]          - The window to create the new tab in. Defaults to the current window.
 */

/**
 * {@link Tabs#insertCSS} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-insertCSS}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/insertCSS}
 *
 * @typedef {Object} Tabs~CSS
 *
 * @property {Boolean} [allFrames]       - If `true`, the CSS will be injected into all frames of the current page.
 * @property {String} [code]             - Code to inject, as a text string.
 * @property {String} [cssOrigin]        - "user", to add the CSS as a user stylesheet, or "author" to add it as an author stylesheet.
 * @property {String} [file]             - Path to a file containing the code to inject.
 * @property {Number} [frameId]          - The frame where the CSS should be injected. Defaults to `0` (the top-level frame).
 * @property {Boolean} [matchAboutBlank] - If `true`, the code will be injected into embedded "about:blank" and "about:srcdoc" frames.
 * @property {RunAt} [runAt]             - The soonest that the code will be injected into the tab.
 */

/**
 * {@link Tabs#highlight} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-highlight}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/highlight}
 *
 * @typedef {Object} Tabs~HighlightInfo
 *
 * @property {Number} [windowId]       - ID of the window that contains the tabs.
 * @property {Number, Number[]} [tabs] - One or more tab indices to highlight.
 */

/**
 * {@link Tabs#move} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-move}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/move}
 *
 * @typedef {Object} Tabs~MoveProperties
 *
 * @property {Number} index      - The index position to move the tab to, starting at 0.
 * @property {Number} [windowId] - The ID of the window to which you want to move the tab(s).
 */

/**
 * {@link PageSettings} is used to control how a tab is rendered as a PDF by the {@link Tabs#saveAsPDF} method.
 * &nbsp
 * All its properties are optional.
 * &nbsp
 * For setting headers and footers, you can include certain special characters in the strings you supply. These
 * will be replaced in the rendered output as follows:
 * &nbsp
 *  - "&P": the page number, like "2"
 * &nbsp
 *  - "&PT": the page number and the total number of pages, like "2 of 3"
 * &nbsp
 *  - "&D": the current date/time
 * &nbsp
 *  - "&T": the page title
 * &nbsp
 *  - "&U": the page URL
 *
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/PageSettings}
 *
 * @typedef {Object} Tabs~PageSettings
 *
 * @property {Number} [edgeBottom]            - The spacing between the bottom of the footers and the bottom edge of the paper (inches).
 * @property {Number} [edgeLeft]              - The spacing between the left header/footer and the left edge of the paper (inches).
 * @property {Number} [edgeRight]             - The spacing between the right header/footer and the left edge of the paper (inches).
 * @property {Number} [edgeTop]               - The spacing between the top of the headers and the top edge of the paper (inches).
 * @property {String} [footerCenter]          - The text for the page's center footer.
 * @property {String} [footerLeft]            - The text for the page's left footer. Default: "&PT".
 * @property {String} [footerRight]           - The text for the page's right footer. Default: "&D".
 * @property {String} [headerCenter]          - The text for the page's center header.
 * @property {String} [headerLeft]            - The text for the page's left header. Default: "&T".
 * @property {String} [headerRight]           - The text for the page's right header. Default: "&U".
 * @property {Number} [marginBottom]          - The margin between the page content and the bottom edge of the paper (inches).
 * @property {Number} [marginLeft]            - The margin between the page content and the left edge of the paper (inches).
 * @property {Number} [marginRight]           - The margin between the page content and the right edge of the paper (inches).
 * @property {Number} [marginTop]             - The margin between the page content and the top edge of the paper (inches).
 * @property {Number} [orientation]           - Page orientation: `0` means "portrait", `1` means "landscape". Default: 0.
 * @property {Number} [paperHeight]           - The paper height in paper size units. Default: 11.0.
 * @property {Number} [paperSizeUnit]         - The paper size unit: 0 = inches, 1 = millimeters. Default: 0.
 * @property {Number} [paperWidth]            - The paper width in paper size units. Default: 8.5.
 * @property {Number} [scaling]               - Page content scaling factor. 1 means 100% or normal size. Default: 1.
 * @property {Boolean} [showBackgroundColors] - Whether the page background colors should be shown. Default: false.
 * @property {Boolean} [showBackgroundImages] - Whether the page background images should be shown. Default: false.
 * @property {Boolean} [shrinkToFit]          - Whether the page content should shrink to fit the page width. Default: true.
 */

/**
 * {@link Tabs#query} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-query}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/query}
 *
 * @typedef {Object} Tabs~QueryInfo
 *
 * @property {Boolean} [active]            - Whether the tabs are active in their windows.
 * @property {Boolean} [audible]           - Whether the tabs are audible.
 * @property {Boolean} [autoDiscardable]   - Whether the tabs can be discarded automatically by the browser when resources are low.
 * @property {String} [cookieStoreId]      - Use this to return only tabs whose cookie store ID is `cookieStoreId`.
 * @property {Boolean} [currentWindow]     - Whether the tabs are in the current window.
 * @property {Boolean} [discarded]         - Whether the tabs are discarded.
 * @property {Boolean} [highlighted]       - Whether the tabs are highlighted.
 * @property {Number} [index]              - The position of the tabs within their windows.
 * @property {Boolean} [muted]             - Whether the tabs are muted.
 * @property {Boolean} [lastFocusedWindow] - Whether the tabs are in the last focused window.
 * @property {Number} [openerTabId]        - The ID of the tab that opened this tab.
 * @property {Boolean} [pinned]            - Whether the tabs are pinned.
 * @property {TabStatus} [status]          - Whether the tabs have completed loading.
 * @property {String} [title]              - Match page titles against a pattern.
 * @property {String} [url]                - Match tabs against one or more match patterns.
 * @property {Number} [windowId]           - The ID of the parent window, or {@link Windows#WINDOW_ID_CURRENT} for the current window.
 * @property {WindowType} [windowType]     - The type of window the tabs are in.
 */

/**
 * {@link Tabs#reload} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-reload}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/reload}
 *
 * @typedef {Object} Tabs~ReloadProperties
 *
 * @property {Boolean} [bypassCache] - Bypass the local web cache. Default is `false`.
 */

/**
 * {@link Tabs#removeCSS} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-removeCSS}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/removeCSS}
 *
 * @typedef {Object} Tabs~RemoveCSS
 *
 * @property {Boolean} [allFrames]       - If `true`, the code will be removed from all frames of the current page.
 * @property {String} [code]             - CSS to remove, as a text string.
 * @property {String} [cssOrigin]        - "user", for CSS added as a user stylesheet, or "author" for CSS added as an author stylesheet.
 * @property {String} [file]             - Path to a file containing the CSS to remove.
 * @property {Number} [frameId]          - The frame from which to remove the CSS. Defaults to `0` (the top-level frame).
 * @property {Boolean} [matchAboutBlank] - If `true`, the CSS will be removed from embedded "about:blank" and "about:srcdoc" frames.
 */

/**
 * {@link Tabs#executeScript} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-executeScript}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/executeScript}
 *
 * @typedef {Object} Tabs~ScriptDetails
 *
 * @property {Boolean} [allFrames]       -  If `true`, the code will be injected into all frames of the current page.
 * @property {String} [code]             - Code to inject, as a text string.
 * @property {String} [file]             - Path to a file containing the code to inject.
 * @property {Number} [frameId]          - The frame where the code should be injected. Defaults to 0 (the top-level frame).
 * @property {Boolean} [matchAboutBlank] - If `true`, the code will be injected into embedded "about:blank" and "about:srcdoc" frames.
 * @property {RunAt} [runAt]             - The soonest that the code will be injected into the tab. Defaults to "document_idle".
 */

/**
 * {@link Tabs#update} Details.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs#method-update}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/update}
 *
 * @typedef {Object} Tabs~UpdateProperties
 *
 * @property {Boolean} [active]          - Whether the tab should be active.
 * @property {Boolean} [autoDiscardable] - Whether the tab should be discarded automatically by the browser when resources are low.
 * @property {Boolean} [highlighted]     - Adds or removes the tab from the current selection.
 * @property {Boolean} [loadReplace]     - Whether the new URL should replace the old URL in the tab's navigation history.
 * @property {Boolean} [muted]           - Whether the tab should be muted.
 * @property {Number} [openerTabId]      - The ID of the tab that opened this tab.
 * @property {Boolean} [pinned]          - Whether the tab should be pinned.
 * @property {Boolean} [selected]        - (Deprecated) Whether the tab should be selected.
 * @property {String} [url]              - A URL to navigate the tab to.
 */

/**
 * Interact with the browser's tab system.
 * &nbsp
 * You can use this API to get a list of opened tabs, filtered by various criteria, and to open, update, move,
 * reload, and remove tabs. You can't directly access the content hosted by tabs using this API, but you can
 * insert JavaScript and CSS into tabs using the {@link Tabs#executeScript} or {@link Tabs#insertCSS} APIs.
 * &nbsp
 * You can use most of this API without any special permission. However:
 * &nbsp
 *  - to access {@link Tab#url}, {@link Tab#title}, and {@link Tab#favIconUrl}, you need to have the "tabs" permission.
 *    In Firefox this also means you need "tabs" to query by URL.
 * &nbsp
 *  - to use {@link Tabs#executeScript} or {@link Tabs#insertCSS} you must have the host permission for the tab
 * &nbsp
 * Alternatively, you can get these permissions temporarily, only for the currently active tab and only in response
 * to an explicit user action, by asking for the "activeTab" permission.
 * &nbsp
 * Many tab operations use a Tab ID. Tab IDs are guaranteed to be unique to a single tab only within a browser
 * session. If the browser is restarted, then it can and will reuse tab IDs. To associate information with a tab
 * across browser restarts, use {@link Sessions#setTabValue}.
 *
 * @see {@link https://developer.chrome.com/extensions/tabs}
 * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs}
 */
export class Tabs extends Base {
    static Title = 'Tabs';

    static Name = 'tabs';
    static Compatibility = TabsCompatibility;

    constructor(options = null) {
        super(options);

        // region Events

        /**
         * Fires when the active tab in a window changes.
         * &nbsp
         * Note that the tab's URL may not be set at the time this event fired, but you can listen to {@link onUpdated}
         * events to be notified when a URL is set.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onActivated}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActivated}
         *
         * @returns {Event} Listener that emits {@link activatedEvent activated} events.
         */
        this.onActivated = new Event(this, 'onActivated');

        /**
         * Fires when the selected tab in a window changes.
         * &nbsp
         * Note that the tab's URL may not be set at the time this event fired, but you can listen to {@link onUpdated}
         * events to be notified when a URL is set.
         * &nbsp
         * @deprecated Deprecated, use {@link onActivated} instead.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onActiveChanged}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onActiveChanged}
         *
         * @returns {Event} Listener that emits {@link activeChangedEvent activeChanged} events.
         */
        this.onActiveChanged = new Event(this, 'onActiveChanged');

        /**
         * Fired when a tab is attached to a window, for example because it was moved between windows.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onAttached}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onAttached}
         *
         * @returns {Event} Listener that emits {@link attachedEvent attached} events.
         */
        this.onAttached = new Event(this, 'onAttached');

        /**
         * Fired when a tab is created.
         * &nbsp
         * Note that the tab's URL may not be given its final value at the time this event fired. In particular,
         * Firefox opens a new tab with the URL "about:blank" before loading the new page into it. You
         * can listen to {@link onUpdated} events to be notified when a URL is set.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onCreated}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onCreated}
         *
         * @returns {Event} Listener that emits {@link createdEvent created} events.
         */
        this.onCreated = new Event(this, 'onCreated');

        /**
         * Fired when a tab is detached from a window, for example because it is being moved between windows.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onDetached}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onDetached}
         *
         * @returns {Event} Listener that emits {@link detachedEvent detached} events.
         */
        this.onDetached = new Event(this, 'onDetached');

        /**
         * Fired when the highlighted or selected tabs in a window changes.
         * &nbsp
         * @deprecated Deprecated, use {@link onHighlighted} instead.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onHighlightChanged}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlightChanged}
         *
         * @returns {Event} Listener that emits {@link highlightChangedEvent highlightChanged} events.
         */
        this.onHighlightChanged = new Event(this, 'onHighlightChanged');

        /**
         * Fired when the set of highlighted tabs in a window changes.
         * &nbsp
         * Firefox doesn't have the concept of highlighting multiple tabs, and so in Firefox highlighting is just an
         * alias for tab activation. So this event will fire only when the active tab in a window changes, and the
         * `tabIds` property of `highlightInfo` will always be an array of length one, with the `tabId` referring
         * to the active tab.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onHighlighted}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onHighlighted}
         *
         * @returns {Event} Listener that emits {@link highlightedEvent highlighted} events.
         */
        this.onHighlighted = new Event(this, 'onHighlighted');

        /**
         * Fired when a tab is moved within a window.
         * &nbsp
         * Only one move event is fired, representing the tab the user directly moved. Move events are not fired for
         * the other tabs that must move in response. This event is not fired when a tab is moved between windows.
         * For that, see {@link onDetached}.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onMoved}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onMoved}
         *
         * @returns {Event} Listener that emits {@link movedEvent moved} events.
         */
        this.onMoved = new Event(this, 'onMoved');

        /**
         * Fired when a tab is closed.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onRemoved}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onRemoved}
         *
         * @returns {Event} Listener that emits {@link removedEvent removed} events.
         */
        this.onRemoved = new Event(this, 'onRemoved');

        /**
         * Fired when a tab is replaced with another tab due to prerendering or instant.
         * &nbsp
         * This event may not be relevant for or supported by browsers other than Chrome.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onReplaced}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onReplaced}
         *
         * @returns {Event} Listener that emits {@link replacedEvent replaced} events.
         */
        this.onReplaced = new Event(this, 'onReplaced');

        /**
         * Fires when the selected tab in a window changes.
         * &nbsp
         * @deprecated Deprecated, use {@link onActivated} instead.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onSelectionChanged}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onSelectionChanged}
         *
         * @returns {Event} Listener that emits {@link selectionChangedEvent selectionChanged} events.
         */
        this.onSelectionChanged = new Event(this, 'onSelectionChanged');

        /**
         * Fired when a tab is updated.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onUpdated}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onUpdated}
         *
         * @returns {Event} Listener that emits {@link updatedEvent updated} events.
         */
        this.onUpdated = new Event(this, 'onUpdated');

        /**
         * Fired when a tab is zoomed.
         *
         * @see {@link https://developer.chrome.com/extensions/tabs#event-onZoomChange}
         * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/onZoomChange}
         *
         * @returns {Event} Listener that emits {@link zoomChangeEvent zoomChange} events.
         */
        this.onZoomChange = new Event(this, 'onZoomChange');

        // endregion
    }

    // region Methods

    /**
     * Creates a data URI encoding an image of the visible area of the given tab. You must have the "<all_urls>"
     * permission to use this method.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/captureTab}
     *
     * @param {Number} [tabId] ID of the tab to capture. Defaults to the active tab in the current window.
     *
     * @param {ImageDetails} [options] Image Options
     *
     * @returns {Promise} A `Promise` that will be fulfilled with a data URL which encodes an image of the visible
     *                    area of the captured tab. May be assigned to the 'src' property of an HTML Image element
     *                    for display. If any error occurs the promise will be rejected with an error message.
     */
    captureTab(tabId, options) {
        return this.$promise('captureTab', tabId, options);
    }

    /**
     * Creates a data URI encoding an image of the visible area of the currently active tab in the specified
     * window. You must have the "<all_urls>" permission to use this method.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-captureVisibleTab}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/captureVisibleTab}
     *
     * @param {Number} [windowId] The target window. Defaults to the current window.
     *
     * @param {ImageDetails} [options] Image Options
     *
     * @returns {Promise} A `Promise` that will be fulfilled with a data URL which encodes an image of the visible
     *                    area of the captured tab. May be assigned to the 'src' property of an HTML Image element
     *                    for display. If any error occurs the promise will be rejected with an error message.
     */
    captureVisibleTab(windowId, options) {
        return this.$promise('captureVisibleTab', windowId, options);
    }

    /**
     * Call this function to set up a connection between the extension's background scripts (or other privileged
     * scripts, such as popup scripts or options page scripts) and any content scripts that belong to this
     * extension and are running in the specified tab.
     * &nbsp
     * When this is called, the {@link Runtime#onConnect} event will be fired in any content script belonging to
     * this extension that are running in the specified tab. The event listener will be passed another
     * {@link Port} object. The two sides can then use the Port objects to exchange messages.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-connect}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/connect}
     *
     * @param {Number} tabId ID of the tab whose content scripts we want to connect to.
     *
     * @param {...Tabs~ConnectInfo} [connectInfo] Connection information.
     *
     * @returns {Port} A port that can be used to communicate with the content scripts running in the specified tab.
     */
    connect(tabId, connectInfo) {
        let instance = this.$call('connect', tabId, connectInfo);

        if(IsNil(instance)) {
            return null;
        }

        return new Port(instance, {
            browser: this.$browser
        });
    }

    /**
     * Create a new tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-create}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/create}
     *
     * @param {...Tabs~CreateProperties} createProperties Properties to give the new tab.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Tab} containing details about the
     *                    created tab. If the tab could not be created (for example, because url used
     *                    a privileged scheme) the promise will be rejected with an error message.
     */
    create(createProperties) {
        return this.$promise('create', createProperties);
    }

    /**
     * Detects the primary language of the content in a tab, using the Compact Language Detector (CLD).
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-detectLanguage}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/detectLanguage}
     *
     * @param {Number} [tabId] Defaults to the active tab of the current window.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a string representing an ISO language code such
     *                    as "en" or "fr". For a complete list of languages supported by this method, see the CLD2
     *                    README. For an unknown language, "und" will be returned (but see bug 1288263). If any
     *                    error occurs the promise will be rejected with an error message.
     */
    detectLanguage(tabId) {
        return this.$promise('detectLanguage', tabId);
    }

    /**
     * Discard one or more tabs.
     *
     * Some browsers automatically "discard" tabs that they don't think are likely to be needed by the user
     * soon. The tab stays visible in the tabstrip and the browser remembers its state, so if the user selects
     * a tab that has been discarded, it is immediately restored.
     * &nbsp
     * The details of exactly what is discarded are browser-specific, but in general, discarding a tab enables the
     * browser to free some of the memory occupied by that tab.
     * &nbsp
     * The {@link discard} method enables an extension to discard one or more tabs. It's not possible to discard
     * the currently active tab, or a tab whose document contains a beforeunload listener that would display
     * a prompt.
     * &nbsp
     * If the ID of the active tab is passed in, it will not be discarded, but the promise will be fulfilled and any
     * other tabs passed in will be discarded.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-discard}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/discard}
     *
     * @param {Number, Number[]} tabIds The IDs of the tab or tabs to discard.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when all the specified tabs have
     *                    been discarded. If any error occurs (for example, invalid tab IDs), the promise will
     *                    be rejected with an error message.
     */
    discard(tabIds) {
        return this.$promise('discard', tabIds);
    }

    /**
     * Duplicates a tab, given its ID.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-duplicate}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/duplicate}
     *
     * @param {Number} tabId The ID of the tab which is to be duplicated.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Tab} object containing details about
     *                    the duplicated tab. The {@link Tab} only contains url, title and favIconUrl if the
     *                    extension has the "tabs" permission. If any error occurs the promise will be rejected
     *                    with an error message.
     */
    duplicate(tabId) {
        return this.$promise('duplicate', tabId);
    }

    /**
     * Injects JavaScript code into a page.
     * &nbsp
     * To use this API you must have the permission for the page's URL, either explicitly as a host permission,
     * or using the activeTab permission.
     * &nbsp
     * You can only inject code into pages whose URL can be expressed using a match pattern: meaning, its scheme
     * must be one of "http", "https", "file", "ftp". This means that you can't inject code into any of the
     * browser's built-in pages, such as about:debugging, about:addons, or the page that opens when you open
     * a new empty tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-executeScript}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/executeScript}
     *
     * @param {Number} [tabId] The ID of the tab in which to run the script. Defaults to the active tab of the
     *                         current window.
     *
     * @param {...Tabs~ScriptDetails} [details] An object describing the script to run.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with an array of objects, representing the
     *                    result of the script in every injected frame.
     */
    executeScript(tabId, details) {
        return this.$promise('executeScript', tabId, details);
    }

    /**
     * Given a tab ID, get the tab's details as a {@link Tab}.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-get}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/get}
     *
     * @param {Number} tabId ID of the tab to get.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Tab} containing information about the
     *                    tab. If the tab could not be found or some other error occurs, the promise
     *                    will be rejected with an error message.
     */
    get(tabId) {
        return this.$promise('get', tabId);
    }

    /**
     * Get details about all tabs in the specified window.
     * &nbsp
     * @deprecated Deprecated, use {@link query} instead.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-getAllInWindow}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getAllInWindow}
     *
     * @param {Number} [windowId] Defaults to the current window.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with an array of {@link Tab} objects, containing
     *                    information about all the tabs in the window. If the window could not
     *                    be found or some other error occurs, the promise will be rejected with
     *                    an error message.
     */
    getAllInWindow(windowId) {
        return this.$promise('getAllInWindow', windowId);
    }

    /**
     * Get a {@link Tab} containing information about the tab that this script is running in.
     * &nbsp
     * You can call this function in contexts where there is a browser tab, such as an options page. If you call
     * it from a background script or a popup, it will return undefined.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-getCurrent}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getCurrent}
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a tabs.Tab object containing information about
     *                    the current tab. If any error occurs the promise will be rejected with an error message.
     */
    getCurrent() {
        return this.$promise('getCurrent');
    }

    /**
     * Get the tab that is selected in the specified window.
     * &nbsp
     * @deprecated Deprecated, use {@link query} instead.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-getSelected}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getSelected}
     *
     * @param {Number} [windowId] Defaults to the current window.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Tab} object containing information
     *                    about the selected tab. If the tab could not be found or some other
     *                    error occurs, the promise will be rejected with an error message.
     */
    getSelected(windowId) {
        return this.$promise('getSelected', windowId);
    }

    /**
     * Get the current zoom factor for the specified tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-getZoom}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getZoom}
     *
     * @param {Number} [tabId] The ID of the tab to get the current zoom factor from. Defaults to the active tab
     *                         of the current window.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with the tab's current zoom factor, as a number
     *                    between 0.3 and 3. If the tab could not be found or some other error occurs,
     *                    the promise will be rejected with an error message.
     */
    getZoom(tabId) {
        return this.$promise('getZoom', tabId);
    }

    /**
     * Get the current zoom settings for a specified tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-getZoomSettings}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/getZoomSettings}
     *
     * @param {Number} [tabId] The ID of the tab to get the current zoom settings from. Defaults to the active tab
     *                         of the current window.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with {@link ZoomSettings} representing the tab's
     *                    current zoom settings. If the tab could not be found or some other error
     *                    occurs, the promise will be rejected with an error message.
     */
    getZoomSettings(tabId) {
        return this.$promise('getZoomSettings', tabId);
    }

    /**
     * Hide one or more tabs.
     *  &nbsp
     * Hidden tabs are no longer visible in the browser's tabstrip. Hidden tabs are not automatically
     * discarded: the code running in them continues to run. However, it's recommended that
     * you should also discard hidden tabs, to help manage memory and resource usage.
     * &nbsp
     * Not all tabs are eligible for being hidden:
     * &nbsp
     *  - Tabs that are pinned cannot be hidden.
     * &nbsp
     *  - Tabs that are sharing the screen, microphone or camera cannot be hidden.
     * &nbsp
     *  - The current active tab cannot be hidden.
     * &nbsp
     *  - Tabs that are in the process of being closed cannot be hidden.
     * &nbsp
     * To use this API you must have the "tabHide" permission.
     * &nbsp
     * If any of these tabs are not eligible for being hidden, they will not be hidden, but the call will still
     * succeed and eligible tabs will still be hidden. For example, if you pass [1, 3], and 1 identifies the
     * active tab, then only 3 will be hidden.
     * &nbsp
     * However, if any of the tab IDs are invalid, the call will fail and no tabs will be hidden.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/hide}
     *
     * @param {Number, Number[]} tabIds The IDs of the tab or tabs to hide.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with an array containing the IDs of the tabs that
     *                    were hidden. If any error occurs, the promise will be rejected with an error message.
     */
    hide(tabIds) {
        return this.$promise('hide', tabIds);
    }

    /**
     * Highlight one or more tabs. Tabs are specified using a window ID and a range of tab indices.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-highlight}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/highlight}
     *
     * @param {...Tabs~HighlightInfo} highlightInfo Highlight information.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Window} containing details about the
     *                    window whose tabs were highlighted. If the window could not be found
     *                    or some other error occurs, the promise will be rejected with an
     *                    error message.
     */
    highlight(highlightInfo) {
        return this.$promise('highlight', highlightInfo);
    }

    /**
     * Injects CSS into a page.
     * &nbsp
     * To use this API you must have the permission for the page's URL, either explicitly as a host permission, or
     * using the "activeTab" permission.
     * &nbsp
     * You can only inject CSS into pages whose URL can be expressed using a match pattern: meaning, its
     * scheme must be one of "http", "https", "file", "ftp". This means that you can't inject CSS into any of
     * the browser's built-in pages, such as about:debugging, about:addons, or the page that opens when
     * you open a new empty tab.
     * &nbsp
     * The inserted CSS may be removed again by calling {@link removeCSS}.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-insertCSS}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/insertCSS}
     *
     * @param {Number} [tabId] The ID of the tab in which to insert the CSS. Defaults to the active tab of
     *                         the current window.
     *
     * @param {...Tabs~CSS} [details] An object describing the CSS to insert.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when all the CSS has been
     *                    inserted. If any error occurs, the promise will be rejected with an error message.
     */
    insertCSS(tabId, details) {
        return this.$promise('insertCSS', tabId, details);
    }

    /**
     * Move one or more tabs to a new position in the same window or to a different window.
     * &nbsp
     * You can only move tabs to and from windows whose WindowType is "normal".
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-move}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/move}
     *
     * @param {Number, Number[]} tabIds ID of the tab to move, or an array of tab IDs.
     *
     * @param {...Tabs~MoveProperties} moveProperties An object that specifies where to move the tab(s).
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Tab} or an array of {@link Tab}'s,
     *                    containing details about the moved tabs. If no tabs were
     *                    moved (for example, because you tried to move an unpinned
     *                    tab before a pinned tab) this will be an empty array. If
     *                    any error occurs, the promise will be rejected with an
     *                    error message.
     */
    move(tabIds, moveProperties) {
        return this.$promise('move', tabIds, moveProperties);
    }

    /**
     * Print the contents of the active tab. If this function is called, the user will be presented with the
     * print dialog from the underlying platform, and will have the chance to change the print settings and
     * then print the currently active tab.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/print}
     */
    print() {
        this.$call('print');
    }

    /**
     * Open print preview for the active tab.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/printPreview}
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when the preview page has opened.
     */
    printPreview() {
        return this.$promise('printPreview');
    }

    /**
     * Get all tabs that have the specified properties, or all tabs if no properties are specified.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-query}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/query}
     *
     * @param {...Tabs~QueryInfo} [queryInfo] Query information.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with an array of {@link Tab}'s, containing
     *                    information about each matching tab. If any error occurs, the
     *                    promise will be rejected with an error message.
     */
    query(queryInfo) {
        return this.$promise('query', queryInfo);
    }

    /**
     * Reload a tab, optionally bypassing the local web cache.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-reload}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/reload}
     *
     * @param {Number} [tabId] The ID of the tab to reload. Defaults to the selected tab of the current window.
     *
     * @param {...Tabs~ReloadProperties} [reloadProperties] Reload properties.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when the tab has been
     *                    reloaded. If any error occurs, the promise will be rejected with an error
     *                    message.
     */
    reload(tabId, reloadProperties) {
        return this.$promise('reload', tabId, reloadProperties);
    }

    /**
     * Close one or more tabs.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-remove}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/remove}
     *
     * @param {Number, Number[]} tabIds The ids of the tab or tabs to close.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when all the specified tabs
     *                    have been removed or their `beforeunload` prompts have been handled. If
     *                    any error occurs, the promise will be rejected with an error message.
     */
    remove(tabIds) {
        return this.$promise('remove', tabIds);
    }

    /**
     * Remove CSS from a page which was previously injected by a call to {@link insertCSS}.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/removeCSS}
     *
     * @param {Number} [tabId] The ID of the tab from which to remove the CSS. Defaults to the active tab of
     *                         the current window.
     *
     * @param {...Tabs~RemoveCSS} [details] An object describing the CSS to remove from the page.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when all the CSS has
     *                    been removed. If any error occurs, the promise will be rejected with an
     *                    error message.
     */
    removeCSS(tabId, details) {
        return this.$promise('removeCSS', tabId, details);
    }

    /**
     * Saves the current page as a PDF file. This will open a dialog, supplied by the underlying operating system,
     * asking the user where they want to save the PDF file.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/saveAsPDF}
     *
     * @param {...Tabs~PageSettings} pageSettings Settings for the saved page. This object must be given, but all its
     *                                            properties are optional. Any properties not specified here will get
     *                                            the default values listed in the PageSettings documentation.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a status string when the dialog has
     *                    closed. The string may be any of:
     *                     - "saved"
     *                     - "replaced"
     *                     - "canceled"
     *                     - "not_saved"
     *                     - "not_replaced"
     */
    saveAsPDF(pageSettings) {
        return this.$promise('saveAsPDF', pageSettings);
    }

    /**
     * Sends a single message from the extension's background scripts (or other privileged scripts, such as
     * popup scripts or options page scripts) to any content scripts that belong to the extension and are
     * running in the specified tab.
     * &nbsp
     * The message will be received in the content scripts by any listeners to the {@link Runtime#onMessage}
     * event. Listeners may then optionally send a response back to the background script using the
     * `sendResponse` argument.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-sendMessage}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendMessage}
     *
     * @param {Number} tabId ID of the tab whose content scripts we want to send a message to.
     *
     * @param {any} message An object that can be serialized to JSON.
     *
     * @param {...Tabs~SendMessageOptions} [options] Send options.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with the JSON response object sent by the handler of
     *                    the message in the content script, or with no arguments if the content script did
     *                    not send a response. If an error occurs while connecting to the specified tab or
     *                    any other error occurs, the promise will be rejected with an error message. If
     *                    several frames response to the message, the promise is resolved to one of
     *                    answers.
     */
    sendMessage(tabId, message, options) {
        return this.$promise('sendMessage', tabId, message, options);
    }

    /**
     * Sends a single request to the content script(s) in the specified tab, with an optional callback to run
     * when a response is sent back. The {@link Extension#onRequest} event is fired in each content script
     * running in the specified tab for the current extension.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-sendRequest}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/sendRequest}
     *
     * @param {Number} tabId
     * @param {any} request
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with the JSON response object sent by the handler
     *                    of the message in the content script, or with no arguments if the content script did not
     *                    send a response. If an error occurs while connecting to the specified tab or any other
     *                    error occurs, the promise will be rejected with an error message.
     */
    sendRequest(tabId, request) {
        return this.$promise('sendRequest', tabId, request);
    }

    /**
     * Zoom the specified tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-setZoom}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/setZoom}
     *
     * @param {Number} [tabId] The ID of the tab to zoom. Defaults to the active tab of the current window.
     *
     * @param {Number} zoomFactor The new zoom factor. Use a value of 0 here to set the tab to its current
     *                            default zoom factor. Otherwise, this must be  a number between 0.3 and 3,
     *                            specifying a zoom factor.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments after the zoom factor has been
     *                    changed. If the tab could not be found or some other error occurs, the promise
     *                    will be rejected with an error message.
     */
    setZoom(tabId, zoomFactor) {
        return this.$promise('setZoom', tabId, zoomFactor);
    }

    /**
     * Set zoom settings for the specified tab. These settings are reset to the default settings upon
     * navigating the tab.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-setZoomSettings}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/setZoomSettings}
     *
     * @param {Number} [tabId] The ID of the tab to change the zoom settings for. Defaults to the active tab of the
     *                         current window.
     *
     * @param {ZoomSettings} zoomSettings Defines how zoom changes are handled and at what scope. Values of this
     *                                    type are objects.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments after the zoom settings have been
     *                    changed. If the tab could not be found or some other error occurs, the promise will
     *                    be rejected with an error message.
     */
    setZoomSettings(tabId, zoomSettings) {
        return this.$promise('setZoomSettings', tabId, zoomSettings);
    }

    /**
     * Show one or more tabs that were previously hidden by a call to {@link hide}.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/show}
     *
     * @param {Number, Number[]} tabIds The IDs of the tab or tabs to show.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments. If any error occurs, the promise
     *                    will be rejected with an error message.
     */
    show(tabIds) {
        return this.$promise('show', tabIds);
    }

    /**
     * Toggle Reader Mode for the given tab.
     * &nbsp
     * This function toggles Reader Mode for the given tab. It takes a tab ID as a parameter: if this is omitted,
     * the currently active tab is toggled.
     * &nbsp
     * Reader Mode, also known as Reader View, is a browser feature that makes it easier for the user to focus on
     * an article by:
     * &nbsp
     *  - hiding non-essential page elements like sidebars, footers, and ads
     * &nbsp
     *  - changing the page's text size, contrast and layout for better readability.
     * &nbsp
     * Reader Mode is useful specifically for articles: meaning, pages that have a body of text content as
     * their main feature. Pages that don't have an identifiable article are not eligible for display in
     * Reader Mode. To find out whether a page is an article, check the {@link Tab#isArticle}.
     * &nbsp
     * To find out whether a tab is already in Reader Mode, check the {@link Tab#isInReaderMode} property. To track
     * tabs changing into or out of Reader Mode, you'll need to keep track of the current state of all tabs, and
     * check when {@link Tab#isInReaderMode} changes.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/toggleReaderMode}
     *
     * @param {Number} [tabId] The ID of the tab to display in Reader Mode. Defaults to the selected tab of the
     *                         current window.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with no arguments when the tab has been updated. If
     *                    any error occurs (for example, because the page was not an article), the promise will
     *                    be rejected with an error message.
     */
    toggleReaderMode(tabId) {
        return this.$promise('toggleReaderMode', tabId);
    }

    /**
     * Navigate the tab to a new URL, or modify other properties of the tab.
     * &nbsp
     * To use this function, pass the ID of the tab to update, and an updateProperties object containing the
     * properties you want to update. Properties that are not specified in updateProperties are not modified.
     *
     * @see {@link https://developer.chrome.com/extensions/tabs#method-update}
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/tabs/update}
     *
     * @param {Number} [tabId] Defaults to the selected tab of the current window.
     *
     * @param {...Tabs~UpdateProperties} [updateProperties] The set of properties to update for this tab.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with a {@link Tab} containing details about the
     *                    updated tab. The {@link Tab} doesn't contain url, title and favIconUrl unless
     *                    the "tabs" permission has been requested. If the tab could not be
     *                    found or some other error occurs, the promise will be rejected with
     *                    an error message.
     */
    update(tabId, updateProperties) {
        return this.$promise('update', tabId, updateProperties);
    }

    // endregion
}

export {
    ImageFormat,
    RunAt,
    TabsCompatibility
};

export default new Tabs();
