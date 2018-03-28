

declare var FBInstant;

import "../../lib/fbinstant";
FBInstant = window["FBInstant"];
export class Bridge {
    private static instance: any = null;
    _adapter;
    private constructor() {
        // do something construct...
        //this._adapter = new Bus();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = FBInstant;
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
} 