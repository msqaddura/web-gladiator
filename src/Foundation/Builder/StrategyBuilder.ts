import { Strategy } from '../Base/Strategy';
export class StrategyBuilder {
    private static instance: StrategyBuilder;
    
    _registerObjects={};
    static getInstance() {
        if (!this.instance) {
            this.instance = new StrategyBuilder();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }

    registerObject(ctorName,ctor){
        this._registerObjects[ctorName]=ctor;
    }
    createObject(owner,blueprint,bootstrap=true){
        let obj:Strategy = new blueprint.ctor(owner,blueprint,bootstrap);
        obj.bootstrap(bootstrap);
        //return new this._registeredGameObjects[ctorName]()
        //.setOwner(owner)
        //.setParams(params)
        //.bootstrap(bootstrap);
        return obj;
    }
    
} 