import React, { useEffect, useState } from "react";
import { Form, Tabs, Modal, Button } from "react-bootstrap";
import "../../css/profile.css";
import { firebaseAuth, firebaseDB } from "../../server/firebase";
import ThaiAddressFrom from "./ThaiAddressForm";
import * as HiIcons from "react-icons/hi";
import Swal from "sweetalert2";
import { render } from "react-dom";

function ProfileUser() {
  const [values, setValues] = useState({});
  const [dataAddress, setDataAddress] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showEdit, setEdit] = useState(false);
  const handleEditClose = () => setEdit(false);
  // const handleEditShow = () => setEdit(true);

  const [uid, setUid] = useState("");
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    zipcode: "",
    addressDetails: "",
  });

  const handleOnChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const ImgOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    // setImages([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    // setShowImages(selectedFIles);
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUid(user.uid.toString());
        firebaseDB
          .child("Users")
          .child(user.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val !== null) {
              setValues({ ...snapshot.val() });
              setDataAddress({ ...snapshot.val().Address });
            } else {
              setValues({});
            }
          });
      }
    });
  }, []);

  const AddRess = () => {
    firebaseDB
      .child("Users")
      .child(uid)
      .child("Address")
      .push(address)
      .then(() => {
        console.log("add data success");
        window.location.href = "/user/profile";
      })
      .catch((error) => console.log(error));
  };

  const DeleteAddress = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        firebaseDB.child(`Users/${uid}/Address/${id}`).remove().then().catch();
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const EditAddress = (id) => {
    setEdit(true);
    return (
      <div>
        <Modal show={showEdit} onHide={handleEditClose}>
          <Modal.Header closeButton>
            <Modal.Title>ที่อยู่ใหม่</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="was-validated container">
              <div className="form-group mt-3">
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="form-control"
                  value={dataAddress[id].zipcode}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="form-control"
                  value={dataAddress[id].zipcode}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <textarea
                  id="addressDetails"
                  name="addressDetails"
                  className="form-control"
                  value={dataAddress[id].zipcode}
                  style={{ resize: "none" }}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <input
                  type="number"
                  id="zipcode"
                  name="zipcode"
                  className="form-control"
                  value={dataAddress[id].zipcode}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={""}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };

  return (
    <div className="default-bg" style={{ backgroundColor: "white" }}>
      <h1>Your Profile</h1>
      <hr />
      <div className="container" style={{ marginTop:"50px" }} >
        <div className="row">
          <div className="col-md-4 profile-img">
            <form method="post">
              <img src={values.uimg} alt="" style={{ borderRadius: "15px",width:"300px" }} />
              {/* <div className="file btn btn-lg btn-primary">
                Change Photo
                <input type="file" name="file" accept="image/*" />
              </div> */}
            </form>
          </div>
          <div className="col-md-6 my-auto">
            <h2> E-mail : {values.email} </h2>
            <h2>Name : {values.full_name}</h2>
            {/* <h2>
              Phone :{values.phoneNumber ? values.phoneNumber.toString() : " ไม่มี "}
            </h2> */}
            {/* <button className="btn btn-primary btn-lg mt-3" role="button">
              <HiIcons.HiOutlinePencil /> แก้ไข
            </button> */}
          </div>
        </div>
      </div>

      <div className="container" style={{marginTop:"200px"}}>
        <hr />
        <div className="row ">
          <div className="col-10 mx-4 my-auto">
            <h3>Your address</h3>
          </div>
          <button
            className="btn btn-warning btn-sm col-1 "
            role="button"
            onClick={handleShow}
          >
            <HiIcons.HiPlus /> เพิ่มที่อยู่
          </button>
        </div>
        <hr />
      </div>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
        <Modal.Header closeButton>
          <Modal.Title >ที่อยู่ใหม่</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="was-validated container">
            <div className="form-group mt-3">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="form-control"
                placeholder="ชื่อ-นามสกุล"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                placeholder="เบอร์โทร"
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <textarea
                id="addressDetails"
                name="addressDetails"
                className="form-control"
                placeholder="รายละเอียดที่อยู่"
                style={{ resize: "none" }}
                onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mt-3">
              <input
                type="number"
                id="zipcode"
                name="zipcode"
                className="form-control"
                placeholder="รหัสไปรษณีย์"
                onChange={handleOnChange}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => AddRess()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {Object.keys(dataAddress).map((id, index) => {
        return (
          <div className="container px-5" key={index} >
            <div className="card">
              <div className="card-body">ชื่อ : {dataAddress[id].fullName}</div>
              <div className="card-body">
                เบอร์โทร :{dataAddress[id].phoneNumber}
              </div>
              <div className="card-body">
                ที่อยู่ : {dataAddress[id].addressDetails} รหัสไปรษณีย์ :{" "}
                {dataAddress[id].zipcode}
              </div>
              <div className="card-body">
                {/* <button
                  className="btn btn-info mx-2"
                  onClick={() => {EditAddress(id)}}
                >
                  แก้ไข
                </button> */}
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => DeleteAddress(id)}
                >
                  ลบ
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default ProfileUser;
