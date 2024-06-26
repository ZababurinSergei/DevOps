export class EventEmitter {
    constructor() {
        this._events = new Map();
    }
    count(name) {
        const events = this._events.get(name) || [];
        return events.length;
    }
    emit(name, ...args) {
        const events = this._events.get(name);
        if (events && events.length > 0) {
            let continued = true;
            // call in descending order
            for (let index = events.length - 1; index >= 0; index--) {
                if (continued) {
                    const evt = events[index];
                    evt.call({
                        stopDelivery: () => (continued = false),
                    }, ...args);
                }
            }
        }
    }
    subscribe(name, listener) {
        if (Array.isArray(name)) {
            name.forEach((key) => {
                this.assignEvent(key, listener);
            });
        }
        else {
            this.assignEvent(name, listener);
        }
    }
    unsubscribe(name, listener) {
        if (Array.isArray(name)) {
            name.forEach((key) => {
                this.deleteEvent(key, listener);
            });
        }
        else {
            this.deleteEvent(name, listener);
        }
    }
    deleteEvent(name, listener) {
        if (listener) {
            const event = this._events.get(name);
            if (event) {
                event.splice(event.indexOf(listener), 1);
            }
        }
        else {
            this._events.delete(name);
        }
    }
    assignEvent(name, listener) {
        const event = this._events.get(name);
        if (event) {
            event.push(listener);
        }
        else {
            this._events.set(name, [listener]);
        }
    }
}
