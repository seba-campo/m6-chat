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
            <input type="text" class="email-input" name="name" id="email" placeholder="example@example.com">

            <h5 class="welcome-name">Nombre</h5>
            <input type="text" class="welcome-input" name="name" id="name" placeholder="Tu nombre aqui">

            <h5 class="welcome-name">Room</h5>
            <select class="welcome-input" id="select">
              <option id="option__nueva-room" value="new-room">Nueva room</option>
              <option id="option__pre-room" value="pre-room">Room existente</option>
            </select>

            <div class="room-id-div">
              <h5 class="welcome-name">Room</h5>
              <input type="text" class="welcome-input" name="name" id="name" placeholder="Tu nombre aqui">
            </div>

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
        justify-content: space-around;
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
        height: 93vh;
        justify-content: space-between;
      }

      .welcome-input{
        font-size: 20px;
        width: 30vw;
      }

      .welcome-start-button{
        margin: 20px 0px;
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
    const mailInput = root.querySelector(".email-input") as HTMLInputElement;

    const select = root.querySelector('select');
		

    button?.addEventListener("click", () => {
      const userName = nameInput?.value;
      const userMail = mailInput.value;
      const selectedOption = select?.options[select.selectedIndex].value;

      // intento LOGIN
      state.tryLogin(userMail)
        .then((res)=>{

          if(res.status == 200){
            return res.json()
          }
          else{
            // Usuario no existe, lo registro
            state.registerNewUser(userName, userMail)
              
              .then((res)=>{
                return res.json()
              })
              .then((data)=>{
                // consoleo ID
                console.log(data)
                state.setUserId(data.id)
                state.setName(userName)
                if(selectedOption == "pre-room"){
          
                }
        
                if(selectedOption == "new-room"){
                  const cs = state.getState();
                  const userId = cs.userId;
                  const newCreatedRoom = state.createRoom(userId)
                  newCreatedRoom.then((res)=>{
                    console.log(res)
                  });        
                }
              })
          }

        }).then((data)=>{
          // consoleo ID
          state.setUserId(data.id)
          state.setName(userName)
          if(selectedOption == "pre-room"){
          
          }
  
          if(selectedOption == "new-room"){
            const cs = state.getState();
            const userId = cs.userId;
            const newCreatedRoom = state.createRoom(userId)
            newCreatedRoom.then((res)=>{
              console.log(res)
            });  
          }
        });

   

        // if(selectedOption == "pre-room"){
          
        // }

        // if(selectedOption == "new-room"){
        //   const cs = state.getState();
        //   console.log(cs)
        //   const userId = cs.userId;
        //   console.log(userId)
        //   // const newCreatedRoom = state.createRoom(userId)
        //   // newCreatedRoom.then((res)=>{
        //   //   console.log(res)
        //   // });
        //   // state.setChatroomId(newCreatedRoom)

        // }

        // console.log(selectedOption)
    });

   



    this.shadow.appendChild(style);
    this.shadow.appendChild(root);
  }
}

customElements.define("home-element", Home);
