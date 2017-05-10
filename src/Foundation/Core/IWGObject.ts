import {IComposite} from './IComposite';
import {WGObject} from './WGObject';


export interface IWGObject extends IComposite{
   
    readonly blueprint:Object;
    readonly blueprints;
    readonly repeatableBlueprints;
    initialize();
 
    
    preCreateTree():void;
    createTree(any):any;
    postCreateTree():void;

}