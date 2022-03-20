import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcRbZ-OVffdgte47Sw3IAPUGrfjluDj0s",
  authDomain: "sistema-siac.firebaseapp.com",
  projectId: "sistema-siac",
  storageBucket: "sistema-siac.appspot.com",
  messagingSenderId: "116372310561",
  appId: "1:116372310561:web:17e344cda12faac0857160"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
