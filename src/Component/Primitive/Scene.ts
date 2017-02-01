import {Container} from "./Container"
export class Scene extends Container{
 constructor({owner,name,componentList,config,vfl=[""]}){
     super({owner,name,componentList,config,vfl});
    }
}