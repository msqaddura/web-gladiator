
import { Container } from "../Foundation/GameObjects/Container";
import { ScaleContainer } from "../Foundation/GameObjects/ScaleContainer";
import { SpaceContainer } from "../Foundation/GameObjects/SpaceContainer";
import { Scene } from "../Foundation/GameObjects/Scene";
import { Application } from "../Foundation/GameObjects/Application";
import { Sprite } from "../Foundation/GameObjects/Sprite";
import { TilingSprite } from "../Foundation/GameObjects/TilingSprite";
import { AnimatedSprite } from "../Foundation/GameObjects/AnimatedSprite";

import { Cell } from './Cell';
import {MainScene} from './MainScene'
import { MatrixContainer } from './MatrixContainer';
export const MainSceneBlueprint = {
    "name": "MainScene",
    "ctor": MainScene,
    "manifest": "Resources/MainSceneManifest.json",
    "vfl": [
        "V:|[col:[Header(50)][Content][Footer(50)]]|",
        "H:|[col]|"
    ],
    "componentList": [
        {
            "name": "Header",
            "ctor": TilingSprite,
            "source": "Resources/bunny.png"
        },
        {
            "name": "Footer",
            "ctor": TilingSprite,
            "source": "Resources/bunny.png"
        },
        {
            "name": "Content",
            "ctor": SpaceContainer,
            "vfl": [
                //"//viewport aspect-ratio:1/1",
                'HV:|~[Grid(<=98%)]~|',
                //'C:Grid.height(Grid.width)',
                'C:Grid.width(Grid.height)'

            ],
            "componentList": [ //<--wrong naming should be entityList or entities
                {
                    "name": "Grid",
                    "ctor": MatrixContainer, //<-- extends Container
                    "config": "",
                    "scripts": [ //<-- not implemented, yet should be named component
                        { "name": "draggable", "boundary": "window" }
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
                            { "name": "box00", "i": 0, "j": 0 },
                            { "name": "box10", "i": 1, "j": 0 },
                            { "name": "box20", "i": 2, "j": 0 },
                            { "name": "box30", "i": 3, "j": 0 },
                            { "name": "box01", "i": 0, "j": 1 },
                            { "name": "box11", "i": 1, "j": 1 },
                            { "name": "box21", "i": 2, "j": 1 },
                            { "name": "box31", "i": 3, "j": 1 },
                            { "name": "box02", "i": 0, "j": 2 },
                            { "name": "box12", "i": 1, "j": 2 },
                            { "name": "box22", "i": 2, "j": 2 },
                            { "name": "box32", "i": 3, "j": 2 },
                            { "name": "box03", "i": 0, "j": 3 },
                            { "name": "box13", "i": 1, "j": 3 },
                            { "name": "box23", "i": 2, "j": 3 },
                            { "name": "box33", "i": 3, "j": 3 },
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
                                    "ctor": AnimatedSprite, //<-- extends AnimatedSprite
                                    "visible": true,
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
    ],

}
