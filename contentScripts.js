import ContentScriptsCompatibility from 'mdn-browser-compat-data/webextensions/api/contentScripts.json';
import IsNil from 'lodash/IsNil';

import Base from './core/base';


/**
 * {@link ContentScripts#register} CSS.
 *
 * Object which either has a property named `file`, which is a URL starting at the extension's manifest.json and
 * pointing to a CSS file to register, or a property named `code`, which is some CSS code to register.
 *
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts/register}
 *
 * @typedef {Object} ContentScripts~RegisterOptionsCSS
 *
 * @property {String} [file] - File Path
 * @property {String} [code] - Code
 */

/**
 * {@link ContentScripts#register} JavaScript.
 *
 * Object which either has a property named `file`, which is a URL starting at the extension's manifest.json and
 * pointing to a JavaScript file to register, or a property named `code`, which is some JavaScript code to register.
 *
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts/register}
 *
 * @typedef {Object} ContentScripts~RegisterOptionsJS
 *
 * @property {String} [file] - File Path
 * @property {String} [code] - Code
 */

/**
 * {@link ContentScripts#register} Options.
 *
 * Represents the content script to register. It has a similar syntax to the objects in the "content_scripts"
 * manifest key array. The differences are:
 * &nbsp
 * - Property names use camelCase, rather than underscores (for example, `excludeMatches`, not `exclude_matches`)
 * &nbsp
 * - The `js` and `css` properties allow you to register strings as well as URLs, so their syntax has to distinguish
 *   these types.
 *
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts/register}
 *
 * @typedef {Object} ContentScripts~RegisterOptions
 *
 * @property {String[]} matches           - An array of match patterns.
 * @property {Boolean} [allFrames]        - Inject into all frames matching the specified URL requirements.
 * @property {RegisterOptionsCSS[]} [css] - Array of CSS files/code to inject.
 * @property {String[]} [excludeGlobs]    - An array of strings containing wildcards to exclude.
 * @property {String[]} [excludeMatches]  - An array of match patterns to exclude.
 * @property {String[]} [includeGlobs]    - An array of strings containing wildcards to include.
 * @property {RegisterOptionsJS[]} [js]   - Array of JavaScript files/code to inject.
 * @property {Boolean} [matchAboutBlank]  - Insert the content scripts into blank pages (e.g. "about:blank").
 * @property {String} [runAt]             - When to inject provided `js` (document_start, document_end, document_idle)
 */

/**
 * A {@link RegisteredContentScript} is returned by a call to {@link ContentScripts#register} and represents the
 * content script registered in that call.
 *
 * It defines a single function {@link RegisteredContentScript#unregister}, which can be used to unregister the
 * content script.
 *
 * Note that if this object is destroyed (for example because it goes out of scope) then the content script
 * will be unregistered automatically, so you should keep a reference to this object for as long as you want
 * the content script to stay registered.
 *
 * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts/RegisteredContentScript}
 */
export class RegisteredContentScript extends Base {
    static Title = 'RegisteredContentScript';

    static Name = 'contentScripts.RegisteredContentScript';
    static Compatibility = ContentScriptsCompatibility;

    constructor(instance, browser = null) {
        super(browser);

        this._instance = instance;
    }

    get $target() {
        return this._instance;
    }

    /**
     * Unregister the content script.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts/RegisteredContentScript/unregister}
     */
    unregister() {
        this.$call('unregister');
    }
}

export class ContentScripts extends Base {
    static Title = 'ContentScripts';

    static Name = 'contentScripts';
    static Compatibility = ContentScriptsCompatibility;

    static Standard = [
        'register'
    ];

    /**
     * Register content script.
     * &nbsp
     * It accepts one parameter `contentScriptOptions`, which is an object with a similar syntax to the objects in the
     * "content_scripts" manifest key array. The differences are:
     * &nbsp
     *  - Property names use camelCase, rather than underscores (for example, `excludeMatches`, not `exclude_matches`)
     * &nbsp
     *  - The `js` and `css` properties allow you to register strings as well as URLs, so their syntax has to
     *    distinguish these types.
     * &nbsp
     * Note that if this object is destroyed (for example because it goes out of scope) then the content scripts will
     * be unregistered automatically, so you should keep a reference to this object for as long as you want the
     * content scripts to stay registered.
     *
     * @see {@link https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/contentScripts/register}
     *
     * @param {...ContentScripts~RegisterOptions} contentScriptOptions Content Script
     *
     * @returns {Promise} A `Promise` that will be fulfilled with a {@link RegisteredContentScript} object that you
     *                    can use to unregister the content script.
     */
    register(contentScriptOptions) {
        return this.$promise('register', contentScriptOptions).then((instance) => {
            if(IsNil(instance)) {
                return null;
            }

            return new RegisteredContentScript(instance);
        });
    }
}

export {
    ContentScriptsCompatibility
};

export default new ContentScripts();
