import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { rtdb, db } from "./db";


const app = express();
const port = 3152;

app.use(cors());
app.use(bodyParser.json());
const userRef = db.collection("users");

// REGISTRO
app.post("/signup", (req, res) => {
    const email = req.body.email;
    const nombre = req.body.nombre

    userRef.where("email", "==", email).get().then((dbResponse)=>{
        // verifico si existe
        if(dbResponse.empty){
            userRef.add({
                email,
                nombre
            }).then((newUserRef)=>{
                res.json({id: newUserRef.id})
            })
        }else{
            res.status(400).json({
                message: "user already exists"
            })
        }
    })
}); 

// LOGIN
app.post("/auth", (req,res)=>{
    const email = req.body.email;

    userRef.where("email", "==", email).get().then((dbResponse)=>{
        // verifico si existe
        if(dbResponse.empty){
            res.status(400).json({
                message: "user does not exists"
            })
        }else{
            res.json({id: dbResponse.docs[0].id})
        }
    })
})

// Crear ROOM
app.post("/room", (req,res)=>{
    // Obtengo el userID
    const userId = req.body.userId;
    // Busco en la collection, un document con ese ID
    userRef.doc(userId).get().then(doc=>{
        if(doc.exists){
            rtdb.ref("rooms/",)
        }
    })
})

// Ingrear a ROOM
app.get("/room/:id", (req,res)=>){
    
}
app.listen(port, () => {
    console.log("API listening on: ", port);
});
