import { MorphingShape } from "../../threejs/MorphingShape";
import { Component } from "../../types";
import template from "./template.html?raw";

export class MorphingShapePage implements Component {
  render(container: HTMLElement) {
    container.innerHTML = template;

    requestAnimationFrame(() => {
      new MorphingShape("#morphing-container");
    });
  }
}
