import {Scene} from "../Component/Primitive/Scene";

export class MainScene extends Scene{
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     
        this.bootstrap(bootstrap);
}

}