import * as io from "socket.io-client";
import { Subject, Observable } from "rxjs";

interface SocketEvent {
  type: "open" | "close" | "error" | "message";
  payload: Event;
}

export class WebSocketAdapter extends Subject<SocketEvent> {
  private socket: WebSocket;
  private url: string;
  private hack = true;
  connect(url): Observable<SocketEvent> {
    console.log(url);
    this.url = url;
    this.socket = new WebSocket(url);
    this.socket.onopen = payload => {
      this.next({ type: "open", payload });
    };

    this.socket.onclose = payload => {
      this.next({ type: "close", payload });
    };

    this.socket.onerror = error => {
      console.error(error);
      this.next({ type: "error", payload: error });
    };

    this.socket.onmessage = payload => {
      console.log(payload);
      this.next({ type: "message", payload });
    };
    return new Observable(observer => {
      this.socket.onmessage = payload => {
        if (this.hack) {
          observer.next({ type: "message", payload });
          observer.complete();
          this.hack = false;
        } else {
          this.next({ type: "message", payload });
        }
      };
    });
  }

  disconnect() {
    this.socket.close();
  }

  send(data) {
    this.socket.send(data);
  }
}
