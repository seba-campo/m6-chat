// import * as firebase from "firebase-admin";  
import  firebase from "firebase"

const app = firebase.initializeApp({
    apiKey: "zwQrtyBKPbLPhu7FJROBX60jj6975Eqh3VwGCYuT",
    databaseURL: "https://dwf-m6-capx-default-rtdb.firebaseio.com",
    authDomain: "dwf-m6-capx-default-rtdb.firebaseapp.com",
    projectId: "dwf-m6-capx"
})

const rtdb = firebase.database();
const db = firebase.firestore(app)

const chatRoomsRef = rtdb.ref('/chatrooms/2353')

chatRoomsRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data)
}); 



export { rtdb, db }

