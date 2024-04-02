import { SpinningBox } from "../../threejs/SpinningBox";
import { Component } from "../../types";
import template from "./template.html?raw";

export class BoxPage implements Component {
  render(container: HTMLElement) {
    container.innerHTML = template;

    requestAnimationFrame(() => {
      new SpinningBox("#box-container");
    });
  }
}
