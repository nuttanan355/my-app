import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Accordion, Card, Form, useAccordionButton } from "react-bootstrap";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../server/firebase";
import Swal from "sweetalert2";

function ProfileSeller() {
  const [ShowImagesBank, setShowImagesBank] = useState([]);
  const [ImagesBank, setImagesBank] = useState([]);

  const [ShowImagesStore, setShowImagesStore] = useState([]);
  const [ImagesStore, setImagesStore] = useState([]);

  const [uid, setUid] = useState();

  const [values, setValues] = useState({
    storeImg: [],
    storeName: "",
    storeAddress: "",
    storeDetails:"",
    phoneNumber: "",
    imgBankAccount: [],
    nameBankAccount: "",
    bankAccount: "",
    numberBankAccount: "",
  });
  console.log(values);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        setUid(user.uid.toString());
        firebaseDB
          .child("Users")
          .child(user.uid.toString())
          .child("seller")
          .once("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
            } else {
              setValues({});
              let timerInterval;
              Swal.fire({
                icon: "error",
                title: "ไม่มีข้อมูลร้านค้า",
                html: "ต้องมีข้อมูลร้านก่อน ถึงจะเพิ่มสินค้าได้",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const b = Swal.getHtmlContainer().querySelector("b");
                  timerInterval = setInterval(() => { }, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                window.location.href = "/seller/seller-profile/add";
              });
            }
          });
      } else {
        return setUid(null);
      }
    });
  }, []);

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const ImagesBankOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setImagesBank([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImagesBank(selectedFIles);
  };

  const ImagesStoreOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setImagesStore([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImagesStore(selectedFIles);
  };

  const CustomToggle = ({ children, eventKey }) => {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        type="button"
        // style={{ backgroundColor: "pink" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  };

  const handleonSubmit = () => {
    if (ImagesStore.length !== 0) {
      const storageDel = firebaseStorage.refFromURL(values.storeImg);
      storageDel.delete().then(() => {
        UpdateImagesStore();
      });
    } else if (ImagesBank.length !== 0) {
      const storageDel = firebaseStorage.refFromURL(values.imgBankAccount);
      storageDel.delete().then(() => {
        UpdateImagesBank();
      });
    } else {
      UpdateDate();
    }
  };

  const checkData = () => {
    // if (values.productName === "") {
    //   console.log("ใส่ชื่อ ไอ้สอง");
    // } else if (values.productCategory === "") {
    //   console.log("ใส่ประเภทด้วย ไอ้สัส");
    // } else if (values.productCategory === "ประเภทสินค้า") {
    //   console.log("ใส่ประเภทด้วย ไอ้สัส");
    // } else if (values.productPrice === "") {
    //   console.log("ใส่ราคาด้วย ไม่งั้นจะขายใครไอ้เ-ร");
    // } else if (values.productDetails === "") {
    //   console.log("ใส่รายละเอียดด้วย เขาจะรู้ไหมว่าใช้งานยังไง");
    // } else if (values.produtcCost100 === "") {
    //   console.log("ใส่ค่าส่งด้วย");
    // } else if (values.produtcCost200 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 01");
    // } else if (values.produtcCost201 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 02");
    // } else if (values.produtcCost202 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 03");
    // } else if (values.produtcCost300 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 04");
    // } else if (values.produtcCost301 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 05");
    // } else if (values.produtcCost302 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 06");
    // } else if (Images.length === 0) {
    //   console.log("ไม่ใส่รูป ใครจะรูปว่าขายอะไรว่ะ");
    // } else {
    handleonSubmit();
    // }
  };

  const UpdateImagesStore = () => {
    ImagesStore.forEach((fileStore) => {
      const sotrageRefStoreProfile = ref(
        firebaseStorage,
        `users/${uid}/seller/storeProfile-${fileStore.name}`
      );
      const uploadTask = uploadBytesResumable(
        sotrageRefStoreProfile,
        fileStore
      );
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            values.storeImg = downloadURL;
            if (values.storeImg !== null) {
              UpdateDate();
            } else {
              console.log("Error");
            }
          });
        }
      );
    });
  };
  const UpdateImagesBank = () => {
    ImagesBank.forEach((files) => {
      const sotrageRef = ref(
        firebaseStorage,
        `users/${uid}/seller/payment-${files.name}`
      );
      const uploadTask = uploadBytesResumable(sotrageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            values.imgBankAccount = downloadURL;
            if (values.imgBankAccount !== null) {
              UpdateDate();
            } else {
              console.log("Error");
            }
          });
        }
      );
    });
  };

  const UpdateDate = () => {
    firebaseDB
      .child("Users")
      .child(uid)
      .child("seller")
      .update(values)
      .then(() => {
        console.log("add data success");

      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="container" style={{marginBottom:"100px",minHeight:"700px"}}>
      <h1>Profile Seller</h1>
      <hr />
      <Accordion defaultActiveKey="0">
        <div style={{ border: "1px solid lightgray" }}>
          <Card.Header>
            <CustomToggle eventKey="0">Show Profile Seller</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="row">
                <div className="col-3" style={{ justifyContent: "center" }}>
                  <img style={{ width: "auto", height: "500px" }} src={values.storeImg} />
                </div>
                <div className="col">
                  <div className="mt-3">
                    <label htmlFor="bankAccount" style={{ fontWeight: "bold", color: "gray" }}>ร้านค้า</label>
                    <hr />
                    <label htmlFor="productName">
                      ชื่อร้านค้า : {values.storeName}
                    </label>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="productDetails">
                      รายละเอียด : {values.storeDetails}
                    </label>
                  </div>
                  <div className="mt-3">
                    <label htmlFor="productDetails">
                      ที่อยู่ : {values.storeAddress}
                    </label>
                  </div>

                  <div className="mt-3">
                    <label htmlFor="phoneNumber">
                      เบอร์โทร : {values.phoneNumber}
                    </label>
                  </div>
                </div>
                <div className="col">
                  <div className="mt-3">
                    <label htmlFor="bankAccount" style={{ fontWeight: "bold", color: "gray" }}>บัญชีธนาคาร</label>
                    <hr />
                    <p htmlFor="bankAccount">QR CODE</p>
                    <img style={{ marginTop: "10px", width: "150px" }} src={values.imgBankAccount} />
                    <p style={{ marginTop: "10px" }} htmlFor="productName">
                    ชื่อบัญชีธนาคาร : {values.bankAccount}
                    </p>
                    <p>
                      ชื่อบัญชี : {values.nameBankAccount}
                    </p>
                    <p htmlFor="productName">
                      เลขบัญชี : {values.numberBankAccount}
                    </p>
                    <p></p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </div>
        <br />
        <div style={{ border: "1px solid lightgray" }}>
          <Card.Header>
            <CustomToggle eventKey="1">Edit</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <form className="was-validated">
                {ShowImagesStore.length ? (
                  <img style={{ width: "150px" }} src={ShowImagesStore} />
                ) : (
                  <img style={{ width: "150px" }} src={values.storeImg} />
                )}

                <br />
                <input
                  accept="image/*"
                  type="file"
                  onChange={ImagesStoreOnChange}
                  required
                />

                <div className="form-group mt-3">
                  <label htmlFor="productName">ชื่อร้านค้า</label>
                  <input
                    type="text"
                    id="storeName"
                    name="storeName"
                    className="form-control"
                    placeholder="ชื่อร้านค้า"
                    value={values.storeName}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="productDetails">รายละเอียดร้านค้า</label>
                  <textarea
                    id="storeDetails"
                    name="storeDetails"
                    className="form-control"
                    placeholder="รายละเอียดร้านค้า"
                    style={{ resize: "none", height: "100px" }}
                    value={values.storeDetails}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="productDetails">ที่อยู่</label>
                  <textarea
                    id="storeAddress"
                    name="storeAddress"
                    className="form-control"
                    placeholder="ที่อยู่ร้านค้า"
                    style={{ resize: "none", height: "200px" }}
                    value={values.storeAddress}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="productName">เบอร์โทร</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control"
                    placeholder="ชื่อร้านค้า"
                    value={values.phoneNumber}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <h2>บัญชีธนาคาร</h2>
                <hr />
                <div className="form-group mt-3">
                  <label htmlFor="productName">ชื่อบัญชี</label>
                  <input
                    type="text"
                    id="nameBankAccount"
                    name="nameBankAccount"
                    className="form-control"
                    placeholder="ชื่อบัญชี"
                    value={values.nameBankAccount}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="productName">เลขบัญชี</label>
                  <input
                    type="number"
                    id="numberBankAccount"
                    name="numberBankAccount"
                    className="form-control"
                    placeholder="เลขบัญชี"
                    value={values.numberBankAccount}
                    onChange={handleOnChange}
                    required
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="bankAccount">QR CODE</label>
                  {ShowImagesBank.length ? (
                    <img style={{ width: "150px" , marginLeft:"50px"}} src={ShowImagesBank} />
                  ) : (
                    <img
                      style={{ width: "150px" , marginLeft:"50px"}}
                      src={values.imgBankAccount}
                    />
                  )}

                  <br />
                  <input
                  style={{ marginTop:"40px"}}
                    accept="image/*"
                    type="file"
                    onChange={ImagesBankOnChange}
                    required
                  />
                </div>

                <div className="row mt-3 ">
                  <button
                    type="button"
                    className="btn btn-primary col mx-3"
                    onClick={checkData}
                  >
                    Submit
                  </button>
                  <button type="cancel" className="btn btn-danger col mx-3">
                    Cancel
                  </button>
                </div>
              </form>
            </Card.Body>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  );
}
export default ProfileSeller;
