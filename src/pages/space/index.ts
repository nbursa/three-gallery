import { StarField } from "../../threejs/StarField";
import { Component } from "../../types";
import template from "./template.html?raw";

export class SpacePage implements Component {
  render(container: HTMLElement) {
    container.innerHTML = template;

    requestAnimationFrame(() => {
      new StarField("#space-container");
    });
  }
}
