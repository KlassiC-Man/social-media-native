import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDJ8M9JvanrfEzHdM1w4fpetgEPtwCxCCg",
    authDomain: "soci-8909e.firebaseapp.com",
    projectId: "soci-8909e",
    storageBucket: "soci-8909e.appspot.com",
    messagingSenderId: "41802362418",
    appId: "1:41802362418:web:c5f24d0ea62646f398962b",
    measurementId: "G-DD02T45T6Y"
  };

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};