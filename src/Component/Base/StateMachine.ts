import * as Rx from "rxjs";
export class StateMachine {
   state;
   _states;
   constructor(states, defaultState){
        this._states=states;
        this.state = defaultState;
   }
}