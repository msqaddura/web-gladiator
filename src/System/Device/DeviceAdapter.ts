import * as Rx from "rxjs";

export class DeviceAdapter {

    resizeObs: Rx.Subject<object> = new Rx.Subject();
    constructor() {
        // do something construct...
        Rx.Observable.fromEvent(window, "resize")
            .debounceTime(100)
            .subscribe(() => {
                const width = window.innerWidth;
                const height = window.innerHeight;
                this.resizeObs.next({ width, height });
            });
    }
    getResizeObs() {
        return this.resizeObs;
    }
}
