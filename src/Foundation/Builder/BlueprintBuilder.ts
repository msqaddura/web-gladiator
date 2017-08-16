//not to confuse with the name... this more like parser/iterator
import { WGObject } from '../Core/WGObject';
import { WGObjectBuilder } from './WGObjectBuilder';
import { Strategy } from '../Base/Strategy';
import { View } from '../Core/View';
import { GameObjectBuilder } from './GameObjectBuilder';
import { StrategyBuilder } from './StrategyBuilder';
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
        //let builder = null;
        let obj = new blueprint.ctor(owner,blueprint);
        obj.bootstrap(bootstrap);
        return obj;
        // if (View.isPrototypeOf(blueprint.ctor))
        //     builder = GameObjectBuilder.getInstance()
        // else if(WGObject.isPrototypeOf(blueprint.ctor))
        //     builder = WGObjectBuilder.getInstance()
        // else if(Strategy.isPrototypeOf(blueprint.ctor))
        //     builder = StrategyBuilder.getInstance()
        // else 
        //      builder = GameObjectBuilder.getInstance()

        // return builder.createObject(owner,blueprint,bootstrap);
    }
    
} 