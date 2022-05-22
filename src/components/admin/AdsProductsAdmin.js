import React, { useEffect, useState } from 'react';
import { Modal,Button } from 'react-bootstrap';
import { firebaseAuth, firebaseDB } from "../../server/firebase";
import Swal from "sweetalert2";

function AdsProductsAdmin () {

  const [values, setValues] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);

  const [uid, setUid] = useState("");

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
              // setDataAddress({ ...snapshot.val().Address });
            } else {
              setValues({});
            }
          });
      }
    });
  }, []);

  const AddRess = () => {
    let timerInterval
    Swal.fire({
      title: 'รอสักครู่',
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
      }
    })
    firebaseDB
      .child("Users")
      .child(uid)
      .child("Address")
      // .push(address)
      .then(() => {
        console.log("add data success");
        window.location.href = "/user/profile";
      })
      .catch((error) => console.log(error));
  };




return(
    <div>
      <h1>ADS</h1>
      <hr />
      <div className="container">
      <button type="button" className="btn btn-success" onClick={handleShow}>เพิ่ม</button>

      <Modal show={show} onHide={handleClose} style={{ marginTop: "100px" }}>
        <Modal.Header closeButton>
          <Modal.Title >เพิ่มปกโฆษณา</Modal.Title>
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
                // onChange={handleOnChange}
                required
              />
            </div>
            <div className="form-group mt-3">
          <label htmlFor="bankAccount">QR CODE</label>
          {ShowImages ? (
            <img style={{ width: "150px" }} src={ShowImages} />
          ) : (
            <></>
          )}

          <br />
          <input accept="image/*" type="file" onChange={ImgOnChange} required />
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
      </div>
    </div>
)}export default AdsProductsAdmin;