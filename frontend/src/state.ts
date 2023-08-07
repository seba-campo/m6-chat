"use strict";

// import { API_URL_BASE } from ".";
import { rtdb } from "./db";

const API_URL_BASE = "http://localhost:3152";

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
            var messagesToAppend: any = [];
            for (const key in messagesFromServer) {
                messagesToAppend.push(messagesFromServer[key]);
            }
            currentState.messages = messagesToAppend;
            this.setState(currentState);
        });
    },
    subscribe(cb: (any) => any) {
        // recibe callbacks para ser avisados posteriormente
        this.listeners.push(cb);
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
        const nombreDelState = this.data.name;
        fetch(API_URL_BASE + "/messages", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                from: nombreDelState,
                message: message,
            }),
        });
    },
    getMessages() {
        const messageList = this.getState();
        return messageList.messages;
    },
    setState(newState) {
        this.data = newState;
        for (const cb of this.listeners) {
            cb();
        }
    },
};
