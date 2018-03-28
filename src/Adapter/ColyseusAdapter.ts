import * as Colyseus from "colyseus.js";
import * as Rx from "rxjs";
export class ColyseusAdapter {
    url; // server connection url
    client; // the client socket
    roomName; // name of the room usually one room needed
    room; // client connects, resides in a room
    nameSpace; // the namespace usually never used
    stream;
    constructor(url) {
        this.stream = new Rx.Subject();
        this.url = url;
        // console.info(Colyseus);
        this.client =  new Colyseus.Client(this.url);
    }

    connect(room= "normal") {
        this.roomName = room;
        this.room = this.client.join(this.roomName);
        this.room.onJoin.add(() => {
            this.stream.next({type: "join", data: {room: this.room, client: this.client}});
        });
        this.room.onUpdate.add((state) => {
            this.stream.next({type: "update", state});
        });
        this.room.onData.add((data) => {
            this.stream.next({type: "data", data});
        });
        this.room.onError.add(() => {
            // stream.error() //<--- error the whole stream... new room
            this.stream.next({type: "error"});
        });
        this.room.onLeave.add(() => {
            // stream.complete() //<--- complete the whole stream... new player
            this.stream.next({type: "leave"});
        });
    }
    
    disconnect(){
        this.room.leave();
    }

    send(data) {
        this.room.send(data);
    }
    getStream() {
        return this.stream;
    }
}
