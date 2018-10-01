import * as StateMachine from "javascript-state-machine";
import * as Rx from "rxjs";

interface IStateMachineWrapper {
    token;
}

export class JavascriptStateMachineWrapper extends StateMachine implements IStateMachineWrapper {
    public token;
    constructor(init, transitions, methods, data) {
        super({ init, transitions, methods, data });
    }

}
