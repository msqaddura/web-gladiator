import { IComposite } from "./IComposite";
import { NodeX } from "./NodeX";

import { INode } from "./INode";
export interface IComposite extends INode {

    // private tree:Object

    getNode(name: string);
    getNodeByName(name: string);
    addNode(node: Composite): void;
    removeNode(name: string): void;

    removeTree(): void;

    // specialFunctions
    iterateTree(fn: (key) => void);

}

export class Composite extends NodeX implements IComposite {
    private tree: object = {};

    constructor(owner = null, name = "NoNameGiven") {
        super(owner, name);
    }

    addNode(node: Composite) {
        this.tree[node.name] = node;
    }
    removeNode(name: string) {
        this.tree[name].kill();
        delete this.tree[name];
    }

    removeTree() {
        for (const key in this.tree) {
            if (this.tree.hasOwnProperty(key)) {
                this.removeNode(key);
            }
        }
        delete this.tree;
    }
    getNode(name) {
        return this.getNestedNode(this, name);
    }

    getNodes(names) {
        const result = {};
        names.forEach((name) => {
            result[name] = this.getNestedNode(this, name);
        });
        return result;
    }
    getNestedNode(target, name) {
        let node = null;
        if (target.tree[name]) {
            return target.tree[name];
        }

        for (const key in target.tree) {
            if (target.tree[key] instanceof Composite) {
                node = target.getNestedNode(target.tree[key], name);
                if (node != null) {
                    return node;
                }
            }

        }

        return null;
    }
    getNodeByName(name) {
        return this.tree[name];
    }
    iterateTree(fn: (key) => void) {
        for (const key in this.tree) {
            if (this.tree.hasOwnProperty(key)) {
                fn(this.tree[key]);
            }
        }
    }

    kill() {
        super.kill();
        this.removeTree();
    }
}
