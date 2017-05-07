import { WGObject } from '../Core/WGObject';
export class WGObjectBuilder {
    private static instance: WGObjectBuilder;
    
    _registerObjects={};
    static getInstance() {
        if (!this.instance) {
            this.instance = new WGObjectBuilder();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }

    registerObject(ctorName,ctor){
        this._registerObjects[ctorName]=ctor;
    }
    createObject(owner,blueprint,bootstrap=true){
        let obj:WGObject = new blueprint.ctor(owner,blueprint,bootstrap);
        obj.initialize();
        if(bootstrap){
        obj.preCreateTree();
        obj.createTree();
        obj.postCreateTree();
        obj.listenToBusEvents();
        obj.start();
        }
        //return new this._registeredGameObjects[ctorName]()
        //.setOwner(owner)
        //.setParams(params)
        //.bootstrap(bootstrap);
        return obj;
    }
    
} 