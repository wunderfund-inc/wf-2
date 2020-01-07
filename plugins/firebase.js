import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig, actionCodeSettings } from "./firebase-config";

const app = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const db = app.firestore();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp();

export function verifyEmail() {
  auth.currentUser.sendEmailVerification(actionCodeSettings);
}

export default firebase;
