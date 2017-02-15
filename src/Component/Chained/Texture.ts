import { Leaf } from '../Base/Leaf'
export class Texture extends Leaf{
    $loot;
    constructor(owner, params){
        super(owner, params);
        this.$loot= PIXI.utils.TextureCache["images/squareC.png"];
    }
    
}