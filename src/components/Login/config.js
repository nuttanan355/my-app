import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDerlLchLdUus4Y-FAxZ3nL4ZNM0ifRNcE",
    authDomain: "tea-market.firebaseapp.com",
    databaseURL: "https://tea-market-default-rtdb.firebaseio.com",
    projectId: "tea-market",
    storageBucket: "tea-market.appspot.com",
    messagingSenderId: "1024454851411",
    appId: "1:1024454851411:web:1af0ae3772695fd9237fa6",
    measurementId: "G-56E3K6RC5H"
});

export default firebaseConfig;