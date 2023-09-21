import { Router } from "@vaadin/router";
import { state } from "../state";
import map from "lodash/map";

type Message = {
    from: string;
    message: string;
};

class Chat extends HTMLElement {
    // shadow = this.attachShadow({ mode: "open" });
    constructor() {
        super();
    }
    connectedCallback() {
      state.subscribe(() => {
          const cs = state.getState();
          this.messages = cs.messages;
          console.log(cs.messages)
          this.render();
      });

      const newMessages = state.getMessages();
      this.messages = newMessages;
      setTimeout(() => {
          this.render();
      }, 500);
    }
    messages: Message[] = [];
    addListeners() {
      const formMsj = this.querySelector(".input-msj-form");
      const msjEl = this.querySelector(".input-text") as HTMLInputElement;

      formMsj?.addEventListener("submit", (e) => {
          e.preventDefault();
          state.pushMessage(msjEl.value);
      });
    }
    render() {
        this.innerHTML = `
      <div class="chat-root-div">
        <div class="chat-root-div__title-div">
          <h1 class="chat-root-div__tile-h1">CHAT PAGE</h1>  
        </div>

        <div class="chat-root-div__messages">
          <p>${this.messages
              .map((element) => {
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
              })
              .join("")}
            </p>
            </div>
            <form class="input-msj-form">
                <input type="text" class="input-text" placeholder="escribe tu mensaje aqui">
                <button class="input-btn">Enviar</button>
            </form>
      </div>
      `;
      this.addListeners();

      const style = document.createElement("style");
      style.textContent = `
      .chat-root-div{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center; 
        align-items: center;
        background-color: #1E1D40;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        color: #3ad900;
      }

      .chat-root-div__messages{
        width: 60vw;
        height: 80vh;
        background-color: #2D2B55;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: flex-start;
        padding: 25px 30px;
      }

      .message-div{
        filter: opacity(100%);
        max-width: 10vw;
        max-height: 14vh;
        padding: 8px 4px;
        display: flex; 
        flex-direction: column;
        background-color: #025c4c;
        color: #ccdedb;
        border-radius: 4px;
      }

      .message-from{
        margin: 0;
        font-size: 15px;
        font-weight: 600;
      }

      .message-text{
        margin: 0;
        font-size: 10px;  
      }

      .input-msj-form{
        align-self: center;
        display: flex;
        flex-direction: column;
        height: 10vh;
        align-items: center;
        justify-content: space-evenly;
      }
      
      .input-text{
        width: 70vh;
        height: 35px;
      }
      .input-btn{
        width: 70vh;
        height: 35px;
        border-radius: 4px;
        border: 0px solid;
        font-size: 15px;
        font-weight: 600;
        background-color: #cc00ff;
      }

      .right{
        align-self: flex-end
      }
      `;

      this.appendChild(style);
    }
}

customElements.define("chat-element", Chat);
