import * as Rx from 'rxjs';
//makes no sense here 
export class Bus{
    _registeredEvents={}
    
    registerEvent(ctor){
        if(!this._registeredEvents[ctor.name])
            this._registeredEvents[ctor.name]= new Rx.Subject();
        return this._registeredEvents[ctor.name];
    }


    sendEvent(obj){
        this._registeredEvents[obj.constructor.name].next(obj);
    }

}