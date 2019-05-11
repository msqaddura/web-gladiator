import { IWGObject } from "./IWGObject";
import { Composite } from "./Composite";

import { BlueprintBuilder } from "../Builder/BlueprintBuilder";

export class WGObject extends Composite implements IWGObject {
  readonly blueprint;
  readonly blueprints;
  readonly repeatableBlueprints;

  constructor(
    owner = null,
    { name = "N/A", blueprints = [], repeatableBlueprints = [] }
  ) {
    super(owner, name);
    this.blueprints = blueprints;
    this.repeatableBlueprints = repeatableBlueprints;
  }

  bootstrap(bootstrap) {
    if (!bootstrap) return;
    this.preInitialize();
    this.initialize();
    this.preCreateTree();
    this.createTree();
    this.postCreateTree();
    this.listenToBusEvents();
    this.start();
  }
  preInitialize() {}
  initialize() {}

  preCreateTree() {}
  createTree(bootstrap = true) {
    this.repeatableBlueprints.forEach(tuple => {
      tuple.repeats.forEach(repeat => {
        for (const key in repeat) tuple.repeatable[key] = repeat[key];
        this.addNode(this.createNode(tuple.repeatable, bootstrap));
      });
    });
    this.blueprints
      .flatMap(item => (typeof item === "function" ? item() : item))
      .forEach(blueprint => {
        if (!!!blueprint.lazy)
          this.addNode(this.createNode(blueprint, bootstrap));
      });
  }
  postCreateTree() {}

  createNode(blueprint, bootstrap = true) {
    return BlueprintBuilder.getInstance().createObject(
      this,
      blueprint,
      bootstrap
    );
  }

  start() {}
}
