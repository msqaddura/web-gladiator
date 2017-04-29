import * as Rx from 'rxjs';
//makes no sense here 
export class Bus{
    _registeredMessages={}
    
    registerMessage(ctor){
        if(!this._registeredMessages[ctor.name])
            this._registeredMessages[ctor.name]= new Rx.Subject();
        return this._registeredMessages[ctor.name];
    }


    sendMessage(obj){
        this._registeredMessages[obj.constructor.name].next(obj);
    }

}