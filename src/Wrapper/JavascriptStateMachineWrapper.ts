import * as JavascriptStateMachine from 'javascript-state-machine';
import * as Rx from 'rxjs';

interface IStateMachineWrapper {
    token;
    _stream;
    getStream();
}

export class JavascriptStateMachineWrapper implements IStateMachineWrapper{
    public token;
    _stream;
    constructor({initial,events,callbacks}, stream=false){
        this.token = JavascriptStateMachine.create({initial,events,callbacks});
        this._stream = new Rx.Subject().startWith(initial); 
        
        if(stream){
            this.token.onenterstate = function(event,from,to){
                this._stream.next({event,from,to});
            }
        }  
    }

    getStream(){
        return this._stream;
    }

    goToState(){}
}