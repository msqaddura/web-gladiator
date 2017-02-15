import { Component } from "../Component/Base/Component";
import { Container } from "../Component/Primitive/Container";
import { Scene } from "../Component/Primitive/Scene";
import { Application } from "../Component/Primitive/Application";
import { Sprite } from "../Component/Primitive/Sprite";
import { AnimatedSprite } from "../Component/Primitive/AnimatedSprite";
 export const  App = {
        "name": "Application",
        "family": Application,
        "config": null,
        "vfl": [
                'H:|[Game(100%)]|',
                'V:|[Game(100%)]|'
        ],
        "componentList": {
            "Game": {
                "name": "Game",
                "family": Scene,
                "vfl": [
                    'H:|~[One(One.height)]~|',
                    'H:|~[One(<=80%)]~|',
                    'V:|~[One(One.width)]~|',
                    'V:|~[One(<=80%)]~|',
                    ],
                "componentList": {
                    "One": {
                        "name": "One",
                        "family": Container,
                        "config": "",
                        "vfl": [
                            "H:|[box00(square)][box01(square)][box02(square)]|",
                            "H:|[box10(square)][box11(square)][box12(square)]|",
                            "H:|[box20(square)][box21(square)][box22(square)]|",
                            "V:|[box00(square)]~|",
                            "V:|[box01(square)]~|",
                            "V:|[box02(square)]~|",
                            "V:|~[box10(square)]~|",
                            "V:|~[box11(square)]~|",
                            "V:|~[box12(square)]~|",
                            "V:|~[box20(square)]|",
                            "V:|~[box21(square)]|",
                            "V:|~[box22(square)]|",
                            "HV:|[square(33.33%)]~|"
                            
                        ],
                        "componentList": {
                            "box00": {
                                "name": "box00",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box01": {
                                "name": "box01",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box02": {
                                "name": "box02",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box10": {
                                "name": "box10",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box11": {
                                "name": "box11",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box12": {
                                "name": "box12",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box20": {
                                "name": "box20",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box21": {
                                "name": "box21",
                                "family": Container,
                                "vfl":"HV:|[sprite]|",
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    }
                                }
                            },
                            "box22": {
                                "name": "box22",
                                "family": Container,
                                "vfl":[
                                    "HV:|[sprite]|",
                                    "HV:|[animatedSprite]|"
                                    ],
                                "componentList":{
                                    "sprite":{
                                        "name":"sprite",
                                        "family":Sprite
                                    },
                                    "animatedSprite":{
                                        "name":"animatedSprite",
                                        "family":AnimatedSprite
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }