import IsNil from 'lodash/isNil';

import Base from './base';


/**
 * Event which allows the addition and removal of listeners.
 *
 * @see {@link https://developer.chrome.com/extensions/events#type-Event}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/events/Event}
 */
export default class Event extends Base {
    static Standard = [
        'addListener',
        'hasListener',
        'hasListeners',
        'removeListener'
    ];

    constructor(api, name, options = null) {
        super({
            browser: api.$browser,
            compatibility: api.$compatibility,

            ...(options || {})
        });

        this._api = api;
        this._key = name;

        // Create title
        this.$title = `${api.$title}.${name}`;

        // Create name
        this.$name = `${api.$name}.${name}`;
    }

    get $target() {
        if(IsNil(this._api.$target)) {
            return null;
        }

        return this._api.$target[this._key] || null;
    }

    /**
     * Register an event listener `callback` to this event.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-addListener}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/addListener}
     *
     * @param {Function} callback Event listener
     * @param {Array} args Arguments
     */
    addListener(callback, ...args) {
        this.$call('addListener', callback, ...args);
    }

    /**
     * Check whether an event listener `callback` is registered to this event.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-hasListener}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/hasListener}
     *
     * @param {Function} callback Event listener
     */
    hasListener(callback) {
        return this.$call('hasListener', callback);
    }

    /**
     * Check whether any event listeners are registered to this event.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-hasListeners}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/hasListeners}
     *
     * @returns {Boolean}
     */
    hasListeners() {
        return this.$call('hasListeners');
    }

    /**
     * Deregister an event listener `callback` from this event.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-removeListener}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/removeListener}
     *
     * @param {Function} callback Event listener
     */
    removeListener(callback) {
        this.$call('removeListener', callback);
    }
}

/**
 * Declarative rule for handling events.
 *
 * @see {@link https://developer.chrome.com/extensions/events#type-Rule}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/events/Rule}
 *
 * @typedef {Object} DeclarativeEvent~Rule
 *
 * @property {any[]} actions     - Actions that are triggered if one of the conditions is fulfilled.
 * @property {any[]} conditions  - Conditions that can trigger the actions.
 * @property {String} [id]       - Identifier that allows referencing this rule.
 * @property {Number} [priority] - Priority of this rule. Defaults to 100.
 * @property {String[]} [tags]   - Tags can be used to annotate rules and perform operations on sets of rules.
 */

/**
 * Declarative event which allows the addition and removal of rules.
 *
 * @see {@link https://developer.chrome.com/extensions/events#type-Event}
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/events/Event}
 */
export class DeclarativeEvent extends Event {
    static Standard = Event.Standard.concat([
        'addRules',
        'getRules',
        'removeRules'
    ]);

    /**
     * Registers `rules` to handle this event. These do not replace previously registered rules.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-addRules}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/addRules}
     *
     * @param {...DeclarativeEvent~Rule[]} rules Rules to be registered.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with the rules that were registered, including any
     *                    optional parameters.
     */
    addRules(rules) {
        return this.$promise('addRules', rules);
    }

    /**
     * Retrieve currently registered rules.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-getRules}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/getRules}
     *
     * @param {String[]} [ruleIdentifiers] Only return rules matching these identifiers.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled with the currently registered rules, including any
     *                    optional parameters.
     */
    getRules(ruleIdentifiers) {
        return this.$promise('getRules', ruleIdentifiers);
    }

    /**
     * Unregister currently registered rules.
     *
     * @see {@link https://developer.chrome.com/extensions/events#method-Event-removeRules}
     * @see {@link https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/events/Event/removeRules}
     *
     * @param {String[]} [ruleIdentifiers] Only remove rules matching these identifiers.
     *
     * @returns {Promise} A {@link Promise} that will be fulfilled if the rules were unregistered.
     */
    removeRules(ruleIdentifiers) {
        return this.$promise('removeRules', ruleIdentifiers);
    }
}
