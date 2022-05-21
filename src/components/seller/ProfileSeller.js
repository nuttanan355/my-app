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
  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);
  const [uid, setUid] = useState();

  const [values, setValues] = useState({
    storeName: "",
    storeAddress: "",
    phoneNumber: "",
    storeDetails:"",
    imgBankAccount: [],
    nameBankAccount: "",
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
              let timerInterval
              Swal.fire({
                icon: 'error',
                title: 'ไม่มีข้อมูลร้านค้า',
                html: 'ต้องมีข้อมูลร้านก่อน ถึงจะเพิ่มสินค้าได้',
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                window.location.href='/seller/seller-profile/add';
              })
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

  const ImgOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setImages([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImages(selectedFIles);
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
    const storageDel = firebaseStorage.ref().child(`users/${uid}/seller`);
    storageDel
      .listAll()
      .then((listResults) => {
        const promises = listResults.items.map((item) => {
          return item.delete();
        });
        Promise.all(promises);
        // console.log(promises);
      })
      .then(() => {
        Images.forEach((files) => {
          const sotrageRef = ref(
            firebaseStorage,
            `users/${uid}/seller/payment-${files.name}`
          );
          const uploadTask = uploadBytesResumable(sotrageRef, files);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => console.log(error),
            async () => {
              await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log("File available at", downloadURL);
                  values.imgBankAccount=downloadURL;
                  if (values.imgBankAccount !== null) {
                    firebaseDB
                      .child("Users")
                      .child(uid)
                      .child("seller")
                      .update(values)
                      .then(() => {
                        console.log("add data success");
                        window.location.href = "/seller/seller-profile";
                      })
                      .catch((error) => console.log(error));
                  } else {
                    console.log("Error add data");
                  }
                }
              );
            }
          );
        });
      });
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

  return (
    <div className="container">
      <h1>Profile Seller</h1>
      <hr />
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <CustomToggle eventKey="0">Show Profile Seller</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <div className="mt-3">
                <label htmlFor="productName">ชื่อร้านค้า : {values.storeName}</label>
              </div>

              <div className="mt-3">
                <label htmlFor="productDetails">ที่อยู่ : {values.storeAddress}</label>
              </div>
              
              <div className="mt-3">
                <label htmlFor="phoneNumber">เบอร์โทร : {values.phoneNumber}</label>
              </div>

              <div className="mt-3">
                <label htmlFor="bankAccount">บัญชีธนาคาร</label>
                <hr/>
                <p htmlFor="bankAccount">QR CODE</p>
                <img style={{ width: "150px" }} src={values.imgBankAccount} />
                <p htmlFor="productName">ชื่อบัญชี : {values.nameBankAccount}</p>
                <p htmlFor="productName">เลขบัญชี : {values.numberBankAccount}</p>
                <p></p>
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>

        <Card>
          <Card.Header>
            <CustomToggle eventKey="1">Edit</CustomToggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <form className="was-validated">
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
            value={values.name}
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
                  {ShowImages.length ? (
                    <img style={{ width: "150px" }} src={ShowImages} />
                  ) : (
                    <img style={{ width: "150px" }} src={values.imgBankAccount} />
                  )}

                  <br />
                  <input
                    accept="image/*"
                    type="file"
                    onChange={ImgOnChange}
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
                  <button type="reset" className="btn btn-danger col mx-3">
                    Cancel
                  </button>
                </div>
              </form>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
export default ProfileSeller;
