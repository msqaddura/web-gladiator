/**
 * Right now it is Called NodeX bcz Node is NodeJS
 * This is the topmost Object in WebGLadiator, however it is used for workarounds
 * adding IEvent and IStateFull is more or less a workaround here but that is more than fine....for now
 */

import { INode } from './INode';
import { IEvent } from '../../Engine/Event/IEvent';
import { EventFacade } from '../../Engine/Event/EventFacade';
import { IStateMachine } from '../Base/IStateMachine';

export class NodeX implements INode, IEvent,IStateMachine{
    readonly owner: Node;
    readonly name:string;
    _stateMachine;
    registeredEvents={};
    constructor(owner=null,name="NoNameGiven") {
        this.owner = owner;
        this.name = name;
    }
    listenToBusEvents(){}

    registerEvent(ctor){
        this.registeredEvents[ctor.name] = EventFacade.getInstance().registerEvent(ctor)
        return this.registeredEvents[ctor.name];
    }
    sendEvent(obj){
        EventFacade.getInstance().sendEvent(obj);
    }
    executeStateMachine(){
        
    }
    destroy(){
        for (const key in this.registeredEvents){
            this.registeredEvents[key].unsubscribe();
            delete this.registeredEvents[key];
        }     
    }
}