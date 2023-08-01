import firebase from "firebase";
import firebaseAdmin from "firebase-admin";
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { db } from "./db";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3152;

app.use(cors());

app.get("/chatroom", (req, res) => {
  const chatRoomsRef = db.ref("/chatroom/");

  chatRoomsRef.on("value", (snapshot) => {
    const data = snapshot.val();
    console.log(data);

    const randomId = uuidv4();
    res.send(data);
  });
});

app.get("/messages", (req, res) => {
  const chatRoomsRef = db.ref("/chatroom/messages/");

  chatRoomsRef.on("value", (snapshot) => {
    const response = snapshot.val();
    res.send(response);
    console.log(response);
  });
});

app.post("/messages", (req, res) => {
  const chatRoomsRef = db.ref("/chatroom/messages/");
  console.log(bodyParser(req.body));
  // console.log(res);

  return false;
  // chatRoomsRef.set({
  //   username: name,
  //   email: email,
  //   profile_picture : imageUrl
  // });
});

app.listen(port, () => {
  console.log("API listening on: ", port);
});
