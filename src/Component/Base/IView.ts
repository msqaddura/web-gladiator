import * as PIXI from 'pixi.js'
import { IComponent} from './IComponent';
import {Component} from './Component';
import { View } from './View';
export interface IView extends IComponent{
    $view;
    _scene;
    _x;
    _left;
    _y;
    _top;
    _width;
    _height;
    _anchorX;
    _anchorY;
    _scaleX;
    _scaleY;
    _vfl;
    _autolayout;
    _visible:boolean;
    readonly config:Object;   
}