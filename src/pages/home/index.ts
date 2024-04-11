import { Router } from "../../router";
import { Component } from "../../types";
import template from "./template.html?raw";

export class HomePage implements Component {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  async render(container: HTMLElement) {
    container.innerHTML = template;
    container.querySelector("button")!.onclick = () =>
      this.router.navigate("/gallery");
  }
}
