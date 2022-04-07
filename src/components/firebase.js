// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
// import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/database';
import 'firebase/compat/storage'
// import 'firebase/compat/auth';
import 'firebase/auth';
import 'firebase/firestore';

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

//const auth = firebase.auth();

// for Login
/* const firestore = firebase.firestore();
const firebaseDB = firebase.initializeApp(firebaseConfig)

export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;
    const userRoles = ['user'];
    

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
        userRoles,
        ...additionalData
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
}; */

export {firebaseDB,firebaseStorage};
