import { firebaseAuth, firebase, firebaseDB } from "../../server/firebase";
import React from "react";
import "../../css/App.css";
// import { Link } from "react-router-dom";
import * as FcIcons from "react-icons/fc";

const provider = new firebase.auth.GoogleAuthProvider().setCustomParameters({ prompt: "select_account", });


const signInWithGoogle = () =>
  firebaseAuth.signInWithPopup(provider)
    .then((userCredential) => {
      var user = userCredential.user;

      // console.log(user.email);

      const checkAccess = firebaseDB.child("Users").orderByChild('email').equalTo(user.email.toString());
      checkAccess.on('value', (snapshot) => {
        // console.log("Not if "+snapshot.val());
        if (snapshot.val() !== null) {
          // console.log("Not Add User success");
          // console.log("Not null"+snapshot.val());
          window.location.href = "/";
        } else {
          // console.log("Null"+snapshot.val());
          firebaseDB.child("Users").child(user.uid)
            .set({
              email: user.email,
              full_name: user.displayName,
              uid: user.uid,
              type: "User",
              uimg:user.photoURL,
            })
            .then(() => {
              // console.log("Add User success");
              window.location.href = "/";
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
    }).catch((err) => console.log(err));






const LoginGoogle = () => {
  return (
    <div className="btn">
      <button className="btn auth-btn" onClick={signInWithGoogle} style={{ fontSize: "16px", color: "gray", weight: "lighter",  borderRadius: "10px" }}>
        <FcIcons.FcGoogle style={{ fontSize: "150%" }} /> &nbsp; Sign In With Google
      </button>

      <hr/>
    </div>
  );
};
export default LoginGoogle;
