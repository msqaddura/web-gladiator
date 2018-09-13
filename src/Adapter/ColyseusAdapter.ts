import * as Colyseus from "colyseus.js";
import { STATUS_CODES } from "http";
import * as Rx from "rxjs";
import { STATUS } from "../System/Net/NetSystem";

export class ColyseusAdapter {
    url; // server connection url
    client; // the client socket
    roomName; // name of the room usually one room needed
    room; // client connects, resides in a room
    nameSpace; // the namespace usually never used
    stream;
    isConnected = false;
    constructor(url) {
        this.stream = new Rx.Subject();
        this.url = url;
        // console.info(Colyseus);

    }

    connect(room = "normal") {
        this.isConnected=false;
        try {

            this.client = new Colyseus.Client(this.url);
            this.client.onError.add((error) => {
                console.info("NET", { type: "error", error });
                this.stream.next({ type: "error", data: STATUS.SERVER_UNAVAILABLE });
                this.client.close();
                this.isConnected=false;
            });
            this.client.onClose.add((event) => {
                console.info("NET", { type: "close", event });
                this.stream.next({ type: "close" });
                this.isConnected=false;
            });

            this.client.onOpen.add((event) => {
                console.info("NET", { type: "open", event });
                this.stream.next({ type: "open " });
                this._joinRoom(room);
            });
        } catch (error) {
            console.info("NET", { type: "ERROR", error });
            this.isConnected=false;
            this.stream.next({ type: "error", data: STATUS.SECURITY_ERROR });
        }

    }

    _joinRoom(room) {
        this.roomName = room;
        this.room = this.client.join(this.roomName);

        this.room.onJoin.add(() => {
            this.isConnected=true;
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
        this.room.onLeave.add((client) => {
            // strand you eam.complete() //<--- complete the whole stream... new player
            console.info("NET", { type: "leave", data: { client, timedOut: client.code === 8 } });
            this.stream.next({ type: "leave", data: client.code === 8 ? STATUS.TIMED_OUT : null });
            this.client.close();
            this.room.removeAllListeners();
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
