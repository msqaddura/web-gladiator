import * as io from "socket.io-client";
import { Subject, Observable } from "rxjs";

interface SocketEvent {
  type: "open" | "close" | "error" | "message";
  payload: Event;
}

export class WebSocketAdapter extends Subject<SocketEvent> {
  private socket: WebSocket;
  private url: string;
  private open = false;
  private hack = true;

  constructor(
    public readonly pingCommand = {},
    public readonly pingInterval = 30 * 1000,
    public readonly timeout = 10 * 60 * 1000) {
    super();
  }

  connect(url): Observable<SocketEvent> {
    console.log(url);
    this.url = url;
    this.socket = new WebSocket(url);
    this.socket.onopen = payload => {
      this.next({ type: "open", payload });
      this.open = true;
      setInterval(() => { this.ping() }, this.pingInterval)
    };

    this.socket.onclose = event => {
      this.open = false;
      console.log(event)
      this.next({ type: "close", payload: event });
    };

    this.socket.onerror = error => {
      console.error(error);
      this.next({ type: "error", payload: error });
      this.open = false;

    };
    this.socket.onmessage = payload => {
      console.log(payload);
      this.next({ type: "message", payload });
    };

    return new Observable(observer => {
      this.socket.addEventListener('message', payload => {
        if (this.hack) {
          const data = JSON.parse(payload.data)
          if (data.type === "GAME_INIT" || data.type === "FATAL_ERROR") {
            observer.next({ type: "message", payload });
            //observer.complete();
            this.hack = false;
          }
        }
      });

      this.socket.addEventListener('close', event => {
        if (this.hack) {
          observer.error(event.code);
          this.hack = false;
        }
      });

    });
  }

  ping() {
    if (this.open)
      this.send(this.pingCommand)
  }

  disconnect() {
    if (this.open) {
      this.socket.close();
    }
  }

  send(data) {
    this.socket.send(data);
  }
}
