import { Router } from "@vaadin/router";

class Chat extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    // Always call super first in constructor
    super();
    this.render();
    // write element functionality in here
  }
  render() {
    const root = document.createElement("div");
    const style = document.createElement("style");

    root.innerHTML = `
      <h1>CHAT PAGE</h1>
      `;

    style.textContent = `

      }
      `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(root);
  }
}

customElements.define("chat-element", Chat);
