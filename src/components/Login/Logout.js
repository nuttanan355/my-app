import React from "react";
import { firebaseAuth } from "../../server/firebase";
import "../../css/App.css";
import { Link } from "react-router-dom";
import * as FcIcons from "react-icons/fc";

const Logout = ({ user }) => {

          firebaseAuth
            .signOut()
            .then(() => {
              // window.location.href = "/";
            })
            .catch((error) => {
              console.error(error);
            })
        
  
};

export default Logout;
