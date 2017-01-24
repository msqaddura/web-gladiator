import * as PIXI from 'pixi.js'
import {Mixin} from '@alizurchik/ts-mixin';
import * as MIX from 'mixin';
class Container{
  constructor(){
    this.shit()
  }
  shit(){
    alert("SHIT");
  }
  bitch() {
    alert('Bitch');
  }
}
 

export class PIXI_CONTAINER extends PIXI.Container{
  constructor() {
    super(); // mandatory! it will trigger each mixed class's constructor
    this.bitch(); 
  }
} 


let whore = MIX(PIXI_CONTAINER,Container);
new whore();
// applyMixins(PIXI_CONTAINER, [Container]);

// //let smartObj = new PIXI_CONTAINER();

// function applyMixins(derivedCtor: any, baseCtors: any[]) {
//     baseCtors.forEach(baseCtor => {
//         Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
//             derivedCtor.prototype[name] = baseCtor.prototype[name];
//         });
//     });
// }
alert('fck');