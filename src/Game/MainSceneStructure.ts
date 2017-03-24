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
export const MainSceneStructure = {
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
                    "ctor": ScaleContainer, //<-- extends Container
                    "config": "",
                    "scripts":[ //<-- not implemented, yet should be named component
                        {"name":"draggable","boundary":"window"}
                    ],
                    "vfl": [
                        "H:|[box00(square)][box01(square)][box02(square)]|",    
                        "H:|[box10(square)][box11(square)][box12(square)]|",
                        "H:|[box20(square)][box21(square)][box22(square)]|",
                        "V:|[box00(square)][box10(square)][box20(square)]|",
                        "V:|[box01(square)][box11(square)][box21(square)]|",
                        "V:|[box02(square)][box12(square)][box22(square)]|",
                        "HV:|[square(33.33%)]~|"
                    ],
                    "repeatableList": [{
                        "repeats": [
                            {"name":"box00","id":0},
                            {"name":"box01","id":1},
                            {"name":"box02","id":2},
                            {"name":"box10","id":3},
                            {"name":"box11","id":4},
                            {"name":"box12","id":5},
                            {"name":"box20","id":6},
                            {"name":"box21","id":7},
                            {"name":"box22","id":8},
                        ],
                        "repeatable":
                        {
                            "name": "repeatable",
                            "repeatable": true,
                            "ctor": ScaleContainer, //<-- extends Container
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
