import {Leaf} from '../Core/Leaf';
import { ILeaf } from '../Core/ILeaf';

export interface IStrategy extends ILeaf{
    execute();
}
export class Strategy extends Leaf implements IStrategy{
    constructor(owner,params){
        super(owner,params.name);
    }
    execute(){

    }
}