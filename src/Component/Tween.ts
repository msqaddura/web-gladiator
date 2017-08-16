import { System } from '../System/System';
//better called animation but for now keep so, anime.js to be used
//it should be a component

export class Tween{
    tween;
    owner;
    constructor(owner,{from,to,duration,repeat,yoyo}){
       this.owner=owner;
       this.tween = System.getInstance().getSystem("tween").createNew({from,to,duration,repeat,yoyo})
        .onStart(function(){
            owner.setAnim(this);
        })
        .onUpdate(function(){
            owner.setAnim(this)
        })
        .onComplete(function(){
            owner.setAnim(this)
        });
    }
    start(){
        this.tween.start();
    }
    stop(){
        this.tween.stop();
    }

}