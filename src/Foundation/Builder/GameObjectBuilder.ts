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
    createGameObject(ctor,owner,params,bootstrap=true){
        let gameObject = new ctor(owner,params,bootstrap);
        //return new this._registeredGameObjects[ctorName]()
        //.setOwner(owner)
        //.setParams(params)
        //.bootstrap(bootstrap);
        return gameObject;
    }
    
} 