import { Component } from "./Component"
export class MissingComponent extends Component{
    constructor(owner=null,name="N/A",componentList={}){
        super({owner,name,componentList});
        throw new Error(name);
    }
}