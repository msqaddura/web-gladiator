const FLEX = {
    "START":0,
    "MIDDLE":0.5,
    "END":0.1
}
export class VFL{
    /**
     * Based on the Anchor we have to choose how to displace the view
     * for example 
     *  anchor = 0 ==> take Left || Top
     * anchor =0.5 ==> take centerX || CenetrY
     * anchor =1 ==> take Right || Button
     */
    _map={
        "Left":"Left",
        "Right":"Right",
        "Top":"Top",
        "CenterX":"CenterX",
        "Bottom":"Bottom",
        "CenterY":"CenterY"

    }
    _Left;
    _Right;
    _Top;
    _Bottom;
    _CenterX;
    _CenterY;
    constructor(map){

    }
    //in case of anchor = 0.5 we should then use centerX instead of Left and centerY instead of Top
    switchMap(from,to){
        this._map[from]=to;
        this._map[to]=from;
    }
    anchorOnX(anchor){
        if (anchor == FLEX.MIDDLE)
            //yeild    this._CenterX;
            return this._CenterX;
        if (anchor == FLEX.START)
            return this._Left;
        if (anchor == FLEX.END)
            return this._rigt;
    }
}