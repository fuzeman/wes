import WebRequestCompatibility from 'mdn-browser-compat-data/webextensions/api/webRequest';

import Base from './core/base';
import Event from './core/event';


export class WebRequest extends Base {
    static Title = 'WebRequest';

    static Name = 'webRequest';
    static Compatibility = WebRequestCompatibility;

    constructor(options = null) {
        super(options);

        // region Events

        this.onBeforeRequest = new Event(this, 'onBeforeRequest');
        this.onBeforeRedirect = new Event(this, 'onBeforeRedirect');
        this.onBeforeSendHeaders = new Event(this, 'onBeforeSendHeaders');

        this.onSendHeaders = new Event(this, 'onSendHeaders');
        this.onHeadersReceived = new Event(this, 'onHeadersReceived');

        this.onAuthRequired = new Event(this, 'onAuthRequired');
        this.onCompleted = new Event(this, 'onCompleted');
        this.onErrorOccurred = new Event(this, 'onErrorOccurred');
        this.onResponseStarted = new Event(this, 'onResponseStarted');

        // endregion
    }
}

export {
    WebRequestCompatibility
};

export default new WebRequest();
