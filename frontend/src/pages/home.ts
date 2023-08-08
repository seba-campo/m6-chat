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
            <h5 class="welcome-name">Email</h5>
            <input type="text" class="welcome-input" name="name" id="email" placeholder="example@example.com">

            <h5 class="welcome-name">Nombre</h5>
            <input type="text" class="welcome-input" name="name" id="name" placeholder="Tu nombre aqui">

            <h5 class="welcome-name">Room</h5>
            <select class="welcome-input" id="select">
            <option value="new-room">Nueva room</option>
            <option value="pre-room">Room existente</option>
            </select>

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
        align-items: center;
        justify-content: flex-start;
        height: 93vh;
        padding: 40px 0;
      }

      .welcome-title{
        color: #3ad900;
        font-size: 34px;
      }
      
      .welcome-name{
        color: #cc00ff;
        font-size: 20px;
      }

      .welcome-input-div{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 200px;
        justify-content: space-between;
      }

      .welcome-input{
        font-size: 20px;
        width: 30vw;
      }

      .welcome-start-button{
        margin: 50px 0px;
        border: 0px;
        height: 55px;
        width: 30vw;
        font-size: 25px;
        font-weight: 600;
        background-color: #cc00ff;
      }
      `;

    const button = root.querySelector(".welcome-start-button");
    const nameInput = root.querySelector(".welcome-input") as HTMLInputElement;

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
