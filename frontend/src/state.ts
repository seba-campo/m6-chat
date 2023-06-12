"use strict";

import { API_URL_BASE } from ".";
import { rtdb } from "./db";

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

    chatroomRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      console.log(messagesFromServer);
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
    fetch(API_URL_BASE + "/messages", {
      method: "get",
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        return data;
      });
  },
  setState(newState) {
    // localStorage.setItem("currentState", JSON.stringify(newState));
    this.data = newState;

    for (const cb of this.listeners) {
      cb();
    }

    console.log("Se corrió setState() con: ", newState);
  },
  //   initState() {
  //     const computerPlay = this.generateComputerPlay();

  //     const initialState = {
  //       currentGame: { myPlay: "undefined", computerPlay: computerPlay },
  //       history: [],
  //       points: {
  //         computer: 0,
  //         player: 0,
  //       },
  //     };

  //     this.setState(initialState);
  //   },
};
