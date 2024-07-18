const firebase = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://my-portofolio-1731c-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "my-portofolio-1731c.appspot.com"
});

// Get a reference to the services
const database = firebase.database();  // for Realtime Database
const db = firebase.firestore();       // for Firestore
const storage = firebase.storage();    // for Storage

module.exports = { database, db, storage };
