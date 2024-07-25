import { getApp, getApps, initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore/lite";
import { getFunctions } from "firebase/functions";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOYoxaEM-K8MLGuzPQ68z3rR2d7Hb1v6U",
  authDomain: "wunderfund-server.firebaseapp.com",
  databaseURL: "https://wunderfund-server.firebaseio.com",
  projectId: "wunderfund-server",
  storageBucket: "wunderfund-server.appspot.com",
  messagingSenderId: "222886391134",
  appId: "1:222886391134:web:82469ba2bcaf85037f33cf",
  measurementId: "G-91DDD682S7",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const timestamp = serverTimestamp();
export const storage = getStorage(app);

export async function uploadImage(reference, file) {
  try {
    const storageRef = ref(storage, reference);
    const uploaded = await uploadBytes(storageRef, file);
    return await getDownloadURL(uploaded.ref);
  } catch (error) {
    throw new Error(error);
  }
}

export async function downloadURL(reference, filename) {
  try {
    const storageRef = ref(storage, `${reference}/${filename}`);
    return await getDownloadURL(storageRef);
  } catch (error) {
    throw new Error(error);
  }
}

export const googleAuthProvider = new GoogleAuthProvider();
export const facebookAuthProvider = new FacebookAuthProvider();
