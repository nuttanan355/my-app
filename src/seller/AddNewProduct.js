import React, { useState } from "react";
import firebaseDB from "../firebase";
// import { Toast } from "bootstrap";;
// import {dateKey} from '../dataKey';

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function AddNewProduct() {
  const [values, setValues] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productDetails: "",
    produtcCost1: "",
    produtcCost2: "",
    produtcCost3: "",
  });
  const handleOnChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  

  const createProduct=(e)=>{
    e.preventDefault();

    if(!useState){
      console.error("null");
    }else{
      // --------add data----------------
      // ----------------- push----------เจคคีย์ใหม่ให้
      // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB.child("product").child(dateKey).set(values,(error)=>{
        if(error){
          alert.error(error);
        }
        else{
          console.log("add data success");
        }
    });
  }
}
  
  return (
    <div className="container">
      <h1>Add New Product</h1>
      <hr />
      <div className="container">
        <form>
          <div className="form-group">
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

          {/* <div className="form-group mt-3">
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
          </div> */}

          <div className="row mt-3 ">
            <button type="button" className="btn btn-primary col mx-3" onClick={createProduct} >
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
