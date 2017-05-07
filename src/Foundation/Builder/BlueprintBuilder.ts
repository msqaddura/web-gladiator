//not to confuse with the name... this more like parser/iterator
import { WGObject } from '../Core/WGObject';
import { WGObjectBuilder } from './WGObjectBuilder';

import { GameObject } from '../Core/GameObject';
import { GameObjectBuilder } from './GameObjectBuilder';

export class BlueprintBuilder {
    private static instance: BlueprintBuilder;
    
    _registerObjects={};
    static getInstance() {
        if (!this.instance) {
            this.instance = new BlueprintBuilder();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }

    registerObject(ctorName,ctor){
        this._registerObjects[ctorName]=ctor;
    }
    createAndAddObject(owner,blueprint,bootstrap=true){
        let obj = this.createObject(owner,blueprint,bootstrap);
        owner.addNode(obj)
        return obj;
    }
    createObject(owner,blueprint,bootstrap=true){
        let builder = null;

        if (GameObject.isPrototypeOf(blueprint.ctor))
            builder = GameObjectBuilder.getInstance()
        else if(WGObject.isPrototypeOf(blueprint.ctor))
            builder = WGObjectBuilder.getInstance()
        else 
            throw new Error('congrats bitch!');

        return builder.createObject(owner,blueprint,bootstrap);
    }
    
} 