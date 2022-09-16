import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import { initializeApp } from "firebase/app"


const firebaseConfig = {
    apiKey: "AIzaSyDNM8BR6mJoSmhXVXl534-sDQzo3jBiQZM",
    authDomain: "restoran-29521.firebaseapp.com",
    projectId: "restoran-29521",
    storageBucket: "restoran-29521.appspot.com",
    messagingSenderId: "522546556489",
    appId: "1:522546556489:web:fe502ef86bc2a588045998"
  };

  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
const fs = firebase.firestore();
const storage = firebase.storage();

export { auth, fs, storage }