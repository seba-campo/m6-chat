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
        userId: "",
        chatroomId: "",
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
    setUserId(id: string){
        const cs = this.getState();
        cs.userId = id;
        this.setState(cs);
    },
    setChatroomId(chatRoomid: string){
        const cs = this.getState();
        cs.chatroomId = chatRoomid;
        this.setState(cs);
    },
    tryLogin(email: string){
        return fetch(API_URL_BASE + "/auth", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                email: email
            }),
        });
    },
    registerNewUser(name: string,email: string){
        return fetch(API_URL_BASE + "/signup", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                nombre: name,
                email: email
            }),
        });
    },
    createRoom(userId: string){
        return fetch(API_URL_BASE + "/rooms", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                userId: userId
            })
        });
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
