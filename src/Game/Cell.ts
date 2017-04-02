import * as Rx from 'rxjs';
import { ScaleContainer } from "../Component/Primitive/ScaleContainer";
import { CellPlayedMessage } from './CellPlayedMessage';
import { GameDataSource } from "./GameDataSource";
const STATES = {
    UNDONE:"UNDONE",
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
        this.stateMachine = new Rx.ReplaySubject(1);
        this.stateMachine.next(STATES.UNDONE);
        this.bootstrap(bootstrap);
        this.attachStateMachine();
    }

    initialize(){
        GameDataSource.getInstance().obsData
        .map(data=>data.matrix[this.i][this.j])
        .subscribe(value=>{
            this.stateMachine.next(value.state);
        })
    }
    attachStateMachine() {
        this.stateMachine.subscribe(value => {
            switch (value) {
                case STATES.DISABLED:
                    //this.$visible = false;
                    break;
                case STATES.ENABLED:
                    this.components["animatedSprite"].gotoAndStop(20);
                    break;
                case STATES.PLAYED:
                    this.components["animatedSprite"].gotoAndStop(30);
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