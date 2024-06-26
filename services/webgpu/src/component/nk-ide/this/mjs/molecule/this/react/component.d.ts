import { GlobalEvent } from './../../this/common/event';
export declare enum ComponentEvents {
    Update = "Component.Update"
}
export interface IComponent<S = any> {
    /**
     * Set the Component state
     * @param values The next values of state
     * @param callback calling after setState
     */
    setState(values: S, callback?: (prevState: S, nextState: S) => void): void;
    /**
     * Trigger the Component update event
     * @param nextState
     */
    render(nextState?: S): void;
    /**
     * Listen to the Component state update event
     * @param listener
     */
    onUpdateState(listener: (prevState: S, nextState: S) => void): void;
    /**
     * Remove the Component update event listening, default is remove all,
     * also you can remove one by pass the listener
     */
    removeOnUpdateState(listener?: Function): void;
    /**
     * Force to update the Component
     */
    forceUpdate(): void;
    /**
     * Get the Component state
     */
    getState(): S;
}
export declare abstract class Component<S = any> extends GlobalEvent implements IComponent<S> {
    protected abstract state: S;
    private _event;
    constructor();
    /**
     * Set the state values, and notify the view component to re render
     * @param values update target state values
     */
    setState(values: Partial<S>, callback?: (prevState: S, nextState: S) => void): void;
    /**
     * Initiative notify the component to render the view by the state
     * @param nextState
     */
    render(nextState?: S): void;
    onUpdateState(listener: (prevState: S, nextState: S) => void): void;
    removeOnUpdateState(listener?: Function): void;
    forceUpdate(): void;
    getState(): S;
}
