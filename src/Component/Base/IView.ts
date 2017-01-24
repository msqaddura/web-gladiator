import * as PIXI from 'pixi.js'
import { IComponent} from './IComponent';
import {Component} from './Component';


export interface IView extends IComponent{
    _view;
    createView():void;
    addView():void;

    
}