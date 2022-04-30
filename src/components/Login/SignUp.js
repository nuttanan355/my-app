import React, { useState } from "react";
import * as FcIcons from "react-icons/fc";
import { Link } from "react-router-dom";
import "../../css/signIn.css";
import { firebaseAuth, firebaseDB } from "../../server/firebase";

function SignIn() {
  const [value, setValue] = useState({
    email: "",
    fullName: "",
    password: "",
    password1: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firebaseAuth
        .createUserWithEmailAndPassword(value.email, value.password)
        .then((CreateUsers) => {
          var user = CreateUsers.user;
          firebaseDB
            .child("Users")
            .child(user.uid)
            .set({
              email: user.email,
              full_name:value.fullName, 
              uid: user.uid,
              type: "User",
            })
            .then(() => {
              alert("Add Admin success");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <div className="login100-pic js-tilt" data-tilt>
            <img src="/public/img/group-1.jpg" alt="IMG" />
          </div>

          <form onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <div className="mb-3">
              <label>Full name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Full name"
                name="fullName"
                onChange={handleChange}
              />
            </div>
            {/* <div className="mb-3">
              <label>Last name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Last name"
              />
            </div> */}
            <div className="mb-3">
              <label>Email address</label>
              <input
                className="form-control"
                placeholder="Enter email"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/user/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
