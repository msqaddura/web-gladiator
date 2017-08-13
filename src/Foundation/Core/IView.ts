import * as PIXI from 'pixi.js'
import { IWGObject} from './IWGObject';
import {WGObject} from './WGObject';
import { View } from './View';
export interface IView extends IWGObject{
    view;
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



    views;
}