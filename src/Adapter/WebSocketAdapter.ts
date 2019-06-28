import * as io from "socket.io-client";
import { Subject, Observable } from "rxjs";



export class WebSocketAdapter extends Subject<Event> {
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

  connect(url): Observable<Event> {
    console.log(url);
    this.url = url;
    this.socket = new WebSocket(url);
    this.socket.onopen = event => {
      this.next(event);
      this.open = true;
      setInterval(() => { this.ping(); }, this.pingInterval)
    };

    this.socket.onclose = event => {
      this.open = false;
      console.log(event)
      this.next(event);
    };

    this.socket.onerror = event => {
      this.next(event);
      this.open = false;
    };

    this.socket.onmessage = event => {
      console.log(event);
      this.next(event);
    };

    return new Observable(observer => {
      this.socket.addEventListener('message', event => {
        observer.next(event);
      });

      this.socket.addEventListener('close', event => {
        observer.error(event.code);
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
