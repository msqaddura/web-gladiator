import * as Rx from 'rxjs';
import { DeviceAdapter } from "./DeviceAdapter"
export class DeviceFacade {
    private static instance: DeviceFacade;
    _adapter = null;
    private constructor() {
        // do something construct...
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DeviceFacade();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    use(adapter){
        this._adapter = adapter;
    }
    getResizeObs(){
        return this._adapter.getResizeObs();
    }
} 
