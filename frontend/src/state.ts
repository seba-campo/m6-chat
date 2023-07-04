"use strict";

// import { API_URL_BASE } from ".";
import { rtdb } from "./db";

const API_URL_BASE = "http://localhost:3152"

type Message = {
  from: string;
  message: string;
};

export const state = {
  data: {
    name: "",
    messages: [],
  },
  listeners: [],
  init() {
    const chatroomRef = rtdb.ref("chatroom/messages");
    const currentState = this.getState();

    chatroomRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      currentState.messages = messagesFromServer.messages
      console.log(currentState)
      this.setState(currentState)
    });
  },
  subscribe() { 
    // recibe callbacks para ser avisados posteriormente
  },
  getState() {
    return this.data;
  },
  setName(nombre: string) {
    const cs = this.getState();
    cs.name = nombre;
    this.setState(cs);
  },
  pushMessage(message) {
    fetch(API_URL_BASE + "/messages", {
      method: "post",
      body: JSON.stringify(message),
    });
  },
  getMessages() {
    const messagesFromRtdb = fetch(API_URL_BASE + "/messages")
    
    messagesFromRtdb.then((res) => {
        res.json();
      })
    messagesFromRtdb.then((data) => {
        return data.json;
      });

    return messagesFromRtdb
  },
  setState(newState) {
    // localStorage.setItem("currentState", JSON.stringify(newState));
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }

    console.log("Se corrió setState() con: ", newState);
  },
};
