import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../server/firebase";

function ProfileSellerAdd() {
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      return setValues({
        ...values,
        sellerEmail: user.email,
        sellerUid: user.uid,
      });
    });
  }, []);

  // ----------------ADD DATA--------------------------------
  const [values, setValues] = useState({
    storeImg: [],
    storeName: "",
    storeAddress: "",
    storeDetails:"",
    phoneNumber: "",
    imgBankAccount: [],
    nameBankAccount: "",
    numberBankAccount: "",
  });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);

  const [ShowImagesStore, setShowImagesStore] = useState([]);
  const [ImagesStore, setImagesStore] = useState([]);
  const [uid, setUid] = useState();


  const ImgStoreOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setImagesStore([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImagesStore(selectedFIles);
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

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        return setUid(user.uid.toString());
      } else {
        return setUid(null);
      }
    });
  }, []);

  const handleonSubmit = () => {
    ImagesStore.forEach((fileStore)=>{
      const sotrageRefStoreProfile = ref(
        firebaseStorage,
        `users/${uid}/seller/storeProfile-${fileStore.name}`
      );
      const uploadTask = uploadBytesResumable(sotrageRefStoreProfile, fileStore);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            values.storeImg=downloadURL;
            if (values.storeImg !== null) {
    
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
      
            } else {
              console.log("Error add data");
            }
          });
        }
      );
    });
  };

  // -----------END ADD IMAGE----------------------------

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
      <form className="was-validated">


      <div className="form-group mt-3">
          <label htmlFor="bankAccount">รูปร้านค้า</label>
          {ShowImagesStore ? (
            <img style={{ width: "150px" }} src={ShowImagesStore} />
          ) : (
            <></>
          )}

          <br />
          <input accept="image/*" type="file" onChange={ImgStoreOnChange} required />
        </div>
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
            style={{ resize: "none", height: "100px" }}
            value={values.name}
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
            // value={values.name}
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
            // value={values.name}
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
            // value={values.name}
            onChange={handleOnChange}
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
    </div>
  );
}
export default ProfileSellerAdd;
