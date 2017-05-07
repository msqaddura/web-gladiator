import { IWGObject } from './IWGObject';
import { Composite } from './Composite';

import { WGObjectBuilder } from '../Builder/WGObjectBuilder';


export class WGObject extends Composite implements IWGObject{
    
    readonly blueprint;
    readonly blueprints;
    readonly repeatableBlueprints;
    
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



    start(){
        
    }
}