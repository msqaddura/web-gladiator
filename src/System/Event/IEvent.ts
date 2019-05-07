import { Observable } from "rxjs";

export interface IEvent {
  registeredEvents: { [key: string]: Observable<any> };
  listenToBusEvents();
  registerEvent(ctor);
  sendEvent(obj);
}
