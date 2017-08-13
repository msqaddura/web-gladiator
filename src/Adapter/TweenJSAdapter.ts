import * as TweenJS from 'tween.js';
import * as Rx from 'rxjs';
import * as PIXI from 'pixi.js';


interface ITweenJSAdapter {

}

export class TweenJSAdapter implements ITweenJSAdapter {

    constructor() {
        requestAnimationFrame(animate);

        function animate(time) {


            requestAnimationFrame(animate);
            TweenJS.update(time);
        }
        // PIXI.ticker.shared.add(function(deltaTime){
        //     TweenJS.update(deltaTime);
        // })
    }
    create$({ from = null, to = null, duration = 200, delay = 0, repeat = 0, yoyo = false }) {

        let tween = this.createNew({ from, to, duration, delay, repeat, yoyo });
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

    create(from, to, duration = 200, options = 'blablabla this library has chaining rather than options :D') {
        return new TweenJS.Tween(from).to(to, duration);
    }

    createNew({ from = {}, to = {}, duration = 200, delay = 0, repeat = 0, yoyo = false }) {
        return new TweenJS.Tween(from).to(to, duration).repeat(repeat).yoyo(yoyo).delay(delay);
    }
    fadeIn(target, duration = 200) {
        let tween = this.createNew({
            from: { alpha: target.alpha },
            to: { alpha: 1 },
            duration
        }).onUpdate(function(){
            target.alpha = this.alpha;
        })
        return tween.start();
    }

    fadeOut(target, duration = 200) {
        let tween = this.createNew({
            from: { alpha: target.alpha },
            to: { alpha: 0.2 },
            duration
        }).onUpdate(function(){
            target.alpha = this.alpha;
        })
        return tween.start();
    }

}