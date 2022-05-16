import React, { useState, useEffect } from "react";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../server/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { GrouprData } from "../../client/GroupData";
import Form from "react-bootstrap/Form";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function AddNewProduct() {

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
     return setValues({...values, sellerEmail: user.email, sellerUid: user.uid});
    });
  }, []);

  // ----------------ADD DATA--------------------------------
  const [values, setValues] = useState({
    productID: dateKey,
    sellerUid: "",
    productName: "",
    productCategory: "",
    productPrice: "",
    productAllow: false,
    productImg: [],
    productDetails: "",
    produtcDate: saveCurrentDate,
    produtcTime: saveCurrentTime,
    produtcCost100: "",
    produtcCost200: "",
    produtcCost201: "",
    produtcCost202: "",
    produtcCost300: "",
    produtcCost301: "",
    produtcCost302: "",
  });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // console.log(values);

  // ----------------EDN ADD DATA------------------------------

  // -----------ADD IMAGE----------------------------

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


  const handleonSubmit = () => {
      Images.forEach((files) => {
        const sotrageRef = ref(firebaseStorage,`product/${dateKey}/${files.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, files);
        uploadTask.on("state_changed",
          (snapshot) => {},
          (error) => console.log(error),
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
               values.productImg.push(downloadURL);
               if( values.productImg.length === Images.length){
                firebaseDB
                .child("Product")
                .child("Product-"+dateKey)
                .set(values)
                .then(() => {
                  console.log("add data success");
                  window.location.href='/seller/seller-product';
                }).catch((error) => console.log(error)); 
               }
            });
          }
        );
      });
  };

  // -----------END ADD IMAGE----------------------------

  const checkData = () => {
    if (values.productName === "") {
      console.log("ใส่ชื่อ ไอ้สอง")
    } else if (values.productCategory === "") {
      console.log("ใส่ประเภทด้วย ไอ้สัส")
    } else if (values.productCategory === "ประเภทสินค้า") {
      console.log("ใส่ประเภทด้วย ไอ้สัส")
    } else if (values.productPrice === "") {
      console.log("ใส่ราคาด้วย ไม่งั้นจะขายใครไอ้เ-ร")
    } else if (values.productDetails === "") {
      console.log("ใส่รายละเอียดด้วย เขาจะรู้ไหมว่าใช้งานยังไง")
    } else if (values.produtcCost100 === "") {
      console.log("ใส่ค่าส่งด้วย")
    } else if (values.produtcCost200 === "") {
      console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 01")
    } else if (values.produtcCost201 === "") {
      console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 02")
    } else if (values.produtcCost202 === "") {
      console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 03")
    } else if (values.produtcCost300 === "") {
      console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 04")
    } else if (values.produtcCost301 === "") {
      console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 05")
    } else if (values.produtcCost302 === "") {
      console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 06")
    } else if (Images.length === 0) {
      console.log("ไม่ใส่รูป ใครจะรูปว่าขายอะไรว่ะ")
    } else {
      // let text = "Press a button!\nEither OK or Cancel.";
      // if (window.confirm(text) == true) {
        handleonSubmit();
      // } else {
      //   text = "You canceled!";
      // }
      
    }
  };








  return (
    <div className="container pb-5">
      <h1>Add New Product</h1>
      <hr />
      <div className="container">
 
        <form className="was-validated">
          
        {ShowImages.map((url, i) => (
              <img
                key={i}
                style={{ width: "150px" }}
                src={url}
                alt="firebase-images"
              />
            ))}

          <div className="form-group">
            <label htmlFor="productImg">รูปภาพ</label>
            <input
              accept="image/*"
              type="file"
              onChange={ImgOnChange}
              multiple
              required
            />

          </div>
          <div className="form-group mt-3">
            <label htmlFor="productName">ชื่อสินค้า</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="form-control"
              placeholder="ชื่อสินค้า"
              // value={values.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="productCategorys">ประเภทสินค้า</label>

            <Form.Select
              aria-label="Default select example"
              id="productCategory"
              name="productCategory"
              className="form-select"
              onChange={handleOnChange}
              required
            >
              <option value="">ประเภทสินค้า</option>
              {GrouprData.map((item, keys) => {
                return (
                  <option name="productCategory" key={keys} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="productPrice">ราคา</label>
            <input
              type="number"
              id="productPrice"
              name="productPrice"
              className="form-control"
              placeholder="ราคา"
              // value={values.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label htmlFor="productDetails">รายละเอียด</label>
            <textarea
              id="productDetails"
              name="productDetails"
              className="form-control"
              placeholder="รายละเอียด"
              style={{ resize: "none" }}
              value={values.name}
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="form-group row mt-3">
            <label htmlFor="produtcCost1" className="col-1">
              ส่ง 1 ชิ้น
            </label>
            <input
              type="number"
              id="produtcCost100"
              name="produtcCost100"
              className="form-control col"
              placeholder="ราคา"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="form-group row mt-3">
            <label htmlFor="produtcCost2" className="col">
              ส่งชิ้น
            </label>
            <input
              type="number"
              id="produtcCost200"
              name="produtcCost200"
              className="form-control col"
              placeholder="ชิ้น"
              onChange={handleOnChange}
              required
            />
            <label htmlFor="produtcCost2" className="col">
              ถึง
            </label>
            <input
              type="number"
              id="produtcCost201"
              name="produtcCost201"
              className="form-control col"
              placeholder="ชิ้น"
              onChange={handleOnChange}
              required
            />
            <label htmlFor="produtcCost2" className="col">
              ค่าส่งที่กำหนด
            </label>
            <input
              type="number"
              id="produtcCost202"
              name="produtcCost202"
              className="form-control col"
              placeholder="บาท"
              onChange={handleOnChange}
              required
            />
          </div>

          <div className="form-group row mt-3">
            <label htmlFor="produtcCost3" className="col">
              ส่งชิ้น
            </label>
            <input
              type="number"
              id="produtcCost300"
              name="produtcCost300"
              className="form-control col"
              placeholder="ชิ้น"
              onChange={handleOnChange}
              required
            />

            <label htmlFor="produtcCost3" className="col">
              ถึง
            </label>
            <input
              type="number"
              id="produtcCost301"
              name="produtcCost301"
              className="form-control col"
              placeholder="ชิ้น"
              onChange={handleOnChange}
              required
            />

            <label htmlFor="produtcCost3" className="col">
              ค่าส่งที่กำหนด
            </label>
            <input
              type="number"
              id="produtcCost302"
              name="produtcCost302"
              className="form-control col"
              placeholder="บาท"
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
            <button type="button" className="btn btn-danger col mx-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddNewProduct;
