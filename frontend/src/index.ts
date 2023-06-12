import "./pages/home";
import "./pages/chat";
import "./router";
import { state } from "./state";

export const API_URL_BASE = "http://localhost:3152";

function main() {
  state.init();
  console.log("hola");
}

main();
