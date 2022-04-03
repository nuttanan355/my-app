import React, { useState } from "react";
// import { render } from "react-dom";
import { storage } from "../components/firebase";
import { firebaseStorage, firebaseDB } from "../components/firebase";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

const AddImage = () => {
  const [values, setValues] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productImg: [],
    productDetails: "",
    produtcCost1: "",
    produtcCost2: "",
    produtcCost3: "",
  });

  const [images, setImages] = useState([]);
  const [urls, setUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [showImg, setShowImg] = useState([]);

  const handleChange = async (e) => {
    const targetFilesObject = [...e.target.files];
    const selectedFIles = [];
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImg(selectedFIles);
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = await e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpload = () => {
    const promises = [];
    images.map((image) => {
      const uploadTask = firebaseStorage
        .ref("product" + "/" + dateKey + "/" + image.name)
        .put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          await firebaseStorage
            .ref("product" + "/" + dateKey)
            .child(image.name)
            .getDownloadURL()
            .then((urls) => {
              setUrls((prevState) => [...prevState, urls]);
              setValues(values.productImg.push(urls));
            });
        }
      );
    });
    // setValues({...values,productImg:dowloadUrl});
    Promise.all(promises)
      .then(async() => {
        
        console.log(values.productImg);
        createProduct();
      })
      .catch((err) => console.log(err));
  };


  const createProduct = (e) => {
    // e.preventDefault();
    if (!useState) {
      console.error("null");
    } else {
      // -- push-เจคคีย์ใหม่ให้
      // -- set-ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB
        .child("product")
        .child(dateKey)
        .set(values, (error) => {
          if (error) {
            alert.error(error);
          } else {
            console.log("add data success");
          }
        });
    }
  };

  //   console.log("images: ", images);
    // console.log("urls", urls);

  return (
    <div>
      <progress value={progress} max="100" />
      <br />
      <br />
      <input type="file" accept="image/*" multiple onChange={handleChange} />
      {/* <button onClick={handleUpload}>Upload</button> */}
      <br />
      {/* {urls.map((url, i) => (
        <div key={i}>
          <a href={url} target="_blank">
            {url}
          </a>
        </div>
      ))}
      <br /> */}
      {showImg.map((url, i) => (
        <img
          key={i}
          style={{ width: "200px" }}
          src={url || "http://via.placeholder.com/300"}
          alt="firebase-image"
        />
      ))}
      <form>
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
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="productCategorys">ประเภทสินค้า</label>
          <input
            list="productCategorys"
            id="productCategory"
            name="productCategory"
            className="form-control"
            placeholder="ประเภทสินค้า"
            // value={values.name}
            onChange={handleOnChange}
          />
          <datalist id="productCategorys">
            {/* --------เสื้อผ้า------- */}
            <option value="เสื้อผ้าผู้ชาย" />
            <option value="เสื้อผ้าผู้หญิง" />
            {/* --------รองเท้า------- */}
            <option value="รองเท้าผู้ชาย" />
            <option value="รองเท้าผู้หญิง" />
            {/* --------กระเป๋า------- */}
            <option value="กระเป๋าผู้ชาย" />
            <option value="กระเป๋าผู้หญิง" />
            <option value="กระเป๋าเดินทาง" />
            {/* --------มือถือ------- */}
            <option value="โทรศัพท์มือถือ" />
            <option value="อุปกรณ์เสริม" />
            <option value="อื่นๆ" />
          </datalist>
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
          />
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="produtcCost1" className="col-1">
            ส่ง 1 ชิ้น
          </label>
          <input
            type="number"
            id="produtcCost1"
            name="produtcCost1"
            className="form-control col"
            placeholder="ราคา"
          />
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="produtcCost2" className="col">
            ส่งชิ้น
          </label>
          <input
            type="number"
            id="produtcCost2"
            name="produtcCost2"
            className="form-control col"
            placeholder="ชิ้น"
          />
          <label htmlFor="produtcCost2" className="col">
            ถึง
          </label>
          <input
            type="number"
            id="produtcCost2"
            name="produtcCost2"
            className="form-control col"
            placeholder="ชิ้น"
          />
          <label htmlFor="produtcCost2" className="col">
            ค่าส่งที่กำหนด
          </label>
          <input
            type="number"
            id="produtcCost2"
            name="produtcCost2"
            className="form-control col"
            placeholder="บาท"
          />
        </div>

        <div className="form-group row mt-3">
          <label htmlFor="produtcCost3" className="col">
            ส่งชิ้น
          </label>
          <input
            type="number"
            id="produtcCost3"
            name="produtcCost3"
            className="form-control col"
            placeholder="ชิ้น"
          />
          <label htmlFor="produtcCost3" className="col">
            ถึง
          </label>
          <input
            type="number"
            id="produtcCost3"
            name="produtcCost3"
            className="form-control col"
            placeholder="ชิ้น"
          />
          <label htmlFor="produtcCost3" className="col">
            ค่าส่งที่กำหนด
          </label>
          <input
            type="number"
            id="produtcCost3"
            name="produtcCost3"
            className="form-control col"
            placeholder="บาท"
          />
        </div>

        <div className="row mt-3 ">
          <button
            type="button"
            className="btn btn-primary col mx-3"
            onClick={handleUpload}
          >
            Submit
          </button>
          <button type="button" className="btn btn-danger col mx-3">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddImage;
