import { Component } from "../../types";
import template from "./template.html?raw";

export class HomePage implements Component {
  async render(container: HTMLElement) {
    container.innerHTML = template;
  }
}
