import {Composite} from './Composite';
export interface IComposite {
    readonly owner: Composite;
    readonly name:string;
    
    //private tree:Object
  


    addNode(node:Composite):void;    
    removeNode(name:string):void;
    
    removeTree():void;
   


    //specialFunctions
    iterateTree(fn:Function);
}