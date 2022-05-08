import React, { useState } from "react";
import "../../css/signIn.css";
import { firebase } from "../../server/firebase";
import LoginGoogle from "./LoginGoogle";

function SignIn() {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      firebase.auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          console.log(user.uid);
          console.log(user.email);
          window.location.href = "/";
        })
        .catch((error) => {
          console.error(error);
        });
      // +(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="limiter">
      <div className="container-login100"  >
        <div style={{ background: "white", width:"500px",padding:"20px",textAlign: "center", borderRadius:"15px" }}>

          <form onSubmit={handleSubmit}>
            <span className="login100-form-title">Member Login</span>
            <LoginGoogle variant="primary"/>
        
            <div
              className="wrap-input100 validate-input"
              data-validate="Valid email is required: ex@abc.xyz"
            >
              <input
                className="input100"
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-envelope" aria-hidden="true"></i>
              </span>
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <input
                className="input100"
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
              <span className="focus-input100"></span>
              <span className="symbol-input100">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </span>
            </div>

            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">Login</button>
            </div>

            {/* <div className="text-center p-t-12">
              <span className="txt1">Forgot</span>
              <a className="txt2" href="#">
                 Password?
              </a>
            </div> */}

            <div className="text-center p-t-136">
              <a className="txt2" href="/user/sign-up">
                Create your Account
              </a>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
}

export default SignIn;
