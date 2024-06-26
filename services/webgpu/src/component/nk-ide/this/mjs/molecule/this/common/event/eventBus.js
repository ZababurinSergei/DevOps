import { EventEmitter } from './../../../this/common/event/eventEmitter';
export const EventBus = new EventEmitter();
export class GlobalEvent {
    /**
     * Subscribe the service event
     * @param name Event name
     * @param listener Listener function
     */
    subscribe(name, listener) {
        EventBus.subscribe(name, listener);
    }
    /**
     * Emit the service event
     * @param name Event name
     * @param args Arguments
     */
    emit(name, ...args) {
        EventBus.emit(name, ...args);
    }
    /**
     * Count the service event
     * @param name Event name
     */
    count(name) {
        return EventBus.count(name);
    }
    /**
     * Unsubscribe the specific event and the listener function
     * @param name The event name
     * @param listener optional, it unsubscribes events via name if not pass the listener function
     */
    unsubscribe(name, listener) {
        EventBus.unsubscribe(name, listener);
    }
}
