import Filter from 'lodash/filter';
import IsFunction from 'lodash/isFunction';
import IsNil from 'lodash/isNil';
import IsPlainObject from 'lodash/isPlainObject';
import Remove from 'lodash/remove';

import Base from '../core/base';


export class MockAPI extends Base {
    static Title = 'Mock';
    static Name = 'mock';
}

export class MockEvent {
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

    hasListeners() {
        return this._listeners.length > 0;
    }

    removeListener(listener) {
        let index = this._listeners.indexOf(listener);

        if(index < 0) {
            return;
        }

        this._listeners.splice(index, 1);
    }
}

export class MockDeclarativeAction {

}

export class MockDeclarativeCondition {

}

export class MockDeclarativeEvent extends MockEvent {
    constructor() {
        super();

        this._rules = [];
    }

    addRules(rules, callback) {
        // Ensure `rules` is an error
        if(IsNil(rules) || !Array.isArray(rules)) {
            return Promise.reject(new Error(
                'Invalid value provided for the "rules" parameter (expected an array of plain objects)'
            ));
        }

        // Validate `rules`
        if(!this._isValidRules(rules)) {
            return Promise.reject(new Error(
                'Invalid value provided for the "rules" parameter (expected an array of plain objects)'
            ));
        }

        // Add rules to the event
        this._rules.push(...rules);

        // Fire callback (if defined)
        if(IsFunction(callback)) {
            callback(rules);
            return null;
        }

        // Return promise
        return Promise.resolve(rules);
    }

    getRules(...args) {
        let ruleIdentifiers;
        let callback;

        if(args.length === 1) {
            callback = args[0];
        } else if(args.length === 2) {
            ruleIdentifiers = args[0];
            callback = args[1];
        } else {
            throw new Error('Invalid arguments');
        }

        // Retrieve rules
        let rules = this._rules;

        // Filter by `ruleIdentifiers` (if provided)
        if(!IsNil(ruleIdentifiers)) {
            rules = Filter(rules, (rule) =>
                !IsNil(rule.id) && ruleIdentifiers.indexOf(rule.id) >= 0
            );
        }

        // Fire callback (if defined)
        if(IsFunction(callback)) {
            callback(rules);
            return null;
        }

        // Return promise
        return Promise.resolve(rules);
    }

    removeRules(ruleIdentifiers, callback) {
        // Remove rules
        Remove(this._rules, (rule) =>
            !IsNil(rule.id) && ruleIdentifiers.indexOf(rule.id) >= 0
        );

        // Fire callback (if defined)
        if(IsFunction(callback)) {
            callback();
            return null;
        }

        // Return promise
        return Promise.resolve();
    }

    _isValidRules(rules) {
        for(let i = 0; i < rules.length; i++) {
            if(!this._isValidRule(rules[i])) {
                return false;
            }
        }

        return true;
    }

    _isValidRule(rule) {
        if(!IsPlainObject(rule)) {
            return false;
        }

        // Validate `rule.actions`
        for(let i = 0; i < (rule.actions || []).length; i++) {
            if(!(rule.actions[i] instanceof MockDeclarativeAction)) {
                return false;
            }
        }

        // Validate `rule.conditions`
        for(let i = 0; i < (rule.conditions || []).length; i++) {
            if(!(rule.conditions[i] instanceof MockDeclarativeCondition)) {
                return false;
            }
        }

        return true;
    }
}

export {
    MockEvent as MockListener
};
