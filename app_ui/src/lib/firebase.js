import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';

const config = {
    apiKey: "AIzaSyDZYcmjaefNZEibhWTvYi5IZQwWb_a5p5E",
    authDomain: "fast-vibe-2.firebaseapp.com",
    projectId: "fast-vibe-2",
    storageBucket: "fast-vibe-2.appspot.com",
    messagingSenderId: "356062221346",
    appId: "1:356062221346:web:2d4fec10d0d318c438667b",
    measurementId: "G-TCKMBZ7974"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const storage = getStorage(firebase)

export { firebase, FieldValue, storage };
