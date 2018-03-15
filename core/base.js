/* eslint-disable no-console */
import Bowser from 'bowser';
import Get from 'lodash/get';
import IsFunction from 'lodash/isFunction';
import IsNil from 'lodash/isNil';
import IsString from 'lodash/isString';
import IsUndefined from 'lodash/isUndefined';

import {Browser} from './environment';


export default class Base {
    static Title = null;

    static Prefix = true;
    static Name = null;

    static Compatibility = null;
    static Standard = [];

    constructor(options = null) {
        this.$options = {
            browser: Browser,
            compatibility: null,
            name: null,
            target: null,
            title: null,

            ...(options || {})
        };

        // Retrieve options
        this._browser = this.$options.browser;
        this._compatibility = this.$options.compatibility;
        this._name = this.$options.name;
        this._target = this.$options.target;
        this._title = this.$options.title;
    }

    // region Browser

    get $browser() {
        return this._browser;
    }

    set $browser(browser) {
        this._browser = browser;
    }

    // endregion

    // region Compatibility

    get $compatibility() {
        return this._compatibility || this.constructor.Compatibility;
    }

    set $compatibility(compatibility) {
        this._compatibility = compatibility;
    }

    get $support() {
        return Get(this.$compatibility, [
            'webextensions', 'api'
        ]);
    }

    // endregion

    // region Name

    get $name() {
        return this._name || this.constructor.Name;
    }

    set $name(name) {
        this._name = name;
    }

    // endregion

    get $namespace() {
        if(IsNil(this.$browser)) {
            return {};
        }

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

    // region Target

    get $target() {
        if(!IsNil(this._target)) {
            return this._target;
        }

        let namespace = this.$namespace;

        if(IsNil(namespace)) {
            return {};
        }

        return namespace[this.$name] || {};
    }

    set $target(target) {
        this._target = target;
    }

    // endregion

    // region Title

    get $title() {
        return this._title || this.constructor.Title;
    }

    set $title(title) {
        this._title = title;
    }

    // endregion

    $assertFunction(name) {
        let { path, message } = this.$check(name);

        // Throw an error if the member doesn't exist
        if(!this.$has(name)) {
            if(!IsNil(path) && !IsNil(message)) {
                throw new Error(`${path} is not available (${message})`);
            } else if(!IsNil(path)) {
                throw new Error(`${path} is not available`);
            }

            throw new Error(`${name} is not available`);
        }

        // Log warning
        if(!IsNil(message)) {
            console.warn(`[${path}] ${message}`);
        }

        // Ensure function exists
        if(!IsFunction(this.$target[name])) {
            throw new Error(`${name} is not a function`);
        }
    }

    $assertProperty(name) {
        let { path, message } = this.$check(name);

        // Throw an error if the member doesn't exist
        if(!IsNil(path) && !IsNil(message)) {
            throw new Error(`${path} is not available (${message})`);
        } else if(!IsNil(path)) {
            throw new Error(`${path} is not available`);
        }
    }

    $check(name) {
        let supportPrefix = '';

        if(this.constructor.Prefix) {
            name = `${this.$name}.${name}`;
        } else {
            supportPrefix = `${this.$name}.`;
        }

        // Build list of paths
        let paths = [];
        let pos = -1;

        while((pos = name.indexOf('.', pos + 1)) >= 0) {
            paths.push(name.substring(0, pos));
        }

        paths.push(name);

        // Validate parents
        for(let i = 0; i < paths.length; i++) {
            let path = paths[i];

            let value = Get(this.$namespace, path);

            // Undefined API
            if(IsNil(value) && i < 1 && this.constructor.Prefix) {
                return {
                    path,
                    message: null
                };
            }

            // Ignore Root API
            if(i < 1 && this.constructor.Prefix) {
                continue;
            }

            // Ignore standard members
            let current = path.substring(path.lastIndexOf('.') + 1);

            if(this.$standard.indexOf(current) >= 0) {
                continue;
            }

            // Retrieve support information
            let { status, support } = {
                status: {},
                support: null,

                ...Get(this.$support, `${supportPrefix + path}.__compat`, {})
            };

            // Ensure support information exists
            if(IsNil(support)) {
                if(!IsNil(value)) {
                    console.warn(`[${path}] Unknown member`);
                    continue;
                }

                return {
                    path,
                    message: 'unknown member'
                };
            }

            // Ensure browser support information exists
            if(IsNil(support[this.$browser.name])) {
                if(!IsNil(value)) {
                    console.warn(`[${path}] Unknown browser: ${this.$browser.name}`);
                    continue;
                }

                return {
                    path,
                    message: `unknown browser: ${this.$browser.name}`
                };
            }

            // Deprecated
            if(status.deprecated) {
                console.warn(`[${path}] Deprecated`);
            }

            if(status.experimental) {
                console.warn(`[${path}] Experimental`);
            }

            // Defined
            if(!IsUndefined(value)) {
                continue;
            }

            // Check version in support information
            let version_added = support[this.$browser.name].version_added;

            if(version_added === false) {
                return {
                    path,
                    message: 'not implemented'
                };
            }

            if(IsString(version_added) && Bowser.compareVersions([this.$browser.version, version_added]) < 0) {
                return {
                    path,
                    message: `requires: ${this.$browser.name} >= ${version_added}`
                };
            }

            // Not Defined
            return {
                path,
                message: null
            };
        }

        return {
            path: null,
            message: null
        };
    }

    $exists() {
        return !IsNil(this.$target);
    }

    $has(name) {
        return this.$exists() && !IsNil(Get(this.$target, name));
    }

    $hasFunction(name) {
        return this.$has(name) && IsFunction(Get(this.$target, name));
    }

    $call(name, ...args) {
        this.$assertFunction(name);

        // Call target function
        return this.$target[name].apply(this.$target, args);
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
        this.$assertProperty(name);

        // Return property value
        return this.$target[name];
    }
}
