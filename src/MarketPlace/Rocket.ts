import * as Rx from 'rxjs';

import { AnimatedSprite } from '../Component/Primitive/AnimatedSprite';

class MyMessage {
    data = 123;
    constructor()
    { }
}

export class Rocket extends AnimatedSprite {
    constructor(owner, params, bootstrap = false) {
        super(owner, params);
        
        this.bootstrap(bootstrap);
    }

    listenToHIDEvents() {
        super.listenToHIDEvents(true);

        Rx.Observable.merge(
            this.registerHIDEvent('mouseover').mapTo(true),
            this.registerHIDEvent('mouseout').mapTo(false)
        ).debounceTime(20).startWith(false)

            .subscribe((value) => {
                if (value)
                    this.play();
                else
                    this.stop();
            })

    }
    listenToBusEvents() {
        super.listenToBusEvents();
        let box = this.registerMessage(MyMessage).subscribe(data => {
            console.info(data);
        });
        console.info(box);
    }

    test() {
        console.info("sending");
        this.sendMessage(new MyMessage());
        console.info("sent");
        console.info(this._scene._bus);
    }
}