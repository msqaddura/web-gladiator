// Multition holding many singletons
import { DeviceSystem } from "./Device/DeviceSystem";
import { EventSystem } from "./Event/EventSystem";
import { GraphicsSystem } from "./Graphics/GraphicsSystem";
import { LayoutSystem } from "./Layout/LayoutSystem";
import { NetSystem } from "./Net/NetSystem";
import { ResourceSystem } from "./Resource/ResourceSystem";
import { SoundSystem } from "./Sound/SoundSystem";
import { TweenSystem } from "./Tween/TweenSystem";
export class System {

    static get Graphics(): GraphicsSystem {
        return this.getInstance().getSystem("graphics");
    }
    static get Net(): NetSystem {
        return this.getInstance().getSystem("net");
    }
    static instance: System;
    static net = NetSystem.getInstance();
    static resource = ResourceSystem.getInstance();
    static layout = LayoutSystem.getInstance();
    static event = EventSystem.getInstance();
    static device = DeviceSystem.getInstance();
    static tween = TweenSystem.getInstance();
    static sound = SoundSystem.getInstance();
    static graphics = GraphicsSystem.getInstance();
    static getInstance() {
        if (!this.instance) {
            this.instance = new System();
            // this.instance._adapter = new SocketIOAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    target;
    _instances = {
        net: NetSystem.getInstance(),
        resource: ResourceSystem.getInstance(),
        layout: LayoutSystem.getInstance(),
        event: EventSystem.getInstance(),
        device: DeviceSystem.getInstance(),
        tween: TweenSystem.getInstance(),
        sound: SoundSystem.getInstance(),
        graphics: GraphicsSystem.getInstance()
    };
    setTarget(target) {
        this.target = target;
    }
    getSystem(systemName) {
        return this._instances[systemName];
    }

    registerFacade(systemName, facade) {
        this._instances[systemName] = facade;
    }
    useAdapter(systemName, adapter) {
        this._instances[systemName].use(adapter);
    }
    // Have to choose between DI & IoC.. otherwise will have to document
    inject(dependencies) {
        for (const key in dependencies) {
            if (dependencies.hasOwnProperty(key)) {
                this.useAdapter(key, dependencies[key]);
            }
        }
    }

}
