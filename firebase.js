// Import the functions you need from the SDKs you need

import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCZdlcajfbxIQ4rglcpYQmPYB_5oKp7eiw",

  authDomain: "zenify-22.firebaseapp.com",

  projectId: "zenify-22",

  storageBucket: "zenify-22.appspot.com",

  messagingSenderId: "791090610440",

  appId: "1:791090610440:web:d878a4a5141c7f5027ecbd",

  measurementId: "G-4D7K3HE56Q",
};

// Initialize Firebase

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
