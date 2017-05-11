import * as Rx from 'rxjs';
//shouldnt this be animation system
export class TweenSystem {
    private static instance: TweenSystem;
    _adapter = null;
    private constructor() {
        // do something construct...
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new TweenSystem();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    use(adapter){
        this._adapter = adapter;
    }
    create(from,to,duration){
        return this._adapter.create(from,to,duration);
    }
} 
