import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh0hQYC7KFNXG3P8zVslJCKBiRec2mv9w",
  authDomain: "matatu-radar.firebaseapp.com",
  projectId: "matatu-radar",
  storageBucket: "matatu-radar.firebasestorage.app",
  messagingSenderId: "462422529132",
  appId: "1:462422529132:web:63f49624c879b9d6d93449"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);