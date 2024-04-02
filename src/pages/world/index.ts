import { World } from "../../threejs/World";
import { Component } from "../../types";
import template from "./template.html?raw";

export class WorldPage implements Component {
  render(container: HTMLElement) {
    container.innerHTML = template;

    requestAnimationFrame(() => {
      new World("#world-container");
    });
  }
}
