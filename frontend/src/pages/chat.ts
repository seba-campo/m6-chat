import { Router } from "@vaadin/router";
import { state } from "../state";
import map from "lodash/map";
import { log } from "console";

type Message = {
    from: string;
    message: string;
};

class Chat extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
        super();
    }
    connectedCallback() {
        const messagesFromState = state.getMessages();

        if (messagesFromState.length != 0) {
            this.messages = messagesFromState;
            this.render();
        } else {
            console.log("inicializo");
            state.init();
            console.log("obtengo");
            setTimeout(() => {
                const newMessages = state.getMessages();
                this.messages = newMessages;
                this.render();
            }, 1000);
        }
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
          <p>${this.messages.map((element) => {
              return `
              <div class="message-div">
                <div class="message-from-div">
                  <p class="message-from">${element.from}</p>
                </div>
                <div class="message-text-div">
                  <p class="message-text">${element.message}</p>
                </div>
              </div>
              `;
          })}
            </p>
        </div>
        <form class="input-msj-form">
            <input type="text" class="input-text" placeholder="escribe tu mensaje aqui">
            <button class="input-btn">></button>
        </form>
      </div>
      `;

        style.textContent = `
      .chat-root-div{
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
        background-color: #cacaca;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      .chat-root-div__messages{
        width: 60vw;
        height: 80vh;
        background-color: #cfcfcf;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
      }

      .message-div{
        max-width: 10vw;
        max-height: 14vh;
        background-color: white;
        display: flex; 
        flex-direction: column;
        background-color: #e3e3e3
      }

      .message-from{
        margin: 0;
        font-size: 15px;
      }

      .message-text{
        margin: 0;
        font-size: 10px;  
      }
      `;

        const formMsj = root.querySelector(".input-msj-form");
        const msjEl = root.querySelector(".input-text") as HTMLInputElement;
        const msjBtn = root.querySelector(".input-btn");

        formMsj?.addEventListener("submit", (e) => {
            e.preventDefault();
            state.pushMessage(msjEl.value);
            console.log(msjEl.value);
        });

        this.shadow.appendChild(style);
        this.shadow.appendChild(root);
    }
}

customElements.define("chat-element", Chat);
