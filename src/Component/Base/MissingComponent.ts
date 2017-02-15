import { Component } from "./Component"
export class MissingComponent extends Component{
    constructor(owner, params){
        super(owner, params);
        throw new Error(name);
    }
}