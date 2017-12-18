export class NetSystem  {
    public static instance: NetSystem;

    static getInstance() {
        if (!this.instance) {
            this.instance = new NetSystem();
            // this.instance._adapter = new SocketIOAdapter();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    private adapter;

    use(adapter) {
        this.adapter = adapter;
    }

    getStream() {
        return this.adapter.getStream();
    }

    connect(room) {
        this.adapter.connect(room);

    }

    send(data) {
        this.adapter.send(data);
    }

}
