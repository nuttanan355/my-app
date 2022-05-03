import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {firebaseDB} from "../../server/firebase";

function ViewProduct() {

  const [values, setValues] = useState({});
  const [Images, setImages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    firebaseDB.child("product").child(id)
         .on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            setImages(snapshot.child("productImg").val());
          } else {
            setValues({});
          }
      });
      return () => {
        setValues({});
      };
  },[id]);

  const addCart=()=>{
    firebaseDB.child("cart")

  }

  // sellerUid: "",
  // productName: "",
  // productCategory: "",
  // productPrice: "",
  // productAllow: false,
  // productImg: [],
  // productDetails: "",
  // produtcDate: saveCurrentDate,
  // produtcTime: saveCurrentTime,
  // produtcCost100: "",
  // produtcCost200: "",
  // produtcCost201: "",
  // produtcCost202: "",
  // produtcCost300: "",
  // produtcCost301: "",
  // produtcCost302: "",

  console.log("values", values);
  return (
    <div className="container py-5">
      <div style={{ marginTop: "150px" }}>
        <div className="card">
          <div className="card-header">
            <h3>{values.productName}</h3>
          </div>
          <div className="container">
            {Images.map((url,i)=>(<img
                  style={{ width: "300px" }}
                  src={url}
                  key={i}
                  alt="firebase-images"
                />)
            )}
            <br />
            <strong>Name: </strong>
            <span>{values.productName}</span>
            <br />
            <strong>Email: </strong>
            <span>{values.productCategory}</span>
            <br />
            <strong>Contact: </strong>
            <span>{values.productPrice}</span>
            <br />
            <Link to="../">
            <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
              Go Back
            </button>
            </Link>
            
            <button type="button" className="btn btn-primary" data-toggle="button" aria-pressed="false" autoComplete="off">
              Cart
            </button>
        
          </div>
        </div>
      </div>
    </div>
  );
}export default ViewProduct;