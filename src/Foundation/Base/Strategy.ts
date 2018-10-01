import { ILeaf, Leaf } from "../Core";

export interface IStrategy extends ILeaf {
    execute();
}
export class Strategy extends Leaf implements IStrategy {
    constructor(owner, params) {
        super(owner, params.name);
    }
    bootstrap(bootstrap = true) {
        this.execute();
        this.executeStateMachine();
        this.listenToBusEvents();
    }
    start() {
        //
    }
    execute() {
        this.start();
    }
}
