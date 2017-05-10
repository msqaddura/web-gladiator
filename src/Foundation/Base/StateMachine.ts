import { JavascriptStateMachineWrapper } from '../../Wrapper/JavascriptStateMachineWrapper';
import * as Rx from 'rxjs';



export class StateMachine extends JavascriptStateMachineWrapper{

    constructor({initial,events,callbacks}, stream=false){
        super({initial,events,callbacks},stream)

    }

    getStream(){
        return this._stream;
    }
}