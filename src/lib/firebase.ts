import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  
  authDomain: "matatu-radar.firebaseapp.com",
  projectId: "matatu-radar",
  storageBucket: "matatu-radar.firebasestorage.app",
  messagingSenderId: "462422529132",
  appId: "1:462422529132:web:63f49624c879b9d6d93449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);