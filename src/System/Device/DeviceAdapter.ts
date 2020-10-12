import { fromEvent, Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

export class DeviceAdapter {
  resizeObs: Subject<object> = new Subject();

  visibilityObs: Subject<boolean> = new Subject();
  constructor() {
    // do something construct...
    fromEvent(window, "resize")
      .pipe(debounceTime(100))
      .subscribe(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.resizeObs.next({ width, height });
      });

    this.visibilityObs.next(true);
    fromEvent(document, "visibilitychange").subscribe(() => {
      this.visibilityObs.next(document.visibilityState === "visible");
    });
  }
  getResizeObs() {
    return this.resizeObs;
  }

  getVisibilityObs() {
    return this.visibilityObs;
  }
}
