/* globals chrome, browser */
import Bowser from 'bowser';
import IsNil from 'lodash/isNil';


export const Browsers = {
    chrome: {
        name: 'chrome',
        title: 'Chrome',

        namespace: () => window.chrome,
        promises: false
    },
    firefox: {
        name: 'firefox',
        title: 'Firefox',

        namespace: () => window.browser,
        promises: true
    }
};

export function getBrowserName(bowser) {
    if(bowser.chrome) {
        return 'chrome';
    }

    if(bowser.firefox) {
        return 'firefox';
    }

    return null;
}

// Retrieve browser details
let current = Browsers[getBrowserName(Bowser)];

export const Browser = !IsNil(current) ? {
    ...current,

    version: Bowser.version
} : null;
