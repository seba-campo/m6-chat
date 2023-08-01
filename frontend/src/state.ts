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
      // currentState.messages = messagesFromServer.messages
      // console.log(messagesFromServer)
      currentState.messages = messagesFromServer;
      
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
  pushMessage(message: string) {
    const cs = this.getState();
    const messageToSend: Message = {
      from: cs.name,
      message: message
    };

    fetch(API_URL_BASE + "/messages", {
      method: "post",
      body: JSON.stringify(messageToSend),
    });
  },
  getMessages() {
    const messageList = this.getState();
    return messageList.messages
  },
  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
  },
};
