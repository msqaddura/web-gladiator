/**
 * Right now it is Called NodeX bcz Node is NodeJS
 * This is the topmost Object in WebGLadiator, however it is used for workarounds
 * adding IEvent and IStateFull is more or less a workaround here but that is more than fine....for now
 */

import { IEvent } from '../../System/Event/IEvent';
import { EventSystem } from '../../System/Event/EventSystem';
import { IStateMachine } from '../Base/IStateMachine';
import * as RX from 'rxjs';

export interface INode{
    readonly owner: Node;
    readonly name:string;
    kill();
}

export class NodeX implements INode, IEvent,IStateMachine{
    readonly owner: Node;
    readonly name:string;
    _fsm;
    registeredEvents={};
    isActive;
    constructor(owner=null,name="NoNameGiven") {
        this.owner = owner;
        this.name = name;
        this.isActive = true;
    }
    bootstrap(bootstrap=true){
        if(bootstrap == false) return;
        this.executeStateMachine();
        this.listenToBusEvents();
    }
    listenToBusEvents(){}

    registerEvent(ctor){
        this.registeredEvents[ctor.name] = EventSystem.getInstance().registerEvent(ctor)
        return this.registeredEvents[ctor.name].takeWhile(()=>this.isActive)
    }
    sendEvent(obj){
        EventSystem.getInstance().sendEvent(obj);
    }
    executeStateMachine(){
        
    }
    //when she mentions boys
    kill(){
        this.isActive = false;
        for (const key in this.registeredEvents){
            delete this.registeredEvents[key];
        }     
    }
}