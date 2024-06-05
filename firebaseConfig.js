const firebase = require('firebase-admin');

require('firebase/database');  // for Realtime Database
require('firebase/firestore'); // for Firestore
require('firebase/storage');   // for Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7mENR0QbAkfNRqC0zcG5sXN-86zbe4uc",
  authDomain: "my-portofolio-1731c.firebaseapp.com",
  databaseURL: "https://my-portofolio-1731c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-portofolio-1731c",
  storageBucket: "my-portofolio-1731c.appspot.com",
  messagingSenderId: "997558850211",
  appId: "1:997558850211:web:88b5fb7c819418dc2da516"
};

var serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://my-portofolio-1731c-default-rtdb.asia-southeast1.firebasedatabase.app"
});

// Get a reference to the services
const database = firebase.database();  // for Realtime Database
const db = firebase.firestore();       // for Firestore
const storage = firebase.storage();    // for Storage

module.exports = { database, db, storage };