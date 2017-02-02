
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
import { Sprite } from "./Component/Primitive/Sprite";
import { AutoLayoutAdapter } from "./Adapter/AutolayoutAdapter";
import { ComponentBuilder } from "./Builder/ComponentBuilder";

  const  app = {
        "name": "Application",
        "family": Application,
        "config": null,
        "componentList": {
            "Game": {
                "name": "Game",
                "family": Scene,
                "vfl": [
                    'H:|[One(100%)]|',
                    'V:|[One(100%)]|'
                    ],
                "componentList": {
                    "Container": {
                        "name": "One",
                        "family": Container,
                        "config": "",
                        "vfl": [
                            'H:|~[Two(50)]~|',
                            'V:|~[Two(50)]~|'
                        ],
                        "componentList": {
                            "Container": {
                                "name": "Two",
                                "family": Sprite
                            }
                        }
                    }
                }
            }
        }
    }


PIXI.loader
  .add([
    "images/bunny.png",
    "images/e.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log("loading"); 
}

function setup() {
  console.log("setup");
  const cb = new ComponentBuilder(app);
  console.info(cb);
  document.body.appendChild(cb.root.canvas);
  console.info(AutoLayoutAdapter.getInstance());
}




