export class CellPlayedMessage{
    dispacher;
    i;
    j;
    constructor(dispatcher, i ,j ){
        this.dispacher=dispatcher;
        this.i = i;
        this.j = j;
    }
}