import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { rtdb, db } from "./db";
import { nanoid } from "nanoid";

const app = express();
const port = 3152;

app.use(bodyParser.json());
app.use(cors());

const userRef = db.collection("users");
const roomRefDb = db.collection("rooms");

// REGISTRO
app.post("/signup", (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre;

    userRef
        .where("email", "==", email)
        .get()
        .then((dbResponse) => {
            // verifico si existe
            if (dbResponse.empty) {
                userRef.add({
                        email,
                        nombre,
                    })
                    .then((newUserRef) => {
                        res.json({ id: newUserRef.id });
                        console.log("User registered - id: " + newUserRef.id);
                    });
            } else {
                res.status(400).json({
                    message: "User already exists",
                });
            }
        });
});

// LOGIN
app.post("/auth", (req, res) => {
    const email = req.body.email;

    userRef
        .where("email", "==", email)
        .get()
        .then((dbResponse) => {
            // verifico si existe
            if (dbResponse.empty) {
                res.status(400).json({
                    message: "User does not exists",
                });
            } else {
                // Retorno el ID del user
                res.json({ id: dbResponse.docs[0].id });
                console.log("User logged in - id: " + dbResponse.docs[0].id);
            }
        });
});

// Crear ROOM
app.post("/rooms", (req, res) => {
    // Obtengo el userID
    const userId = req.body.userId;
    // Busco en la collection, un document con ese ID
    userRef
        .doc(userId)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const roomRef = rtdb.ref("rooms/" + nanoid());

                roomRef
                    .set({
                        messages: ["Chat inicializado"],
                        owner: userId,
                    })
                    .then((rtdbRes) => {
                        const roomLongId = roomRef.key;
                        const roomId = nanoid(4).toUpperCase();
                        // const roomId = 1000 + Math.floor(Math.random() * 999);

                        roomRefDb
                            .doc(roomId.toString())
                            .set({
                                rtdbRoomId: roomLongId,
                            })
                            .then(() => {
                                res.json({
                                    id: roomId,
                                });
                                console.log("Chatroom created - id: " + roomId)
                            });
                    });
            } else {
                console.log(req.body);
                res.status(401).json({
                    message: "User not found",
                });
            }
        });
});

// Ingrear a ROOM, mediante su roomID sencillo
app.get("/rooms/:id", (req, res) => {
    const userId = req.query.userId;
    const roomId = req.params.id;

    userRef
        .doc(userId?.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                roomRefDb
                    .doc(roomId.toString())
                    .get()
                    .then((doc) => {
                        res.json(doc.data());
                    });
            } else {
                console.log(req.body);
                res.status(401).json({
                    message: "User not found",
                });
            }
        });
});

// Obtener mensajes de una ROOM, desde la RTDB
app.get("/messages/:room", (req, res) => {
    const roomId = req.params.room;
    const chatRoomsRef = rtdb.ref("/rooms/" + roomId);

    chatRoomsRef.on("value", (snapshot) => {
        const response = snapshot.val();
        res.send(response);
        console.log(response);
    });
});

// Pushear un mensaje
app.post("/messages/:room", (req, res) => {
    const roomId = req.params.room;
    const chatRoomsRef = rtdb.ref("/rooms/" + roomId + "/messages");

    chatRoomsRef.push(req.body, () => {
        console.log(req.body);
        res.json(req.body + "todo ok");
    });
});

app.listen(port, () => {
    console.log("API listening on: ", port);
});
