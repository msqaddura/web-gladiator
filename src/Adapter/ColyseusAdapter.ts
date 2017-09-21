import * as Rx from 'rxjs';
import * as Colyseus from "colyseus.js";
export class ColyseusAdapter {
    _url;//server connection url
    _client;//the client socket
    _roomName;//name of the room usually one room needed
    _room;//client connects, resides in a room
    _nameSpace;//the namespace usually never used
    _stream;
    constructor(url,roomName="whatever") {
        this._stream = new Rx.Subject();
        this._url = url;
        console.info(Colyseus);
        this._client =  new Colyseus.Client(`${window.location.origin.replace("http","ws")}`);
        this._roomName = roomName;
    }

    connect() {
        var self=this;
        this._room = this._client.join(this._roomName);
        this._room.onJoin.add(function(){
            self._stream.next({type:'join',data:{room:self._room,client:self._client}})
        });
        this._room.onUpdate.add(function(state){
            self._stream.next({type:'update',state})
        });
        this._room.onData.add(function(data){
            self._stream.next({type:'data',data})
        });
        this._room.onError.add(function(){
            //self._stream.error() //<--- error the whole stream... new room
            self._stream.next({type:'error'})
        });
        this._room.onLeave.add(function(){
            //self._stream.complete() //<--- complete the whole stream... new player
            self._stream.next({type:'leave'})
        });
        // this._socket = io.connect(this._url);
        // var self = this;
        // this._socket.on('connect',function(){
        //     self._stream.next({type:'connect'});
        // })
        // this._socket.on('event', function (data) {
        //     self._stream.next({type:'event',...data})
        // });
        // this._socket.on('disconnect',function(){
        //     self._stream.next({type:'disconnect'})
        // })
    }
    send(data){
        this._room.send(data);
    }
    getStream() {
        return this._stream;
    }
}