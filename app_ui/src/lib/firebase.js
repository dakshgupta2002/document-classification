import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { getStorage } from 'firebase/storage';

// import seed file
// import { seedDatabase } from '../seed';

// console.log(process.env.REACT_APP_apiKey)
const config = {
    apiKey: "AIzaSyDdHlZPtTLBx8Xfyh3lG47uFeZpfov7raU",
    authDomain: "fast-vibe.firebaseapp.com",
    projectId: "fast-vibe",
    storageBucket: "fast-vibe.appspot.com",
    messagingSenderId: "445259309915",
    appId: "1:445259309915:web:0cd4c7524a1ad52246b07e",
    measurementId: "G-XMVRRK4FY1"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const storage = getStorage(firebase)

// call seed file once
// seedDatabase(firebase);

export { firebase, FieldValue, storage };
