import { fromEvent, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export class DeviceAdapter {
  resizeObs: Subject<object> = new Subject();
  constructor() {
    // do something construct...
    fromEvent(window, "resize")
      .pipe(debounceTime(100))
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
