import * as Rx from "rxjs";
// shouldnt this be animation system
export class SoundSystem {
    static getInstance() {
        if (!this.instance) {
            this.instance = new SoundSystem();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    private static instance: SoundSystem;
    _adapter = null;
    private constructor() {
        // do something construct...
    }
    use(adapter) {
        this._adapter = adapter;
    }
    play(name) {
        return this._adapter.play(name);
    }
}
