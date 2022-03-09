import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {firebaseDB} from "../firebase";

function ViewNewProduct() {
  const [values, setValues] = useState({});
  const { id } = useParams();
  useEffect(() => {
    firebaseDB
      .ref("product")
      .child(id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setValues({ ...snapshot.val() });
        } else {
          setValues({});
        }
      });
  });
//   productName: "",
//   productCategory: "",
//   productPrice: "",
//   productDetails: "",
//   produtcCost1: "",
//   produtcCost2: "",
//   produtcCost3: "",
  console.log("values", values);
  return (
    <div className="container py-5">
      <div style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="card-header">
            <p>User Contact Detail</p>
          </div>
          <div className="container">
            <strong>ID: </strong>
            <span>{id}</span>
            <br />
            <br />
            <strong>Name: </strong>
            <span>{values.productName}</span>
            <br />
            <br />
            <strong>Email: </strong>
            <span>{values.productCategory}</span>
            <br />
            <br />
            <strong>Contact: </strong>
            <span>{values.productPrice}</span>
            <br />
            <br />
            
            <Link to="../">
              <button className="btn btn-edit">Go Back</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewNewProduct;
