import firebase from "firebase";
import firebaseAdmin from "firebase-admin";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import { db } from "./db";

const app = express();
const port = 3152;

app.get("/chatrooms", (req, res) => {
  const chatRoomsRef = db.ref("/chatroom/messages/");

  chatRoomsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    const randomId = uuidv4();
    console.log(randomId);
    res.send(randomId + data);
  });
});

app.post("/");

app.listen(port, () => {
  console.log("API listening on: ", port);
});
