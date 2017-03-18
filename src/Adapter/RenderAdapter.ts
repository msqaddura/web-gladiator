import * as AutoLayout from 'autolayout';
import * as Rx from 'rxjs';

export class RenderAdapter {
    private static instance: RenderAdapter;
    resizeObs:Rx.Subject<Object> = new Rx.Subject();
    private constructor() {
        // do something construct...
        Rx.Observable.fromEvent(window,"resize").debounceTime(100).subscribe(()=>{
            const width = window.innerWidth;
            const height = window.innerHeight;
            this.resizeObs.next({width,height});
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RenderAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    getResizeObs(){
        return this.resizeObs;
    }
} 