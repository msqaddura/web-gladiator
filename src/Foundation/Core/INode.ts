import {NodeX} from './NodeX';
export interface INode{
    readonly owner: NodeX;
    readonly name:string;
    kill();
}