// Import the functions you need from the SDKs you need

import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCwDfhxQfq4MRYSarg1kYB5GZilE6Y0tcM",

  authDomain: "zenify-dev.firebaseapp.com",

  databaseURL:
    "https://zenify-dev-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "zenify-dev",

  storageBucket: "zenify-dev.appspot.com",

  messagingSenderId: "542241122959",

  appId: "1:542241122959:web:69f726accc5eabbc755efa",

  measurementId: "G-8RNZXP35TY",
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

const db = firebase.database();

export { auth, db };
