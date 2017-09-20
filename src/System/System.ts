//Multition holding many singletons
import { ResourceSystem } from './Resource/ResourceSystem';
import { LayoutSystem} from './Layout/LayoutSystem';
import { NetSystem} from './Net/NetSystem';
import { EventSystem } from './Event/EventSystem';
import { DeviceSystem} from './Device/DeviceSystem';
import { TweenSystem } from './Tween/TweenSystem';
import { SoundSystem } from './Sound/SoundSystem';
import { GraphicsSystem } from './Graphics/GraphicsSystem';
export class System  {
    static instance: System;
    target;
    _instances={
        net:NetSystem.getInstance(),
        resource:ResourceSystem.getInstance(),
        layout:LayoutSystem.getInstance(),
        event:EventSystem.getInstance(),
        device:DeviceSystem.getInstance(),
        tween:TweenSystem.getInstance(),
        sound:SoundSystem.getInstance(),
        graphics:GraphicsSystem.getInstance()
    }
    static get Graphics():GraphicsSystem{
        return this.getInstance().getSystem("graphics");
    }
    static get Net():NetSystem{
        return this.getInstance().getSystem("net");
    }
    setTarget(target){
        this.target=target;
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new System();
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