import { EventEmitter } from './../../../this/common/event/eventEmitter';
export declare const EventBus: EventEmitter;
export declare abstract class GlobalEvent {
    /**
     * Subscribe the service event
     * @param name Event name
     * @param listener Listener function
     */
    subscribe(name: string | string[], listener: Function): void;
    /**
     * Emit the service event
     * @param name Event name
     * @param args Arguments
     */
    emit(name: string, ...args: any): void;
    /**
     * Count the service event
     * @param name Event name
     */
    count(name: string): number;
    /**
     * Unsubscribe the specific event and the listener function
     * @param name The event name
     * @param listener optional, it unsubscribes events via name if not pass the listener function
     */
    unsubscribe(name: any, listener?: Function): void;
}
