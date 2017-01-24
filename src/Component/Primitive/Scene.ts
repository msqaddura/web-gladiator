import {Container} from "./Container"
export class Scene extends Container{
    constructor(owner,...paramsArr){
        super(owner,paramsArr[0]);
    }
}