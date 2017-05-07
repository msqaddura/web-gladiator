import { IComposite } from './IComposite';

export class Composite implements IComposite{
    readonly  owner: Composite;
    readonly name:string;
    private tree:Object={};


    constructor(owner=null,name="NoNameGiven") {
        this.owner = owner;
        this.name = name;
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

    iterateTree(fn:Function){
        for(var key in this.tree){
            fn(this.tree[key]);
        }
    }
    destroy(){
        //NOT SURE A BOUT IT HERE     
    }
}