import * as PIXI from 'pixi.js'
import { IComponent} from './IComponent';
import {Component} from './Component';
import { View } from './View';
export interface IView extends IComponent{
    $view;
    _x;
    _y;
    _width;
    _height;
    _vfl;
    _autolayout;
    readonly config:Object;   
}