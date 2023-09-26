"use strict";

// import { API_URL_BASE } from ".";
import { rtdb } from "./db";

const pathName = window.location.href;

var API_URL_BASE = "";

if(pathName.startsWith("http://localhost")){
  API_URL_BASE = "http://localhost:3152";
}
else{
  API_URL_BASE = "https://api-chat-v2.onrender.com"
}


type Message = {
    from: string;
    message: string;
};

export const state = {
    data: {
        name: "",
        email: "",
        userId: "",
        chatroomId: "",
        rtdbChatroomId: "",
        messages: [],
        deployed: false,
    },
    listeners: [],
    initChat(callback) {
        const cs = this.getState();
        const chatroomRef = rtdb.ref("/rooms/" + cs.rtdbChatroomId);

        chatroomRef.on("value", (snapshot) => {
            const messagesFromServer = snapshot.val(); 
            var messagesToAppend: any = [];
            for (const key in messagesFromServer.messages) {
                messagesToAppend.push(messagesFromServer.messages[key]);
            }
            cs.messages = messagesToAppend;
            this.setState(cs);
        });

        callback();
    },
    subscribe(cb: (any) => any) {
        // recibe callbacks para ser avisados posteriormente
        this.listeners.push(cb);
    },
    getState() {
        return this.data;
    },
    setNameAndMail(nombre: string, mail: string){
        const cs = this.getState();
        cs.name = nombre;
        cs.email = mail;
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
    setRtdbId(rtdbId: string){
        const cs = this.getState();
        cs.rtdbChatroomId = rtdbId;
        this.setState(cs);
    },
    login(callback){
        const cs = this.getState();

        if(cs.email){
            fetch(API_URL_BASE + "/auth", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    email: cs.email
                }),
            }).then((res)=>{
                if(res.status == 200){
                    return res.json();
                }
                else{
                    console.log("New user, registering...")
                    return this.registerNewUser()
                }
            }).then((data)=>{
                this.setUserId(data.id);
                callback();
            });
        }
    },
    registerNewUser(callback){
        const cs = this.getState();

        return fetch(API_URL_BASE + "/signup", {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                nombre: cs.name,
                email: cs.email
            }),
        }).then((res)=>{
            return res.json();
        })
    },
    createRoom(callback){
        const cs = this.getState();
        if(cs.userId){
            fetch(API_URL_BASE + "/rooms", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    userId: cs.userId
                })
            }).then(res=>{
                return res.json();
            }).then(data =>{
                this.setChatroomId(data.id);
                callback();
            });
        }
    },
    connectToRoom(callback){
        const cs = this.getState();
        if(cs.userId && cs.chatroomId){
            fetch(API_URL_BASE + "/rooms/"+ cs.chatroomId + "?userId=" + cs.userId).then(res=>{
                return res.json();
            }).then(data =>{
                this.setRtdbId(data.rtdbRoomId);
                callback();
            });
        }
    },
    pushMessage(message: string) {
        const cs = this.getState();

        if(cs.rtdbChatroomId){
            fetch(API_URL_BASE + "/messages/" + cs.rtdbChatroomId, {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    from: cs.name,
                    message: message,
                }),
            });
        }
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
    setDeployedStatus(status: boolean){
        const cs = this.getState();
        cs.deployed = status;
        this.setState(cs);
    },
};
