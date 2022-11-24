import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDdHlZPtTLBx8Xfyh3lG47uFeZpfov7raU",
    authDomain: "fast-vibe.firebaseapp.com",
    projectId: "fast-vibe",
    storageBucket: "fast-vibe.appspot.com",
    messagingSenderId: "445259309915",
    appId: "1:445259309915:web:0cd4c7524a1ad52246b07e",
    measurementId: "G-XMVRRK4FY1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const storage = getStorage();

export { db, auth, app, storage };
