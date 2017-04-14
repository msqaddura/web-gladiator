
import { SocketIOAdapter } from './SocketIOAdapter';
export class NetFacade  {
    static instance: NetFacade;
    _adapter;
    static getInstance() {
        if (!this.instance) {
            this.instance = new NetFacade();
            this.instance._adapter = new SocketIOAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }

    getStream(){
        return this._adapter.getStream();
    }
    connect(url = 'http://localhost:3000'){
        this._adapter.connect(url);
    }
    
}