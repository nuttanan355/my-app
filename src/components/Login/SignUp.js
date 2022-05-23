import React, { useState } from "react";
import Swal from "sweetalert2";
import "../../css/signIn.css";
import { firebaseAuth, firebaseDB } from "../../server/firebase";

function SignIn() {
  const [value, setValue] = useState({
    email: "",
    fullName: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
    console.log(value);
  };

  const handleSubmit = () => {
    if(value.fullName === ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ไม่มีข้อมูลชื่อ',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(value.email === ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ไม่มีข้อมูลอีเมล',
        showConfirmButton: false,
        timer: 1500
      })
      
    }else if(value.password === ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ไม่มีข้อมูลรหัสผ่าน',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(value.passwordConfirm === ""){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'ไม่มีข้อมูลยืนยันรหัสผ่าน',
        showConfirmButton: false,
        timer: 1500
      })
    }else if(value.password !== value.passwordConfirm){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'รหัสผ่านไม่ตรงกัน',
        showConfirmButton: false,
        timer: 1500
      })
    }else{
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
                full_name: value.fullName,
                uid: user.uid,
                type: "User",
                uimg: "",
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
    }
  };

  return (
    <div  className="limiter">
      <div className="container-login100">
      <div style={{ background: "white", width:"500px",padding:"20px",textAlign: "center", borderRadius:"15px" }}>

          <form>
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
            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                name="passwordConfirm"
                onChange={handleChange}
              />
            </div>
            <div className="d-grid">
              <button type="button" className="btn btn-primary" onClick={()=>handleSubmit}>
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
