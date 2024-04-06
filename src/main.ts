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

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("router-view");
  const navigation = new Navigation();

  const routes: Route[] = [
    { path: "/", component: new HomePage(), children: [] },
    {
      path: "/threejs-components",
      component: new ComponentsPage(),
      children: [
        { path: "/box", component: new BoxPage() },
        { path: "/world", component: new WorldPage() },
        { path: "/space", component: new SpacePage() },
      ],
    },
  ];

  routes.forEach((route: Route) => {
    router.addRoute(route.path, route.component, route.children);
  });

  router.resolve();

  navigation.render("#app");
});
