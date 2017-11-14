import { IComposite } from './IComposite';
import { NodeX } from './NodeX';


import { INode } from './INode';
export interface IComposite extends INode {

    //private tree:Object


    getNode(name: string);
    getNodeByName(name: string);
    addNode(node: Composite): void;
    removeNode(name: string): void;

    removeTree(): void;



    //specialFunctions
    iterateTree(fn: Function);

}

export class Composite extends NodeX implements IComposite {
    private tree: Object = {};

    constructor(owner = null, name = "NoNameGiven") {
        super(owner, name);
    }
    
    addNode(node:Composite){
        this.tree[node.name]=node;
    }    
    removeNode(name:string){
        delete this.tree[name];
    }

    removeTree() {
        for (var key in this.tree) {
            delete this.tree[key];
        }
    }
    getNode(name) {
        return this.getNestedNode(this, name);
    }

    getNodes(names){
        let result = {}
        names.forEach(name => {
             result[name] = this.getNestedNode(this,name);
        });
        return result;
    }  
    getNestedNode(target, name) {
        let node = null;
        if (target.tree[name])
            return target.tree[name];

        for (const key in target.tree) {
            if (target.tree[key] instanceof Composite) {
                node = target.getNestedNode(target.tree[key], name)
                if (node != null)
                    return node;
            }

        }

        return null;
    }
    getNodeByName(name) {
        return this.tree[name];
    }
    iterateTree(fn: Function) {
        for (var key in this.tree) {
            fn(this.tree[key]);
        }
    }
}