import { Router } from "@vaadin/router";
import { state } from "../state";

type Message = {
  from: string;
  message: string;
};

class Chat extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    super();
  }
  async connectedCallback() {
    this.render();

    const nameInState = state.getState();
    const messagesFromRtdb = state.getMessages();

    console.log(await messagesFromRtdb) 
  }
  messages: Message[] = [];
  render() {
    const root = document.createElement("div");
    const style = document.createElement("style");

    root.innerHTML = `
      <div class="chat-root-div">
        <div class="chat-root-div__title-div">
          <h1 class="chat-root-div__tile-h1">CHAT PAGE</h1>  
        </div>

        <div class="chat-root-div__messages">
          <p>${this.messages.forEach((element) => {
            return `
              <p>${element.from}</p>
              <p>Message: ${element.message}</p>
            `;
          })}</p>
        </div>
      </div>

      `;

    style.textContent = `

      }
      `;

    this.shadow.appendChild(style);
    this.shadow.appendChild(root);
  }
}

customElements.define("chat-element", Chat);
