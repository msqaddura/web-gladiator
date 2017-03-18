
// import { sayHello } from "./greet";

// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt.innerText = sayHello(name);
//     console.info(PIXI);
// }

// showHello("greeting", "TypeScript");
import { MainSceneStructure } from "./Game/MainSceneStructure";
import { AutoLayoutAdapter } from "./Adapter/AutolayoutAdapter";
import { ComponentBuilder } from "./Builder/ComponentBuilder";
import { ManifestLoader } from './Loader/ManifestLoader';
import { Application } from "./Component/Primitive/Application";

const ml = new ManifestLoader();
console.info(ml);


function loadProgressHandler() {
  console.log("loading"); 
}

function setup() {
  // console.log("setup");
  // const cb = new ComponentBuilder(MainSceneStructure);
  // console.info(cb);
  // document.body.appendChild(cb.root.canvas);
  // console.info(AutoLayoutAdapter.getInstance());
  let app = new Application(null,{
    vfl:["HV:|[MainScene(100%)]|"],
    name:"Application"
  });
  
  app.preloadScene(MainSceneStructure);
  console.info(app);
}
setup();




