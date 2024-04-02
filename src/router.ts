import { Component, Route } from "./types";

export class Router {
  private routes: { path: string; component: Component }[] = [];
  private rootElem: HTMLElement;

  constructor(rootElemSelector: string) {
    const root = document.querySelector(`#${rootElemSelector}`) as HTMLElement;

    if (root) {
      this.rootElem = root;
    } else {
      this.rootElem = document.createElement("div");
      this.rootElem.id = rootElemSelector;
      const app = document.querySelector("#app");
      app?.appendChild(this.rootElem);
    }

    window.onpopstate = this.resolve.bind(this);
  }

  addRoute(path: string, component: Component, children: Route[] = []) {
    this.routes.push({ path, component });
    children.forEach((child) => {
      this.addRoute(`${path}${child.path}`, child.component);
    });
  }

  resolve() {
    const path = window.location.pathname;
    const route = this.routes.find((route) => route.path === path);

    if (route) {
      route.component.render(this.rootElem);
    } else {
      this.rootElem.innerHTML = "<h1>404 Not Found</h1>";
    }
  }

  navigate(path: string) {
    window.history.pushState({}, "", path);
    this.resolve();
  }
}
