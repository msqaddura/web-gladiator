import { ScaleContainer } from '../Foundation/GameObjects/ScaleContainer';
import { CellPlayedMessage } from "./CellPlayedMessage";
import { GameDataSource } from "./GameDataSource";
export class MatrixContainer extends ScaleContainer {
    constructor(owner, params, bootstrap = false) {
        super(owner, params);
        this.bootstrap(bootstrap);
    }
    listenToBusEvents() {
        super.listenToBusEvents();
        this.registerMessage(CellPlayedMessage).subscribe(message=>{
            console.info("RECEIVED",message);
            GameDataSource.getInstance().applyPlayerAction(message.i,message.j);
            GameDataSource.getInstance().changePlayerTurn();
        })
    }
}