import {Scene} from "../Foundation/GameObjects/Scene";

export class MainScene extends Scene{
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     
        this.bootstrap(bootstrap);
}

}