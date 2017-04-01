import * as Rx from "rxjs";

export const STATES = {
    DISABLED:"DISABLED",
    ENABLED:"ENABLED",
    PLAYED:"PLAYED"
}
export class GameDataSource {
    protected static instance: GameDataSource;
    public obsData;
    private _data;
    private constructor() {
        this.obsData = new Rx.ReplaySubject(1);
        this._data = {
            playerTurn : 0,
            matrix:[
                [{state:STATES.ENABLED,player:0},{state:STATES.ENABLED,player:0},{state:STATES.ENABLED,player:0},{state:STATES.DISABLED,player:0}],
                [{state:STATES.ENABLED,player:0},{state:STATES.ENABLED,player:0},{state:STATES.ENABLED,player:0},{state:STATES.DISABLED,player:0}],
                [{state:STATES.ENABLED,player:0},{state:STATES.ENABLED,player:0},{state:STATES.ENABLED,player:0},{state:STATES.DISABLED,player:0}],
                [{state:STATES.DISABLED,player:0},{state:STATES.DISABLED,player:0},{state:STATES.DISABLED,player:0},{state:STATES.DISABLED,player:0}]
            ]
        };
        this.startWithPlayer(1);
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
        this._invalidate();
    }
    changePlayerTurn(){
        this._data.playerTurn = this._data.playerTurn%2+1;
        this._invalidate();
    }
    applyPlayerAction(i,j){
        this._data.matrix[i][j].state = STATES.PLAYED;
        this._data.matrix[i][j].player = this._data.playerTurn;
        this._invalidate();
    }
    
}
