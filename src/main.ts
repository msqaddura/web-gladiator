
// import { sayHello } from "./greet";

// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt.innerText = sayHello(name);
//     console.info(PIXI);
// }

// showHello("greeting", "TypeScript");
import { App } from "./Game/MainSceneStructure";
import { AutoLayoutAdapter } from "./Adapter/AutolayoutAdapter";
import { ComponentBuilder } from "./Builder/ComponentBuilder";
import { ManifestLoader } from './Loader/ManifestLoader';

const ml = new ManifestLoader();
console.info(ml);
PIXI.loader
  .add([
    "Resources/bunny.png",
    "Resources/squareC.png",
    "Resources/e.png",
    "Resources/fighter.json"
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




