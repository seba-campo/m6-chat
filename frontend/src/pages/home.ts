import { Router } from "@vaadin/router";
import { state } from "../state";

class Home extends HTMLElement {
  shadow = this.attachShadow({ mode: "open" });
  constructor() {
    // Always call super first in constructor
    super();
    this.render();
    state.init();
  }
  render() {
    const root = document.createElement("div");
    const style = document.createElement("style");

    root.innerHTML = `
      <div class="container">
        <div class="header"></div>
        <div class="welcome-container">
          <div class="welcome-text-div">
            <h2 class="welcome-title">Bienvenido</h2>
          </div>
          <div class="welcome-input-div">
            <h5 class="welcome-name">Tu nombre</h5>
            <input type="text" class="welcome-name-input" name="name" id="" placeholder="Tu nombre aqui">
            <button class="welcome-start-button">Comenzar</button>
          </div>
        </div>
      </div>
      `;

    style.textContent = `
      .container{
          display: flex;
          flex-direction: column;
      }
      
      .header{
          height: 7vh;
          background-color: #2D2B55;
      }   

      .welcome-container{
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #1E1D40;
        display: flex;
        flex-direction: column;
        flex-flow: column;
        align-items: center;
        height: 93vh;
        padding: 40px 0;
      }

      .welcome-title{
        color: #3ad900;
        font-size: 30px;
      }
      
      .welcome-name{
        color: #cc00ff;
        font-size: 17px;
      }

      .welcome-input-div{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        justify-content: space-between;
      }

      .welcome-name-input{
        height: 45px;
        width: 60vw;
      }



      .welcome-start-button{
        border: 0px;
        height: 45px;
        width: 60vw;
        font-size: 15px;
        font-weight: 600;
        background-color: #cc00ff;
      }
      `;

    const button = root.querySelector(".welcome-start-button");
    const nameInput = root.querySelector(".welcome-name-input") as HTMLInputElement;

    button?.addEventListener("click", () => {
      const nameToSend = nameInput?.value;
      state.setName(nameToSend);

      Router.go("/chat");
    });

    this.shadow.appendChild(style);
    this.shadow.appendChild(root);
  }
}

customElements.define("home-element", Home);
