
// import { sayHello } from "./greet";

// function showHello(divName: string, name: string) {
//     const elt = document.getElementById(divName);
//     elt.innerText = sayHello(name);
//     console.info(PIXI);
// }

// showHello("greeting", "TypeScript");
import { MainSceneBlueprint } from "./Game/MainSceneBlueprint";
import { Application } from './Foundation/GameObjects/Application';



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
  
  app.preloadScene(MainSceneBlueprint);
  console.info(app);
}
setup();




