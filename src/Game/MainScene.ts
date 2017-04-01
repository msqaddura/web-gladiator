import {Scene} from "../Component/Primitive/Scene";
import {ManifestLoader} from '../../Loader/ManifestLoader';
import { Bus } from '../../Communication/Bus';
export class MainScene extends Scene{
 _manifest;
 _bus;
 constructor(owner, params,bootstrap=false){
     super(owner, params);
     
        this.bootstrap(bootstrap);
}

}