import { Router } from "@vaadin/router";
import { state } from "./state";

const router = new Router(document.querySelector(".root"));
const actualUrl = window.location.origin;
if(actualUrl.startsWith("http://localhost")){
  state.setDeployedStatus(false);
  router.setRoutes([
    { path: "/", component: "home-element" },
    { path: "/chat", component: "chat-element" },
  ]);
}
else{
  state.setDeployedStatus(true);
  router.setRoutes([
    { path: "/m6-chat/", component: "home-element" },
    { path: "/m6-chat/chat", component: "chat-element" },
  ]);
}