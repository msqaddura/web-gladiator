import {Composite} from './Composite';
import {INode} from './INode';
export interface IComposite extends INode{
    
    //private tree:Object
  

    getNode(name:string);
    getNodeByName(name:string);
    addNode(node:Composite):void;    
    removeNode(name:string):void;
    
    removeTree():void;
   


    //specialFunctions
    iterateTree(fn:Function);
    
}