import * as Rx from "rxjs";
import * as io from "socket.io-client";

export class SocketIOAdapter {
    socket;
    url;
    stream;
    constructor(url) {
        this.stream = new Rx.Subject();
        this.url = url;
    }

    connect() {

        this.socket = io.connect(this.url);
        this.socket.on("connect", () => {
            this.stream.next({type: "connect"});
        });
        this.socket.on("event",  (data) => {
            this.stream.next({type: "event", ...data});
        });
        this.socket.on("disconnect", () => {
            this.stream.next({type: "disconnect"});
        });
    }

    getStream() {
        return this.stream;
    }
}
