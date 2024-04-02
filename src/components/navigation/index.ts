// import { Router } from "../../router";
import template from "./template.html?raw";

export class Navigation {
  // private router: Router;

  // constructor(router: Router) {
  //   this.router = router;
  // }

  render(containerId: string) {
    const container = document.querySelector(containerId);

    if (!container) {
      console.error("No container");
      return;
    }

    const navContainer = document.createElement("nav");
    navContainer.innerHTML = template;

    container.prepend(navContainer);

    // this.attachEventListeners();
  }

  // private attachEventListeners() {
  //   document.getElementById("goHome")?.addEventListener("click", () => {
  //     this.router.navigate("/");
  //   });
  //   document.getElementById("goAbout")?.addEventListener("click", () => {
  //     this.router.navigate("/box");
  //   });
  // }
}
