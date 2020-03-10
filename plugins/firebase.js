import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig, actionCodeSettings } from "./firebase-config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export function verifyEmail() {
  auth.currentUser.sendEmailVerification(actionCodeSettings);
}

export default firebase;
