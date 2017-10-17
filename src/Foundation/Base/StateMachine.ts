import { JavascriptStateMachineWrapper } from '../../Wrapper/JavascriptStateMachineWrapper';
import * as Rx from 'rxjs';



export class StateMachine extends JavascriptStateMachineWrapper{

    constructor(init,transitions,methods,data=null){
        super(init,transitions,methods,data)
    }
}