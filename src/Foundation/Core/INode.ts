import {Node} from './Node';
export interface INode{
    readonly owner: Node;
    readonly name:string;
    destroy();
}