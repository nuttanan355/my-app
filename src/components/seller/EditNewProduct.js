import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { firebaseDB } from "../components/firebase";
// import { Toast } from "bootstrap";;
// import {dateKey} from '../dataKey';


function EditNewProduct() {
  // const [state ,setState] =useState({initialState});
  const [values, setValues] = useState({
    productName: "",
    productCategory: "",
    productPrice: "",
    productDetails: "",
    produtcCost1: "",
    produtcCost2: "",
    produtcCost3: "",
  });

  // const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    firebaseDB
      .child("product")
      .child(id)
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
        } else {
          setValues({});
        }
      });
    return () => {
      setValues({});
    };
  }, [id]);

  // useEffect(()=>{
  //   if(id){
  //     setState({...values[id]});
  //   }else{
  //     setState({...initialState});
  //   }
  //   return()=>{
  //     setState({...initialState});
  //   };
  // },[id,values]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const updateProduct = (e) => {
    e.preventDefault();

    if (values.productName == null) {
      console.log("null");
    } else {
      // --------add data----------------
      // ----------------- push----------เจคคีย์ใหม่ให้
      // ----------------- set----------ใส่ค่าที่มีอยู่ลงใน child
      firebaseDB
        .child("product")
        .child(id)
        .update(values, (error) => {
          if (error) {
            alert.error(error);
          } else {
            console.log("edit data success");
          }
        });
    }
  };

  return (
    <div className="container">
      <h1>Edit New Product</h1>
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
              value={values.productName}
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
              value={values.productCategory}
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
              value={values.productPrice}
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
              onClick={updateProduct}
            >
              Submit
            </button>
            <button type="button" className="btn btn-danger col mx-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
      <p className="">
        name :{values.productName} <br />
        category :{values.productCategory} <br />
        price :{values.productPrice}
      </p>
    </div>
  );
}
export default EditNewProduct;
