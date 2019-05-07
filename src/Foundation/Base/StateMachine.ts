import { JavascriptStateMachineWrapper } from "../../Wrapper/JavascriptStateMachineWrapper";

export class StateMachine extends JavascriptStateMachineWrapper {
  constructor(init, transitions, methods, data = null) {
    super(init, transitions, methods, data);
  }
}
