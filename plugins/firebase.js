import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyBOYoxaEM-K8MLGuzPQ68z3rR2d7Hb1v6U",
    authDomain: "wunderfund-server.firebaseapp.com",
    databaseURL: "https://wunderfund-server.firebaseio.com",
    projectId: "wunderfund-server",
    storageBucket: "wunderfund-server.appspot.com",
    messagingSenderId: "222886391134",
    appId: "1:222886391134:web:82469ba2bcaf85037f33cf",
  };
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export async function uploadImage(refStr, file) {
  try {
    const ref = firebase.storage().ref().child(refStr);
    const filer = await ref.put(file);
    const url = await filer.ref.getDownloadURL();

    return url;
  } catch (error) {
    return Error(error);
  }
}

export const FacebookAuthProvider = new firebase.auth.FacebookAuthProvider();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
// export const TwitterAuthProvider = new firebase.auth.TwitterAuthProvider();

export async function downloadURL(reference, filename) {
  try {
    const storageRef = firebase.storage().ref(reference);
    const url = await storageRef.child(filename).getDownloadURL();
    return url;
  } catch (error) {
    throw new Error(error.message);
  }
}

export default firebase;
