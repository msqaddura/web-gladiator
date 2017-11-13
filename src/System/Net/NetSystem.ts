export class NetSystem  {
    static instance: NetSystem;
    _adapter;
    static getInstance() {
        if (!this.instance) {
            this.instance = new NetSystem();
            //this.instance._adapter = new SocketIOAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    use(adapter){
        this._adapter = adapter;
    }
    getStream(){
        return this._adapter.getStream();
    }
    connect(room){
        this._adapter.connect(room);
    }
    send(data){
        this._adapter.send(data);
    }
    
}