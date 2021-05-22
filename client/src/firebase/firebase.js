import firebase from "firebase";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBlQ6FFB9OryiGo3cFkwErWaORMT__Yxq0",
  authDomain: "readme-nodet.firebaseapp.com",
  databaseURL:
    "https://readme-nodet-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "readme-nodet",
  storageBucket: "readme-nodet.appspot.com",
  messagingSenderId: "670378586734",
  appId: "1:670378586734:web:81492dde403ef7399c2c7f",
  measurementId: "G-B7Q3JPW706",
});

export const auth = firebase.auth();
export const db = app.database();
export default firebase;

// Setting up google auth provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
