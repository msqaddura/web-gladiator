
// import { sayHello } from "./greet";

// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt.innerText = sayHello(name);
//     console.info(PIXI);
// }

// showHello("greeting", "TypeScript");
import { App } from "./Game/MainScene";
import { AutoLayoutAdapter } from "./Adapter/AutolayoutAdapter";
import { ComponentBuilder } from "./Builder/ComponentBuilder";

 


PIXI.loader
  .add([
    "images/bunny.png",
    "images/squareC.png",
    "images/e.png",
    "images/fighter.json"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log("loading"); 
}

function setup() {
  console.log("setup");
  const cb = new ComponentBuilder(App);
  console.info(cb);
  document.body.appendChild(cb.root.canvas);
  console.info(AutoLayoutAdapter.getInstance());
}




