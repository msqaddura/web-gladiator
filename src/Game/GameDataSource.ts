import * as Rx from "rxjs";

export const STATES = {
    DISABLED:"DISABLED",
    ENABLED:"ENABLED"
}
class GameDataSource {
    protected static instance: GameDataSource;
    obsData = new Rx.Subject();
    private _data={
        playerTurn : 0,
        matrix:[
            [{state:STATES.ENABLED},{state:STATES.ENABLED},{state:STATES.ENABLED},{state:STATES.DISABLED}],
            [{state:STATES.ENABLED},{state:STATES.ENABLED},{state:STATES.ENABLED},{state:STATES.DISABLED}],
            [{state:STATES.ENABLED},{state:STATES.ENABLED},{state:STATES.ENABLED},{state:STATES.DISABLED}],
            [{state:STATES.ENABLED},{state:STATES.DISABLED},{state:STATES.DISABLED},{state:STATES.DISABLED}]
        ]
    };
    private constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new GameDataSource();
            // ... any one time initialization goes here ...
        }
        return this.instance;
    }
    private _invalidate(){
        this.obsData.next(this._data);
    }
    startWithPlayer(playerTurn = 1){
        this._data.playerTurn = playerTurn;
    }
    changePlayer(){
        this._data.playerTurn = this._data.playerTurn%2+1;
        this._invalidate();
    }
    updateMatrix(i,j,state){
        this._data.matrix[i,j].state = state;
        this._invalidate();
    }
}
export gameDataSource = GameDataSource.getInstance();