import { cloneDeep } from 'lodash';
import { EventEmitter, GlobalEvent } from './../../this/common/event';
export var ComponentEvents;
(function (ComponentEvents) {
    ComponentEvents["Update"] = "Component.Update";
})(ComponentEvents || (ComponentEvents = {}));
export class Component extends GlobalEvent {
    constructor() {
        super();
        this._event = new EventEmitter();
    }
    /**
     * Set the state values, and notify the view component to re render
     * @param values update target state values
     */
    setState(values, callback) {
        const nextState = Object.assign(this.state, values);
        this.render(nextState);
        callback === null || callback === void 0 ? void 0 : callback(this.state, nextState);
    }
    /**
     * Initiative notify the component to render the view by the state
     * @param nextState
     */
    render(nextState) {
        this._event.emit(ComponentEvents.Update, this.state, nextState);
    }
    onUpdateState(listener) {
        this._event.subscribe(ComponentEvents.Update, listener);
    }
    removeOnUpdateState(listener) {
        this._event.unsubscribe(ComponentEvents.Update, listener);
    }
    forceUpdate() {
        this.setState(cloneDeep(this.state));
    }
    getState() {
        return this.state;
    }
}
