import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../server/firebase";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function AdsProductsAdmin() {
  const [values, setValues] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);

  const ImgOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setImages([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImages(selectedFIles);
  };

  useEffect(() => {
    firebaseDB.child("ADS").on("value", (snapshot) => {
      if (snapshot.val !== null) {
        setValues({ ...snapshot.val() });
      } else {
        setValues({});
      }
    });
  }, []);

  console.log(values);

  const AddRess = () => {
    let timerInterval;
    Swal.fire({
      title: "รอสักครู่",
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          // b.textContent = Swal.getTimerLeft()
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    Images.forEach((files) => {
      const sotrageRef = ref(firebaseStorage, `ads-products/ads-${files.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            firebaseDB
              .child("ADS")
              .push(downloadURL)
              .then(() => {
                console.log("add ADS success");
                // handleClose();
                window.location.href = "/admin/ads-product";
              })
              .catch((error) => console.log(error));
          });
        }
      );
    });
  };

  const DelADS = (url) => {
    Swal.fire({
      title: "ต้องการลบ ADS ไหม ?",
      text: "คุณต้องการลบ ADS ใช่ไหม !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
           // console.log(values[url]);
    const storageDel = firebaseStorage.refFromURL(values[url]);
    storageDel.delete().then(() => {
      firebaseDB
        .child("ADS")
        .child(url)
        .remove()
        .then(() => {
          console.log("DELETE ADS Success");
          window.location.href = "/admin/ads-product";
        })
        .catch((error) => console.log(error));
    });
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "คุณได้ลบ ADS แล้ว",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });

  };

  return (
    <div className="mt-3">
      <div className="container row">
        <h1 className="col">ADS</h1>
        <button
          type="button"
          className="btn btn-success btn-lg col-1"
          onClick={handleShow}
        >
          เพิ่ม
        </button>
      </div>
      <hr />
      <div className="container">
        <Modal show={show} onHide={handleClose} style={{ marginTop: "150px" }}>
          <Modal.Header closeButton>
            <Modal.Title>เพิ่มปกโฆษณา (1920 * 500) </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="was-validated container">
              <div className="form-group mt-3">
                {/* <label htmlFor="bankAccount">ADS</label><br /> */}
                {ShowImages ? (
                  <img style={{ width: "100%" }} src={ShowImages} />
                ) : (
                  <></>
                )}
                <br />
                <input
                  accept="image/*"
                  type="file"
                  onChange={ImgOnChange}
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

        <div className="container">
          <div className="row justify-content-md-center">
            {Object.keys(values).map((url, i) => (
              <div className="card text-left my-3  mx-2 col-5 p-2" key={i}>
                <img
                  className="card-img-top"
                  src={values[url]}
                  style={{
                    alignItems: "center",
                    width: "100%",
                    height: "100%  ",
                  }}
                  alt=""
                />
                <button
                  className="btn btn-danger mt-3"
                  onClick={() => DelADS(url)}
                >
                  ลบ
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default AdsProductsAdmin;
