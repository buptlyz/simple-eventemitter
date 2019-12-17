class EventEmitter {
    private events: Map<string, Set<Function>>;

    constructor() {
        this.events = new Map();
        this.on = this.on.bind(this)
        this.off = this.off.bind(this)
        this.emit = this.emit.bind(this)
    }

    on(event: string, listener: Function) {
        if (typeof listener !== 'function') {
            throw new TypeError('The listener must be a function')
        }
        let listeners = this.events.get(event);
        if (!listeners) {
            listeners = new Set()
            this.events.set(event, listeners)
        }
        listeners.add(listener)
        return this
    }

    off(event?: string, listener?: Function) {
        if (!arguments.length) {
            this.events.clear()
        } else if (arguments.length === 1) {
            this.events.delete(event)
        } else {
            const listeners = this.events.get(event)
            if (listeners) {
                listeners.delete(listener)
            }
        }
        return this
    }

    emit(event: string, ...args) {
        const listeners = this.events.get(event)
        if (listeners) {
            for (const listener of listeners) {
                listener.apply(this, args)
            }
        }
        return this
    }
}

export default EventEmitter