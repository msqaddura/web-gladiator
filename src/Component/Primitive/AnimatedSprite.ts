import * as PIXI from 'pixi.js'
import * as Rx from 'rxjs';

import { DisplayObject } from '../Primitive/DisplayObject';
import { Component } from '../Base/Component';
import { View } from '../Base/View';


export class AnimatedSprite extends View {

    constructor(owner, params,bootstrap = false) {
        super( owner, params );
        var frames = [];
        params.frameList.forEach(bag=>{
            for (let i=bag.start; i<=bag.end;i++){
                var val = i < 10 ? '0' + i : i;//TODO:use MathUtil
                frames.push(PIXI.Texture.fromFrame(`${bag.prefix}${val}${bag.postfix}`));
            }
        });
        
        this.$view = new PIXI.extras.AnimatedSprite(frames);
        if(bootstrap)
            this.bootstrap();     
    }
    listenToHIDEvents(){
        super.listenToHIDEvents();
        this.registerHIDEvent('pointertap').startWith(false).scan((prev,curr)=>!prev)
        .subscribe((value)=>{
            if(value)
                this.play();
            else
                this.stop();
        })

        Rx.Observable.merge(
        this.registerHIDEvent('mouseover').mapTo(true),
        this.registerHIDEvent('mouseout').mapTo(false)
        ).debounceTime(20).startWith(false)
        
        .subscribe((value)=>{
            if(value)
                this.play();
            else
                this.stop();
        })

    }
    play(){
        this.$view.play();
    }
    pause(){
        this.$view.pause();
    }
    stop(){
        this.$view.stop();
    }
} 
