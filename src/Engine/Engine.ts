//Multition holding many singletons
import { ResourceFacade } from './Resource/ResourceFacade';
import { LayoutFacade } from './Layout/LayoutFacade';
import { NetFacade } from './Net/NetFacade';
import { EventFacade } from './Event/EventFacade';
import { DeviceFacade} from './Device/DeviceFacade';

export class Engine  {
    static instance: Engine;
    
    _instances={
        net:NetFacade.getInstance(),
        resource:ResourceFacade.getInstance(),
        layout:LayoutFacade.getInstance(),
        event:EventFacade.getInstance(),
        device:DeviceFacade.getInstance(),

    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Engine();
            //this.instance._adapter = new SocketIOAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    getSystem(systemName){
        return this._instances[systemName];
    }

    registerFacade(systemName,facade){
        this._instances[systemName]=facade;
    }
    useAdapter(systemName,adapter){
        this._instances[systemName].use(adapter);
    }
    //Have to choose between DI & IoC.. otherwise will have to document
    inject(dependencies){
        for (const key in dependencies){
            this.useAdapter(key,dependencies[key])
        }
    }
    
}