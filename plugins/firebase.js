import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { firebaseConfig, actionCodeSettings } from "../config/firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export function verifyEmail() {
  auth.currentUser.sendEmailVerification(actionCodeSettings);
}

export async function uploadImage(refStr, file) {
  try {
    const ref = firebase
      .storage()
      .ref()
      .child(refStr);
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
    throw Error(error.message);
  }
}

export default firebase;
