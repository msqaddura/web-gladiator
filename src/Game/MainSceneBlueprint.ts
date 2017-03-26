import { Component } from "../Component/Base/Component";
import { Container } from "../Component/Primitive/Container";
import { ScaleContainer } from "../Component/Primitive/ScaleContainer";
import { SpaceContainer } from "../Component/Primitive/SpaceContainer";
import { Scene } from "../Component/Primitive/Scene";
import { Application } from "../Component/Primitive/Application";
import { Sprite } from "../Component/Primitive/Sprite";
import { TilingSprite } from "../Component/Primitive/TilingSprite";
import { AnimatedSprite } from "../Component/Primitive/AnimatedSprite";
import { Rocket } from '../MarketPlace/Rocket';
import { Cell } from './Cell';
import { MatrixContainer } from './MatrixContainer';
export const MainSceneBlueprint = {
            "name": "MainScene",
            "ctor": Scene,
            "manifest":"Resources/MainSceneManifest.json",
            "vfl": [
                //"//viewport aspect-ratio:1/1",
                'H:|~[Grid(Grid.height)]~|',
                'H:|~[Grid(<=80%)]~|',
                'V:|~[Grid(Grid.width)]~|',
                'V:|~[Grid(<=80%)]~|'
            ],
            "componentList": [ //<--wrong naming should be entityList or entities
                {
                    "name": "Grid",
                    "ctor": MatrixContainer, //<-- extends Container
                    "config": "",
                    "scripts":[ //<-- not implemented, yet should be named component
                        {"name":"draggable","boundary":"window"}
                    ],
                    "vfl": [
                        "H:|[box00(square)][box01(square)][box02(square)][box03(square)]|",    
                        "H:|[box10(square)][box11(square)][box12(square)][box13(square)]|",
                        "H:|[box20(square)][box21(square)][box22(square)][box23(square)]|",
                        "H:|[box30(square)][box31(square)][box32(square)][box33(square)]|",
                        "V:|[box00(square)][box10(square)][box20(square)][box30(square)]|",
                        "V:|[box01(square)][box11(square)][box21(square)][box31(square)]|",
                        "V:|[box02(square)][box12(square)][box22(square)][box32(square)]|",
                        "V:|[box03(square)][box13(square)][box23(square)][box33(square)]|",
                        "HV:|[square(33.33%)]~|"
                    ],
                    "repeatableList": [{
                        "repeats": [
                            {"name":"box00","i":0,"j":0},
                            {"name":"box10","i":1,"j":0},
                            {"name":"box20","i":2,"j":0},
                            {"name":"box30","i":3,"j":0},
                            {"name":"box01","i":0,"j":1},
                            {"name":"box11","i":1,"j":1},
                            {"name":"box21","i":2,"j":1},
                            {"name":"box31","i":3,"j":1},
                            {"name":"box02","i":0,"j":2},
                            {"name":"box12","i":1,"j":2},
                            {"name":"box22","i":2,"j":2},
                            {"name":"box32","i":3,"j":2},
                            {"name":"box03","i":0,"j":3},
                            {"name":"box13","i":1,"j":3},
                            {"name":"box23","i":2,"j":3},
                            {"name":"box33","i":3,"j":3},
                        ],
                        "repeatable":
                        {
                            "name": "repeatable",
                            "repeatable": true,
                            "ctor": Cell, //<-- extends Container
                            "vfl": [
                                "HV:|[sprite]|",
                                "HV:|[animatedSprite]|"
                            ],
                            "componentList": [
                                {
                                    "name": "sprite",
                                    "ctor": Sprite,
                                    "source": "Resources/squareC.png"
                                },
                                {
                                    "name": "animatedSprite",
                                    "ctor": Rocket, //<-- extends AnimatedSprite
                                    "frameList": [
                                        {
                                            prefix: "rollSequence00",
                                            start: 0,
                                            end: 29,
                                            postfix: ".png"
                                        }
                                    ]
                                }
                            ]
                        }
                    }]
                }
            ]
        }
