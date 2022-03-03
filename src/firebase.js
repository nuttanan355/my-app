
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDerlLchLdUus4Y-FAxZ3nL4ZNM0ifRNcE",
  authDomain: "tea-market.firebaseapp.com",
  databaseURL: "https://tea-market-default-rtdb.firebaseio.com",
  projectId: "tea-market",
  storageBucket: "tea-market.appspot.com",
  messagingSenderId: "1024454851411",
  appId: "1:1024454851411:web:f313053ec64f6c1c237fa6",
  measurementId: "G-XH1JHWVKB7"
};

firebase.initializeApp(firebaseConfig);

export default firebase.database();