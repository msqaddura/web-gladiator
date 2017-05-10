import {IStrategy} from './IStrategy';
import {Leaf} from '../Core/Leaf';

export class Strategy extends Leaf implements IStrategy{
    constructor(owner,params){
        super(owner,params.name);
    }
    execute(){

    }
}