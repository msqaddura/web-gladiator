export interface IEvent{
    registeredEvents;
    listenToBusEvents();
    registerEvent(ctor)
    sendEvent(obj)
}