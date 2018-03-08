export class MockListener {
    constructor() {
        this._listeners = [];
    }

    emit(...args) {
        for(let i = 0; i < this._listeners.length; i++) {
            this._listeners[i](...args);
        }
    }

    addListener(listener) {
        this._listeners.push(listener);
    }

    hasListener(listener) {
        return this._listeners.indexOf(listener) >= 0;
    }

    removeListener(listener) {
        let index = this._listeners.indexOf(listener);

        if(index < 0) {
            return;
        }

        this._listeners.splice(index, 1);
    }
}
