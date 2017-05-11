import { Entity } from '../../Entity/Entity';
import * as Rx from 'rxjs';
import { StateMachine } from '../../Foundation/Base/StateMachine';
  
export class Button extends Entity{
    
    executeStateMachine() {
        const stateMap = {
            initial: 'idle',
            events: [
                { name: 'pointerover', from: ['idle','tapped'], to: 'hover' },
                { name: 'pointerout', from: ['active','hover'], to: 'idle' },
                { name: 'pointertap', from: ['hover','active'], to: 'tapped' },
                { name: 'pointerdown', from:'hover',to:'active'},
                { name: 'pointerup', from:['active','tapped'],to:'hover'},
                { name: 'disabled', from:'*',to:'idle'}
            ],
            callbacks: {
                onidle: this.onIdle.bind(this),
                onhover: this.onHover.bind(this), 
                ontapped: this.onTapped.bind(this), 
                onactive: this.onActive.bind(this)
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
        this.registerHIDEvent('pointerdown').do(e => this._fsm.token.pointerdown(e)),
        )
        .subscribe(data=>{
            this._handleEvent(data);
        })
    }
    protected onIdle(...args){
        console.info("QQQonIdle");
    }
    protected onHover(...args){
        console.info("QQQonHover");
    }
    protected onTapped(...args){
        console.info("QQQonTapped");
        this._fsm.token.pointerup();
    }
    protected onActive(...args){
        console.info("QQQonActive")
    }
    _handleEvent(data){
        //console.info("Handled");
    }
}