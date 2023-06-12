import firebase from "firebase";

const db = firebase.initializeApp({
  apiKey: "zwQrtyBKPbLPhu7FJROBX60jj6975Eqh3VwGCYuT",
  databaseURL: "https://dwf-m6-capx-default-rtdb.firebaseio.com",
  authDomain: "dwf-m6-capx-default-rtdb.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb };
