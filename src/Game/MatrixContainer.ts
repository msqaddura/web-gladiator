import { ScaleContainer } from "../Component/Primitive/ScaleContainer";
import { CellPlayedMessage } from "./CellPlayedMessage";
//import { gameDataSource } from "./GameDataSource";
export class MatrixContainer extends ScaleContainer {
    constructor(owner, params, bootstrap = false) {
        super(owner, params);
        this.bootstrap(bootstrap);
    }
    listenToBusEvents() {
        super.listenToBusEvents();
        this.registerMessage(CellPlayedMessage).subscribe(value=>{
            console.info("RECEIVED",value);
            //console.info(gameDataSource);
        })
    }
}