import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAouocSzo1Xcj1wbbihS77KBogMseejUPI",
  authDomain: "slack-clone-1eeae.firebaseapp.com",
  projectId: "slack-clone-1eeae",
  storageBucket: "slack-clone-1eeae.appspot.com",
  messagingSenderId: "709522978342",
  appId: "1:709522978342:web:76f678de298236f73998e7",
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, db, provider };
