import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Accordion, Card, Form, useAccordionButton } from "react-bootstrap";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../server/firebase";

function ProfileSeller() {
  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);
  const [uid, setUid] = useState();
  const [store, setStore] = useState({});


  const [values, setValues] = useState({
    storeName: "",
    storeAddress: "",
    phoneNumber: "",
    bankAccount: [],
  });

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
         setUid(user.uid.toString());
        //  setValues({...values,sellerEmail: user.email,sellerUid: user.uid,});

         firebaseDB.child("Users").child(user.uid.toString()).child("seller").once('value',(snapshot)=>{
           if(snapshot.val()!==null){
            setValues({ ...snapshot.val() });
           }else{
            setValues({});
           }
         })

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

  const CustomToggle=({ children, eventKey })=> {
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
  }

  const handleonSubmit = () => {
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
            values.bankAccount.push(downloadURL);
            if (values.bankAccount.length === Images.length) {
              firebaseDB
                .child("Users")
                .child(uid)
                .child("seller")
                .set(values)
                .then(() => {
                  console.log("add data success");
                  window.location.href = "/seller/seller-profile";
                })
                .catch((error) => console.log(error));
            } else {
              console.log("Error add data");
            }
          });
        }
      );
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
                <label htmlFor="productName">ชื่อร้านค้า</label>
              </div>

              <div className="mt-3">
                <label htmlFor="productDetails">ที่อยู่</label>
              </div>

              <div className="mt-3">
                <label htmlFor="bankAccount">QR CODE บัญชีธนาคาร</label>
              </div>
              
              <div className="mt-3">
                <label htmlFor="phoneNumber">เบอร์โทร</label>
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
                    // value={values.name}
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
                    style={{ resize: "none" }}
                    value={values.name}
                    onChange={handleOnChange}
                    required
                  />
                </div>

                <div className="form-group mt-3">
                  <label htmlFor="bankAccount">QR CODE บัญชีธนาคาร</label>
                  {ShowImages.map((url, i) => (
                    <img
                      key={i}
                      style={{ width: "150px" }}
                      src={url}
                      alt="firebase-images"
                    />
                  ))}

                  <input
                    accept="image/*"
                    type="file"
                    onChange={ImgOnChange}
                    required
                  />
                </div>

                <div className="form-group row">
                  <label htmlFor="phoneNumber">เบอร์โทร</label>
                  <input
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    className="form-control col"
                    placeholder="ชิ้น"
                    onChange={handleOnChange}
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
