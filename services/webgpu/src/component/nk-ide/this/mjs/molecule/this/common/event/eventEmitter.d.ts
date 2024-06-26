export interface ListenerEventContext {
    stopDelivery: () => void;
}
export declare class EventEmitter {
    private _events;
    count(name: string): number;
    emit(name: string, ...args: any[]): void;
    subscribe(name: string | string[], listener: Function): void;
    unsubscribe(name: string | string[], listener?: Function): void;
    deleteEvent(name: string, listener?: Function): void;
    assignEvent<T>(name: string, listener: Function): void;
}
