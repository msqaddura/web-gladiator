import * as Colyseus from "colyseus.js";
import { STATUS_CODES } from "http";
import * as Rx from "rxjs";

const ERROR_STATES = {
    SERVER_UNAVAILABLE: {
        text: "Error Connecting to Server!",
        log: "SERVER_UNAVAILABLE"
    },
    SECURITY_ERROR: {
        text: "Error Connecting to Server!",
        log: "SECURITY_ERROR"
    },
    GAME_ERROR: {
        text: "OOOPS! Something went wrong",
        log: "GAME_ERROR"
    },
};

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

        try {

            this.client = new Colyseus.Client(this.url);
            this.client.onError.add((error) => {
                console.log(error);
                this.stream.next({ type: "error", data: ERROR_STATES.SERVER_UNAVAILABLE });
            });
            this.client.onClose.add((event) => {
                console.log(event);
            });
        } catch (error) {
            console.log(error);
            this.stream.next({ type: "error", data: ERROR_STATES.SECURITY_ERROR });
        }
    }

    connect(room = "normal") {
        this.roomName = room;
        this.room = this.client.join(this.roomName);
        this.room.onJoin.add(() => {
            console.info("NET", { type: "join" });
            this.stream.next({ type: "join", data: { room: this.room, client: this.client } });
        });
        this.room.onStateChange.add((state) => {
            console.info("NET", { type: "update", state });
            this.stream.next({ type: "update", state });
        });
        this.room.onMessage.add((data) => {
            console.info("NET", { type: "data", data });
            this.stream.next({ type: "data", data });
        });
        this.room.onError.add((data) => {
            // stream.error() //<--- error the whole stream... new room
            console.info("NET", { type: "error" });
            this.stream.next({ type: "error", data: STATUS_CODES.GAME_ERROR });
        });
        this.room.onLeave.add(() => {
            // strand you eam.complete() //<--- complete the whole stream... new player
            console.info("NET", { type: "leave" });
            this.stream.next({ type: "leave" });
        });
    }

    disconnect() {
        this.room.leave();
    }

    send(data) {
        this.room.send(data);
    }
    getStream() {
        return this.stream;
    }
}
