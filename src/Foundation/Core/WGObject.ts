import { IWGObject } from './IWGObject';
import { Composite } from './Composite';

import { WGObjectBuilder } from '../Builder/WGObjectBuilder';
import { IEvent } from '../../Engine/Event/IEvent';
import { EventFacade } from '../../Engine/Event/EventFacade';

export class WGObject extends Composite implements IWGObject,IEvent{
    readonly owner: WGObject;
    readonly name:string;
    readonly blueprint;
    readonly blueprints;
    readonly repeatableBlueprints;
    registeredEvents={};
    constructor(owner=null,{name="N/A", blueprints=[],repeatableBlueprints=[]}) {
        super(owner,name);
        this.blueprints = blueprints;
        this.repeatableBlueprints = repeatableBlueprints;
    }

    bootstrap(bootstrap){
        if(!bootstrap)
            return;
        this.initialize();

    }

    initialize(){}

    preCreateTree(){};
    createTree(bootstrap=true){
        this.repeatableBlueprints.forEach(tuple=>{ 
            tuple.repeats.forEach(repeat=>{ 
                this.addNode(this.createNode(Object.assign(tuple.repeatable,repeat),bootstrap)); 
            }) 
        }); 
        this.blueprints.forEach(blueprint=>{
            if(!!!blueprint.lazy)
                this.addNode(this.createNode(blueprint,bootstrap));
        });
    }
    postCreateTree(){};


    createNode(blueprint,bootstrap = true){
        return WGObjectBuilder.getInstance().createObject(this,blueprint,bootstrap);
    }

    listenToBusEvents(){}

    registerEvent(ctor){
        this.registeredEvents[ctor.name] = EventFacade.getInstance().registerEvent(ctor)
        return this.registeredEvents[ctor.name];
    }
    sendEvent(obj){
        EventFacade.getInstance().sendEvent(obj);
    }

    start(){
        
    }

    destroy(){
        for (const key in this.registeredEvents){
            this.registeredEvents[key].unsubscribe();
            delete this.registeredEvents[key];
        }
        super.destroy();
    }
}