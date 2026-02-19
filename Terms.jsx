import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANovemcbutkYhWH3mHhW0-JFLmPrz0cq4",
  authDomain: "deenscroll-d47bb.firebaseapp.com",
  projectId: "deenscroll-d47bb",
  storageBucket: "deenscroll-d47bb.firebasestorage.app",
  messagingSenderId: "811657652211",
  appId: "1:811657652211:web:28ffd5a9241bbed80f5486",
  measurementId: "G-HHFHT6XQYG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
