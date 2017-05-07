import * as PIXI from 'pixi.js'
import { IWGObject} from './IWGObject';
import {WGObject} from './WGObject';
import { GameObject } from './GameObject';
export interface IGameObject extends IWGObject{
    $view;
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



    gameObjects;
}