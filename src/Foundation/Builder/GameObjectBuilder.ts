import { View } from '../Core/View';
export class GameObjectBuilder {
    private static instance: GameObjectBuilder;
    
    _registeredGameObjects={};
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameObjectBuilder();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }

    registerGameObject(ctorName,ctor){
        this._registeredGameObjects[ctorName]=ctor;
    }
    
    createObject(owner,blueprint,bootstrap=true){
        let obj:View = new blueprint.ctor(owner,blueprint);
        obj.bootstrap(bootstrap);
        obj.initialize();
        // if(bootstrap){
        //     obj.preCreateTree();
        //     obj.createTree();
        //     obj.postCreateTree();
        //     obj.listenToBusEvents();
        //     obj.listenToHIDEvents(false);
        //     obj.start();
        // }
        //return new this._registeredGameObjects[ctorName]()
        //.setOwner(owner)
        //.setParams(params)
        //.bootstrap(bootstrap);
        return obj;
    }
    
} 