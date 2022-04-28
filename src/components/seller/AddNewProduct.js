import React, { useState } from "react";
import { firebaseDB, firebaseStorage } from "../../server/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { useParams } from "react-router-dom";
// import { storage } from "./firebase";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function AddNewProduct() {
  // ----------------ADD DATA--------------------------------
  const [values, setValues] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productImg: [],
    productDetails: "",
    produtcCost1: [],
    produtcCost2: [],
    produtcCost3: [],
  });

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const createProduct = (e) => {
    e.preventDefault();
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
    };
  };

  // ----------------EDN ADD DATA------------------------------

  // -----------ADD IMAGE----------------------------
  const [Images, setImages] = useState([]);
  // const [Upload,setUpload] = useState([]);

  const ImgOnChange = (e) => {
    const selectedFIles = [];
    const targetFilesObject = [...e.target.files];

    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setImages(selectedFIles);
    uploadFiles(targetFilesObject) ;
    // console.log(Images);
  };

  const uploadFiles = (targetFilesObject) => {

    const dowUrls = [];
     targetFilesObject.forEach((files)=> {
      const sotrageRef = ref(firebaseStorage,`product/${dateKey}/${files.name}`);
      const uploadTask = uploadBytesResumable(sotrageRef, files);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // const prog = Math.round(
          //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          // );
          // setProgress(prog);
        },
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            // dowURLs = [...e.target.downloadURL]
            // dowURLs.map((downloadURL)=>{})
           return dowUrls.push(downloadURL);
          });
          
        }
      );
    }

    );
    setValues({...values,productImg:dowUrls});
    // createProduct();
  };

  //  const onUploadSubmission1 = e => {
  //   e.preventDefault(); // prevent page refreshing
  //     const promises = [];
  //     Images.forEach(image => {
  //      const uploadTask =
  //      firebaseStorage.ref().child(`product1/${dateKey}/${image.name}.jpg`).put(image);
  //         promises.push(uploadTask);
  //         uploadTask.on(
  //          'STATE_CHANGED',
  //            snapshot => {
  //             const progress = (
  //               (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  //                if (snapshot.state === 'RUNNING') {
  //                 console.log(`Progress: ${progress}%`);
  //                }
  //              },
  //              error => console.log(error.code),
  //              async () => {
  //                const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
  //                 // do something with the url
  //                 console.log(downloadURL);
  //               }
  //              );
  //            });
  //        Promise.all(promises)
  //         .then(() => alert('All files uploaded'))
  //         .catch(err => console.log(err.code));
  //  }

  // -----------END ADD IMAGE----------------------------

  return (
    <div className="container">
      <h1>Add New Product</h1>
      <hr />
      <div className="container">
        {/* <form onSubmit={''}> */}
        <form>
          <div className="form-group">
            <label htmlFor="productImg">รูปภาพ</label>
            <input
              accept="image/*"
              type="file"
              onChange={ImgOnChange}
              multiple
            />

{/* {values.productImg.map(i=>(   <p>
{i.value}
</p>)

)} */}
            {/* {Images.map((url, i) => (
              <div key={i}>
                <a href={url} target="_blank">
                  {url}
                </a>
              </div>
            ))}
            <br /> */}
            {Images.map((url, i) => (
              <img
                key={i}
                style={{ width: "300px" }}
                src={url}
                alt="firebase-images"
              />
            ))}
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
            <button type="button" className="btn btn-primary col mx-3" onClick={createProduct}>
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
