export class Singleton {
    protected static instance: Singleton;
    protected constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new Singleton();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
}