
// import { sayHello } from "./greet";

// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt.innerText = sayHello(name);
//     console.info(PIXI);
// }

// showHello("greeting", "TypeScript");
import { Component } from "./Component/Base/Component";
import { Container } from "./Component/Primitive/Container";
import { Scene } from "./Component/Primitive/Scene";
import { Application } from "./Component/Primitive/Application";
import { PIXI_CONTAINER } from "./Component/Primitive/PIXI_Container"
const full = {
    "Application": {
        "name": "Application",
        "family": Application,
        "param": [12345],
        "components": {
            "Game": {
                "name": "Game",
                "family": Scene,
                "params": [5555],
                "components": {
                    "Container": {
                        "name": "One",
                        "family": Container,
                        "vfl": "",
                        "param": [1111],
                        "components": {
                            "Container": {
                                "name": "Two",
                                "family": Container,
                                "vfl": "",
                                "param": [2222]
                            }
                        }
                    }
                }
            }
        }
    }
}

const app = new Application(null, full.Application);
document.body.appendChild(app._view);

const x = new PIXI_CONTAINER();

console.info("yxxxay",app);
alert("ONE");