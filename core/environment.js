/* globals browser, chrome */
import Bowser from 'bowser';
import IsNil from 'lodash/isNil';


export const Browsers = {
    chrome: {
        name: 'chrome',
        title: 'Chrome',

        namespace: () => chrome,
        promises: false
    },
    firefox: {
        name: 'firefox',
        title: 'Firefox',

        namespace: () => browser,
        promises: true
    },
    opera: {
        name: 'opera',
        title: 'Opera',

        namespace: () => chrome,
        promises: false
    }
};

export function getBrowserName(bowser) {
    if(bowser.chrome) {
        return 'chrome';
    }

    if(bowser.firefox) {
        return 'firefox';
    }

    if(bowser.opera) {
        return 'opera';
    }

    return null;
}

// Retrieve browser details
let current = Browsers[getBrowserName(Bowser)];

export const Browser = !IsNil(current) ? {
    ...current,

    version: Bowser.version
} : null;
