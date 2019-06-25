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
      if (event.code === 1000) {
        console.log("can do reconnecting");

      }
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
      this.socket.onmessage = payload => {
        if (this.hack) {
          const data = JSON.parse(payload.data)
          if (data.type === "GAME_INIT") {
            observer.next({ type: "message", payload });
            //observer.complete();
            this.hack = false;
          }
        } else {
          this.next({ type: "message", payload });
        }
      };

      this.socket.onerror = event => {
        console.log(event)
        if (this.hack) {
          observer.error(event);
          this.hack = false;
        }
      };
    });
  }

  ping() {
    if (this.open)
      this.send(this.pingCommand)
  }

  disconnect() {
    this.socket.close();
  }

  send(data) {
    this.socket.send(data);
  }
}
