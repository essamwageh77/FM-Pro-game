import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration is automatically injected by AI Studio
const firebaseConfig = {
  apiKey: "AIzaSyBHL9P4bJyCAV5nMTsOTCtJ71F0LvNXNOA",
  authDomain: "fm-pro-3bdf0.firebaseapp.com",
  projectId: "fm-pro-3bdf0",
  storageBucket: "fm-pro-3bdf0.firebasestorage.app",
  messagingSenderId: "736619080888",
  appId: "1:736619080888:web:444f02bd8a1aeac33d184d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
