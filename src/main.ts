import { Router } from "./router";
import {
  HomePage,
  BoxPage,
  ComponentsPage,
  WorldPage,
  SpacePage,
} from "./pages";
import { Navigation } from "./components/navigation";
import { Route } from "./types";
import "./styles/style.scss";
import { MorphingShapePage } from "./pages/morphing-shape";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("router-view");
  const navigation = new Navigation();

  const routes: Route[] = [
    { path: "/", component: new HomePage(router), children: [] },
    {
      path: "/gallery",
      component: new ComponentsPage(),
      children: [
        { path: "/box", component: new BoxPage() },
        { path: "/world", component: new WorldPage() },
        { path: "/space", component: new SpacePage() },
        { path: "/morphing-shape", component: new MorphingShapePage() },
      ],
    },
  ];

  routes.forEach((route: Route) => {
    router.addRoute(route.path, route.component, route.children);
  });

  router.resolve();

  navigation.render("#app");

  const app = document.querySelector("#app");

  const toggleBtn = document.querySelector(
    "#theme-toggle-checkbox"
  ) as HTMLInputElement;

  console.log(toggleBtn);

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    app?.classList.add("dark-mode");
    toggleBtn.checked = true;
  }

  toggleBtn?.addEventListener("change", () => {
    // console.log("toggle  : " + toggleBtn.checked);
    if (toggleBtn.checked) {
      console.log("checked");
      app?.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      app?.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
});
