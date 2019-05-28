import { Observable, Subject } from "rxjs";

//extends Facade
export class EventSystem {
  static getInstance() {
    if (!this.instance) {
      this.instance = new EventSystem();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  private static instance: EventSystem;

  registeredEvents: { [key: string]: Subject<any> } = {};

  private constructor() {
    // do something construct...
    //this._adapter = new Bus();
  }

  registerEvent(ctor): Observable<any> {
    if (!this.registeredEvents[ctor.uName]) {
      this.registeredEvents[ctor.uName] = new Subject();
    }
    return this.registeredEvents[ctor.uName].asObservable();
  }

  sendEvent(obj) {
    if (this.registeredEvents[obj.name]) {
      this.registeredEvents[obj.name].next(obj);
    }
  }
}

export const eventSystem = EventSystem.getInstance();
