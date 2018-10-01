import * as Rx from "rxjs";
import { DeviceAdapter } from "./DeviceAdapter";
export class DeviceSystem {
    static getInstance() {
        if (!this.instance) {
            this.instance = new DeviceSystem();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    private static instance: DeviceSystem;
    _adapter = null;
    private constructor() {
        // do something construct...
    }
    use(adapter) {
        this._adapter = adapter;
    }
    getResizeObs() {
        return this._adapter.getResizeObs();
    }
}

export let deviceSystem = DeviceSystem.getInstance();
