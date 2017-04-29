import * as Rx from 'rxjs';
import { Bus } from "./Bus"
//extends Facade
export class EventFacade {
    private static instance: EventFacade;
    _adapter;
    private constructor() {
        // do something construct...
        //this._adapter = new Bus();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EventFacade();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    use(adapter){
        this._adapter = adapter;
    }
    registerMessage(ctor){
        return this._adapter.registerMessage(ctor);
    }
    sendMessage(obj){
        this._adapter.sendMessage(obj);
    }
} 