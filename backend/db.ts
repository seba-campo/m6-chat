// import * as firebase from "firebase-admin";  
import  firebase from "firebase"

const app = firebase.initializeApp({
    apiKey: "zwQrtyBKPbLPhu7FJROBX60jj6975Eqh3VwGCYuT",
    databaseURL: "https://dwf-m6-capx-default-rtdb.firebaseio.com",
    authDomain: "dwf-m6-capx-default-rtdb.firebaseapp.com"    
})

const db = firebase.database();

const chatRoomsRef = db.ref('/chatrooms/2353');

chatRoomsRef.on('value', (snapshot) => {
    const data = snapshot.val();
    console.log(data)
}); 

export { db }

