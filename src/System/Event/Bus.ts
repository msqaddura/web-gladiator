import * as Rx from "rxjs";
// makes no sense here
export class Bus {
    registeredEvents= {};

    registerEvent(ctor) {
        if (!this.registeredEvents[ctor.uName]) {
            this.registeredEvents[ctor.uName] = new Rx.Subject();
        }
        return this.registeredEvents[ctor.uName].asObservable();
    }

    sendEvent(obj) {
        this.registeredEvents[obj.name].next(obj);
    }

}
