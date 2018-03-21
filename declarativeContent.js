import IsNil from 'lodash/isNil';
import IsPlainObject from 'lodash/isPlainObject';
import Map from 'lodash/map';
import Pick from 'lodash/pick';

import Base from './core/base';
import DeclarativeContentCompatibility from './declarativeContent.json';
import {DeclarativeEvent} from './core/event';


// region Actions

class Action { }

export class RequestContentScript extends Action {
    constructor(options) {
        super();

        this._options = options;
    }

    $create(api) {
        return new (api.$property('RequestContentScript'))(this._options);
    }
}

export class SetIcon extends Action {
    constructor(options) {
        super();

        this._options = options;
    }

    $create(api) {
        return new (api.$property('SetIcon'))(this._options);
    }
}

export class ShowPageAction extends Action {
    $create(api) {
        return new (api.$property('ShowPageAction'))();
    }
}

// endregion

// region Conditions

class Condition { }

export class PageStateMatcher extends Condition {
    constructor(options) {
        super();

        this._options = options;
    }

    $create(api) {
        return new (api.$property('PageStateMatcher'))(this._options);
    }
}

// endregion

class DeclarativeContentEvent extends DeclarativeEvent {
    addRules(rules) {
        return this._createRules(rules).then((rules) =>
            super.addRules(rules)
        );
    }

    _createRules(rules) {
        return Promise.resolve().then(() => Map(rules, (rule) => {
            if(IsNil(rule) || !IsPlainObject(rule)) {
                throw new Error(`Invalid rule: ${rule}`);
            }

            if(IsNil(rule.actions) || !Array.isArray(rule.actions)) {
                throw new Error(`Invalid actions: ${rule.actions}`);
            }

            if(IsNil(rule.conditions) || !Array.isArray(rule.conditions)) {
                throw new Error(`Invalid conditions: ${rule.conditions}`);
            }

            if(rule.actions.length < 1) {
                throw new Error('At least one action is required');
            }

            if(rule.conditions.length < 1) {
                throw new Error('At least one condition is required');
            }

            return {
                ...Pick(rule, [
                    'id',
                    'priority',
                    'tags'
                ]),

                // Create actions
                actions: Map(rule.actions, (action) => {
                    if(!(action instanceof Action)) {
                        throw new Error(`Invalid action: ${action}`);
                    }

                    return action.$create(this.$api);
                }),

                // Create conditions
                conditions: Map(rule.conditions, (condition) => {
                    if(!(condition instanceof Condition)) {
                        throw new Error(`Invalid condition: ${condition}`);
                    }

                    return condition.$create(this.$api);
                })
            };
        }));
    }
}

export class DeclarativeContent extends Base {
    static Title = 'DeclarativeContent';

    static Name = 'declarativeContent';
    static Compatibility = DeclarativeContentCompatibility;

    constructor(options = null) {
        super(options);

        // region Events

        this.onPageChanged = new DeclarativeContentEvent(this, 'onPageChanged');

        // endregion
    }
}

export {
    DeclarativeContentCompatibility
};

export default new DeclarativeContent();
