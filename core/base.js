/* eslint-disable no-console */
import Bowser from 'bowser';
import Get from 'lodash/get';
import IsFunction from 'lodash/isFunction';
import IsNil from 'lodash/isNil';

import {Browser} from './environment';


class Listener {
    constructor(api, name) {
        this.$api = api;
        this.$name = name;
    }

    get $listener() {
        let message = this.$api.$check(this.$name);

        // Ensure API exists
        if(IsNil(this.$api.$target)) {
            if(IsNil(message)) {
                throw new Error(`${this.$api.constructor.Title} API is not available`);
            }

            throw new Error(`${this.$api.constructor.Title} API is not available (${message})`);
        }

        // Retrieve target listener
        let target = this.$api.$target[this.$name];

        // Ensure target listener exists
        if(IsNil(target)) {
            if(IsNil(message)) {
                throw new Error(`${this.$api.constructor.Title} API doesn\'t support "${this.$name}"`);
            }

            throw new Error(`${this.$api.constructor.Title} API doesn\'t support "${this.$name}" (${message})`);
        }

        // Log warnings
        if(!IsNil(message)) {
            console.warn(`[${this.$api.constructor.Name}.${this.$name}] ${message}`);
        }

        // Return listener
        return target;
    }

    /**
     * Add a listener to this event.
     *
     * @param {Function} listener Listener to add
     */
    addListener(listener) {
        return this.$listener.addListener(listener);
    }

    /**
     * Check whether `listener` is registered for this event.
     *
     * @param {Function} listener Listener
     * @return {Boolean} true if it is listening, false otherwise.
     */
    hasListener(listener) {
        return this.$listener.hasListener(listener);
    }

    /**
     * Stop listening to this event.
     *
     * @param {Function} listener Listener to remove
     */
    removeListener(listener) {
        return this.$listener.removeListener(listener);
    }
}

export default class Base {
    static Title = null;

    static Name = null;
    static Compatibility = null;

    static Standard = [];

    constructor(browser = null) {
        this.$browser = browser || Browser;
    }

    get $namespace() {
        if(IsFunction(this.$browser.namespace)) {
            return this.$browser.namespace();
        }

        return this.$browser.namespace;
    }

    get $lastError() {
        if(IsNil(this.$namespace) || IsNil(this.$namespace.runtime)) {
            return null;
        }

        return this.$namespace.runtime.lastError;
    }

    get $standard() {
        return this.constructor.Standard;
    }

    get $target() {
        return this.$namespace[this.constructor.Name];
    }

    $check(name) {
        let compat = Get(this.constructor.Compatibility, [
            'webextensions', 'api', this.constructor.Name,
            name, '__compat'
        ]);

        if(IsNil(compat)) {
            return `Unknown method: ${this.constructor.Name}.${name}`;
        }

        // Retrieve browser support information
        let support = compat.support[this.$browser.name];

        if(IsNil(support)) {
            return `Unknown browser: ${this.$browser.name}`;
        }

        if(support.version_added === true) {
            return null;
        }

        if(Bowser.compareVersions([this.$browser.version, support.version_added]) >= 0) {
            return null;
        }

        return `Requires: ${this.$browser.title} >= ${support.version_added}`;
    }

    $call(name, ...args) {
        let message = this.$check(name);

        // Ensure API exists
        if(IsNil(this.$target)) {
            if(IsNil(message)) {
                throw new Error(`${this.constructor.Title} API is not available`);
            }

            throw new Error(`${this.constructor.Title} API is not available (${message})`);
        }

        // Retrieve target function
        let target = this.$target[name];

        // Ensure target function exists
        if(IsNil(target) || !IsFunction(target)) {
            if(IsNil(message)) {
                throw new Error(`${this.constructor.Title} API doesn\'t support "${name}"`);
            }

            throw new Error(`${this.constructor.Title} API doesn\'t support "${name}" (${message})`);
        }

        // Log warnings
        if(!IsNil(message)) {
            console.warn(`[${this.constructor.Name}.${name}] ${message}`);
        }

        // Call target function
        return target(...args);
    }

    $promise(name, ...args) {
        if(this.$browser.promises) {
            return Promise.resolve().then(() =>
                this.$call(name, ...args)
            );
        }

        // Convert callback function to promise
        return new Promise((resolve, reject) => {
            this.$call(name, ...args, (...result) => {
                if(!IsNil(this.$lastError)) {
                    // Reject promise with `runtime.lastError`
                    reject(new Error(this.$lastError.message || 'Unknown Error'));
                    return;
                }

                // Resolve promise
                resolve(...result);
            });
        });
    }

    $property(name) {
        let message = this.$check(name);

        // Ensure API exists
        if(IsNil(this.$target)) {
            if(IsNil(message)) {
                throw new Error(`${this.constructor.Title} API is not available`);
            }

            throw new Error(`${this.constructor.Title} API is not available (${message})`);
        }

        // Ensure target property exists
        if(this.$standard.indexOf(name) < 0 && !IsNil(message)) {
            throw new Error(`${this.constructor.Title} API doesn\'t support "${name}" (${message})`);
        }

        // Return property value
        return this.$target[name];
    }

    $listener(name) {
        return new Listener(this, name);
    }
}
