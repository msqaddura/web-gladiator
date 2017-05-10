export interface IHID{
    _registeredHIDEvents:Object,
    listenToHIDEvents(isInteractive:boolean);
    registerHIDEvent(name:string):Object,
}