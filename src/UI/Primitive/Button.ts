import { Entity } from '../../Entity/Entity';
import * as Rx from 'rxjs';
import { StateMachine } from '../../Foundation/Base/StateMachine';
  
export class Button extends Entity{
    
    executeStateMachine() {
        const stateMap = {
            initial: 'idle',
            events: [
                { name: 'pointerover', from: ['idle','tapped'], to: 'hover' },
                { name: 'pointerout', from: 'hover', to: 'idle' },
                { name: 'pointertap', from: '*', to: 'tapped' }
            ],
            callbacks: {
                onidle: this.onIdle.bind(this),
                onhover: this.onHover.bind(this), 
                ontapped: this.onTapped.bind(this), 
            }
        }
        this._fsm = new StateMachine(stateMap);
    }
    listenToHIDEvents() {
        super.listenToHIDEvents(true);
        Rx.Observable.merge(
        this.registerHIDEvent('pointerover').do(e =>{ this._fsm.token.pointerover(e)}),
        this.registerHIDEvent('pointerout').do(e => this._fsm.token.pointerout(e)),
        this.registerHIDEvent('pointertap').do(e => this._fsm.token.pointertap(e)),
        )
        .subscribe(data=>{
            this._handleEvent(data);
        })
    }
    onIdle(...args){
        console.info("Idle now ;)",...args);
    }
    onHover(...args){
        console.info("Hovered now ;)",...args);
    }
    onTapped(...args){
        console.info("I am tapped",...args);
    }
    _handleEvent(data){
        console.info("Handled");
    }
}