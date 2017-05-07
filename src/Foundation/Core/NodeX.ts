import { INode } from './INode';
import { IEvent } from '../../Engine/Event/IEvent';
import { EventFacade } from '../../Engine/Event/EventFacade';

export class NodeX implements INode, IEvent{
    readonly owner: Node;
    readonly name:string;
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
    destroy(){
        for (const key in this.registeredEvents){
            this.registeredEvents[key].unsubscribe();
            delete this.registeredEvents[key];
        }     
    }
}