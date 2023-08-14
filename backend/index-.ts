import firebase from "firebase";
import firebaseAdmin from "firebase-admin";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { rtdb, db } from "./db";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3152;

app.use(cors());
app.use(bodyParser.json());

app.get("/chatroom", (req, res) => {
    const chatRoomsRef = rtdb.ref("/chatroom/");

    chatRoomsRef.on("value", (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        res.send(data);
    });
    const userRef = db.collection("users");
    console.log(userRef.doc("7L3ZeTEkN4JegZxZ9TS5").);
}); 

app.get("/messages", (req, res) => {
    const chatRoomsRef = rtdb.ref("/chatroom/messages/");

    chatRoomsRef.on("value", (snapshot) => {
        const response = snapshot.val();
        res.send(response);
        console.log(response);
    });
});

app.post("/messages", (req, res) => {
    const chatRoomsRef = rtdb.ref("/chatroom/messages/");
    chatRoomsRef.push(req.body, () => {
        console.log(req.body);
        res.json(req.body + "todo ok");
    });
});

app.listen(port, () => {
    console.log("API listening on: ", port);
});
