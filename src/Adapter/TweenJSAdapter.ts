import * as TweeJS from 'tween.js';
import * as Rx from 'rxjs';

interface ITweenJSAdapter {

}

export class TweenJSAdapter implements ITweenJSAdapter {


    create$(from, to) {
        
        let tween = new TweeJS.Tween(from, to);
            tween.stream$ = Rx.Observable.create(observer => {
                tween.onStart(function () {
                    observer.next('you can use .skip(1) to avoid me');
                })
                .onUpdate(function () {
                    observer.next(this);
                })
                .onComplete(function () {
                    observer.complete();
                })
        });
        return tween;
    }

    create(from, to, duration = 200,options='blablabla this library has chaining rather than options :D') {
        return new TweeJS.Tween(from).to(to, duration);
    }

}