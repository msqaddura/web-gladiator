export interface Interactive{
    _registeredHIDEvents:Object,
    listenToHIDEvents(isInteractive:boolean);
    registerHIDEvent(name:string):Object,
}