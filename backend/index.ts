import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { rtdb, db } from "./db";
import { nanoid } from "nanoid";

const app = express();
const port = 3152;

app.use(cors());
app.use(bodyParser.json());

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
                userRef
                    .add({
                        email,
                        nombre,
                    })
                    .then((newUserRef) => {
                        res.json({ id: newUserRef.id });
                    });
            } else {
                res.status(400).json({
                    message: "user already exists",
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
                    message: "user does not exists",
                });
            } else {
                res.json({ id: dbResponse.docs[0].id });
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
                        messages: ["test"],
                        owner: userId,
                    })
                    .then((rtdbRes) => {
                        const roomLongId = roomRef.key;
                        const roomId = nanoid(4).toLowerCase();
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
    const roomIdSimple = req.params.id;

    // Buscar en la DB si existe el ID
    roomRefDb
        .doc(roomIdSimple?.toString())
        .get()
        .then((doc) => {
            if (doc.exists) {
                // const docRtdbId =
                res.json({
                    roomId: doc.data,
                });
            }
        });
});

app.listen(port, () => {
    console.log("API listening on: ", port);
});
