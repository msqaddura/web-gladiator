import * as Rx from 'rxjs';
import { DeviceAdapter } from "./DeviceAdapter"
export class DeviceFacade {
    private static instance: DeviceFacade;
    _deviceAdapter:DeviceAdapter;
    private constructor() {
        // do something construct...
        this._deviceAdapter = new DeviceAdapter();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DeviceFacade();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    getResizeObs(){
        return this._deviceAdapter.getResizeObs();
    }
} 