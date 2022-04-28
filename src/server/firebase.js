// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/database';
import 'firebase/compat/storage'
// import 'firebase/compat/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDerlLchLdUus4Y-FAxZ3nL4ZNM0ifRNcE",
  authDomain: "tea-market.firebaseapp.com",
  databaseURL: "https://tea-market-default-rtdb.firebaseio.com",
  projectId: "tea-market",
  storageBucket: "tea-market.appspot.com",
  messagingSenderId: "1024454851411",
  appId: "1:1024454851411:web:1af0ae3772695fd9237fa6",
  measurementId: "G-56E3K6RC5H"
};




firebase.initializeApp(firebaseConfig);
// const firebaseDB = getAnalytics(app)
const firebaseDB = firebase.database().ref();
const firebaseStorage = firebase.storage();

export {firebaseDB,firebaseStorage};
