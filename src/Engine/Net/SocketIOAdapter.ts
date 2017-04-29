import * as io from "socket.io-client";
import * as Rx from 'rxjs';

export class SocketIOAdapter {
    _socket;
    _url;
    _stream;
    constructor(url) {
        this._stream = new Rx.Subject();
        this._url = url;
    }

    connect() {
        
        this._socket = io.connect(this._url);
        var self = this;
        this._socket.on('connect',function(){
            self._stream.next({type:'connect'});
        })
        this._socket.on('event', function (data) {
            self._stream.next({type:'event',...data})
        });
        this._socket.on('disconnect',function(){
            self._stream.next({type:'disconnect'})
        })
    }

    getStream() {
        return this._stream;
    }
}