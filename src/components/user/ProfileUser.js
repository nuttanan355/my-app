import React, { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import "../../css/profile.css";
import { firebaseAuth, firebaseDB } from "../../server/firebase";
import ThaiAddressFrom from "./ThaiAddressForm";
import * as HiIcons from "react-icons/hi"

function ProfileUser() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user);
      if (user !== null) {
        firebaseDB
          .child("Users")
          .child(user.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val !== null) {
              setValues({ ...snapshot.val() });
            } else {
              setValues({});
            }
          });
      }
    });
  }, []);

  console.log(values);

  return (

    <div className="default-bg" style={{ backgroundColor: "lightblue" }}>
      <h1>Your Profile</h1>
      <hr />

      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img">
              <img src={values.uimg} alt="" />
              <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" accept="image/*" />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="profile-head">
              <div className="row">
                <div className="col-8">
                <h4>Name: {values.full_name}</h4>
              {/* <input
                class="#"
                type="text"
                value="ThiS IS for user.display"
              ></input> */}
              <h4> E-mail: {values.email} </h4>
              {/* <input
                class="#"
                type="text"
                value="ThiS IS for user.Email"
              ></input> */}
              <h> Phone: {values.phoneNuber ? (values.phoneNuber.toString()) : "ไม่มี"} </h>
              {/* <input
                className="#"
                placeholder="Enter Your PhoneNumber"
                type="email"
                name="address"/> */}
                </div>

                <button className="btn btn-primary btn-lg col-4 my-3" role="button">
                <HiIcons.HiOutlinePencil/>  แก้ไข
                </button>
        
              </div>
              

              <div className="row pt-5">
                <div className="col-8 ls my-3 ">
                  <h5>Your address</h5>
                </div>
                <button className="btn btn-primary btn-lg col-4 my-3" role="button">
                <HiIcons.HiPlus/>  เพิ่มที่อยู่
                </button>
                <hr/>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ThaiAddressFrom />
    </div>
  );
}
export default ProfileUser;
