import {NodeX} from './NodeX';
export interface INode{
    readonly owner: Node;
    readonly name:string;
    destroy();
}