import { IComposite } from './IComposite';
import { NodeX } from './NodeX';
export class Composite extends NodeX implements IComposite{
    private tree:Object={};

    constructor(owner=null,name="NoNameGiven") {
        super(owner,name);
    }
    
    addNode(node:Composite){
        this.tree[node.name]=node;
    }    
    removeNode(name:string){
        delete this.tree[name];
    }
    
    removeTree(){
        for(var key in this.tree){
            delete this.tree[key];
        }
    }
    getNode(name){
        return this.getNodeByName(name);
    }
    getNodeByName(name){
        return this.tree[name];
    }
    iterateTree(fn:Function){
        for(var key in this.tree){
            fn(this.tree[key]);
        }
    }
}