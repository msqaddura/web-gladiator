import { Entity } from '../../Entity/Entity';
import * as Rx from 'rxjs';
const STATES={
    DISABLED:0
}
class Button extends Entity{
    _stateMachine;
    _state;
    listenToHIDEvents() {
        super.listenToHIDEvents(true);
        Rx.Observable.merge(
        this.registerHIDEvent('pointertap').mapTo(event=>{return {event,state:"Tap"}}),
        this.registerHIDEvent('pointerdown').mapTo(event=>{return {event,state:"Down"}}),
        this.registerHIDEvent('pointerup').mapTo(event=>{return {event,state:"Up"}})
        )
        .filter(_ => this._state !== STATES.DISABLED )
        .subscribe(data=>{
            this._handleEvent(data);
        })
    }
    _handleEvent(data){
        const {event,state} = data;
        console.info(`Event ${event} Transits${this._state} to ${state}`);
    }
}