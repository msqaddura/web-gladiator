import * as Rx from 'rxjs';
import { ScaleContainer } from "../Component/Primitive/ScaleContainer";
import { CellPlayedMessage } from './CellPlayedMessage'
const STATES = {
    ENABLED: "ENABLED",
    DISABLED: "DISABLED",
    PLAYED:"PLAYED"
}
export class Cell extends ScaleContainer {
    i;
    j;
    stateMachine;
    constructor(owner, params, bootstrap = false) {
        super(owner, params);
        this.i = params.i;
        this.j = params.j;
        this.stateMachine = new Rx.Subject();
        this.stateMachine.next(STATES.DISABLED)
        this.bootstrap(bootstrap);
        this.attachStateMachine();
    }

    attachStateMachine() {
        this.stateMachine.subscribe(value => {
            switch (value) {
                case STATES.DISABLED:
                    this.$interactive = false;
                    break;
                case STATES.ENABLED:
                    this.$interactive = true;
                    break;
                case STATES.SELECTED:
                    this.$interactive = false;
                    break;
            }
        })
    }
    listenToHIDEvents() {
        super.listenToHIDEvents(true);
        this.registerHIDEvent('pointertap').subscribe((value) => {
            this.stateMachine.next(STATES.PLAYED);
            this.sendMessage(new CellPlayedMessage(this, this.i, this.j));
        });
    }
    listenToBusEvents() {
        super.listenToBusEvents();
        // let box = this.registerMessage(MyMessage).subscribe(data => {
        //     console.info(data);
        // });
        // console.info(box);
    }

    test() {
        // console.info("sending");
        // this.sendMessage(new MyMessage());
        // console.info("sent");
        // console.info(this._scene._bus);
    }
}