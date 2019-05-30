import { Observable } from "rxjs";

export const STATUS = {
  SERVER_UNAVAILABLE: {
    text: "Error Connecting to Server!",
    log: " SERVER_UNAVAILABLE "
  },
  SECURITY_ERROR: {
    text: "Error Connecting to Server!",
    log: "SECURITY_ERROR"
  },
  GAME_ERROR: {
    text: "OOOPS! Something went wrong",
    log: "GAME_ERROR"
  },

  TIMED_OUT: {
    text: "Timed out",
    log: "Timed_OUT"
  },
  CLOSED: {
    text: "CLOSED"
  }
};

export class NetSystem {
  public static instance: NetSystem;

  static getInstance() {
    if (!this.instance) {
      this.instance = new NetSystem();
      // this.instance._adapter = new SocketIOAdapter();
      // ... any one time initialization goes here ...
    }
    return this.instance;
  }
  get isConnected() {
    return this.adapter.isConnected;
  }

  private adapter;

  use(adapter) {
    this.adapter = adapter;
  }

  getStream(): Observable<any> {
    return this.adapter;
  }

  connect(room: any) {
    return this.adapter.connect(room);
  }

  disconnect() {
    this.adapter.disconnect();
  }

  send(data) {
    this.adapter.send(data);
  }
}

export let netSystem = NetSystem.getInstance();
