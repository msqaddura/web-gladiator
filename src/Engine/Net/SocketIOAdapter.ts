import * as io from "socket.io-client";
import * as Rx from 'rxjs';

export class SocketIOAdapter {
    _socket;
    _url;
    _stream;
    constructor() {
        this._stream = new Rx.Subject();
    }

    connect(url) {
        this._url = url;
        this._socket = io.connect(url);
        var self = this;
        this._socket.on('connect',function(){
            self._stream.next({type:'connect'});
        })
        this._socket.on('event', function (data) {
            self._stream.next({type:'event',data})
        });
        this._socket.on('disconnect',function(){
            self._stream.next({type:'disconnect'})
        })
    }

    getStream() {
        return this._stream;
    }
}