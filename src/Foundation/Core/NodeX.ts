/**
 * Right now it is Called NodeX bcz Node is NodeJS
 * This is the topmost Object in WebGLadiator, however it is used for workarounds
 * adding IEvent and IStateFull is more or less a workaround here but that is more than fine....for now
 */

import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EventSystem } from "../../System/Event/EventSystem";
import { IEvent } from "../../System/Event/IEvent";
import { IStateMachine } from "../Base/IStateMachine";

export interface INode {
  readonly owner: NodeX;
  readonly name: string;
  kill();
}

export class NodeX implements INode, IEvent, IStateMachine {
  readonly owner: NodeX;
  readonly name: string;
  _fsm;
  registeredEvents: { [key: string]: Observable<any> } = {};
  isActive: Subject<void>;
  constructor(owner = null, name = "NoNameGiven") {
    this.owner = owner;
    this.name = name;
    this.isActive = new Subject();
  }
  bootstrap(bootstrap = true) {
    if (bootstrap === false) return;

    this.executeStateMachine();
    this.listenToBusEvents();
  }
  listenToBusEvents() { }

  registerEvent(ctor: InstanceType<any>): any {
    this.registeredEvents[ctor.name] = EventSystem.getInstance().registerEvent(
      ctor
    );

    return this.registeredEvents[ctor.name].pipe(takeUntil(this.isActive));
  }
  sendEvent(obj) {
    EventSystem.getInstance().sendEvent(obj);
  }
  executeStateMachine() { }
  //when she mentions boys
  kill() {
    this.isActive.next();
    for (const key in this.registeredEvents) {
      delete this.registeredEvents[key];
    }
  }
}
