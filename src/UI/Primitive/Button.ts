import { merge } from "rxjs";
import { Entity } from "../../Entity";
import { StateMachine } from "../../Foundation";
import { tap } from "rxjs/operators";

export class Button extends Entity {
  executeStateMachineNone() {
    const init = "none";
    const transitions = [
      { name: "pointerover", from: ["none", "idle", "tapped"], to: "hover" },
      { name: "pointerout", from: ["active", "hover"], to: "idle" },
      { name: "pointertap", from: ["hover", "active"], to: "tapped" },
      { name: "pointerdown", from: "hover", to: ["active"] },
      { name: "pointerup", from: ["active", "tapped"], to: "hover" },
      { name: "disabled", from: "*", to: "idle" }
    ];
    const methods = {
      onIdle: this.onIdle.bind(this),
      onHover: this.onHover.bind(this),
      onTapped: this.onTapped.bind(this),
      onActive: this.onActive.bind(this)
    };
    this._fsm = new StateMachine(init, transitions, methods);
    this._fsm.observe({
      onBeforeTransition: () => {
        console.info("FSM", this._fsm.state);
      },
      onLeaveState: () => {
        console.info("FSM", this._fsm.state);
      }
    });
  }
  listenToHIDEvents() {
    super.listenToHIDEvents(true);
    merge(
      // this.registerHIDEvent('pointerover').do(e =>{ this._fsm.pointerover(e)}),
      // this.registerHIDEvent('pointerout').do(e => this._fsm.pointerout(e)),
      // this.registerHIDEvent('pointertap').do(e => this._fsm.pointertap(e)),
      // this.registerHIDEvent('pointerdown').do(e => this._fsm.pointerdown(e)),
      this.registerHIDEvent("pointerover").pipe(tap(e => this.onHover(e))),
      this.registerHIDEvent("pointerout").pipe(tap(e => this.onIdle(e))),
      this.registerHIDEvent("pointertap").pipe(tap(e => this.onTapped(e))),
      this.registerHIDEvent("pointerdown").pipe(tap(e => this.onActive(e)))
    ).subscribe(data => {
      this._handleEvent(data);
    });
  }
  _handleEvent(data) {
    // console.info("Handled");
  }
  protected onIdle(...args) {
    // console.info("QQQonIdle");
  }
  protected onHover(...args) {
    // console.info("QQQonHover");
  }
  protected onTapped(...args) {
    // console.info("QQQonTapped");
    // this._fsm.pointerup();
  }
  protected onActive(...args) {
    // console.info("QQQonActive");
  }
}
