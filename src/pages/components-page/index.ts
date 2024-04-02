import { Component } from "../../types";
import template from "./template.html?raw";

export class ComponentsPage implements Component {
  render(container: HTMLElement) {
    container.innerHTML = template;
  }
}
