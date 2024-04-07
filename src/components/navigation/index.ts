import template from "./template.html?raw";

export class Navigation {
  render(containerId: string) {
    const container = document.querySelector(containerId);

    if (!container) {
      console.error("No container");
      return;
    }

    const navContainer = document.createElement("nav");
    navContainer.innerHTML = template;

    container.prepend(navContainer);
  }
}
