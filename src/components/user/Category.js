import React from 'react'
import { firebaseDB } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
function Category() {
  const [values, setValues] = useState({});
  useEffect(() => {
    firebaseDB.child("Product").orderByChild("productAllow").equalTo(true).once("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setValues({ ...snapshot.val() });
        console.log(snapshot.val());
      } else {
        setValues({});
      }
    });
    return () => {
      setValues({});
    };
  }, []);
  return (
    <div><a href="/"> หน้าหลัก \</a><a href="#"> หมวดหมู่ \</a>
      <div className='default-bg'>
        <div className='flexbox' >


          {Object.keys(values).map((id, index) => {
            return (

              <div key={index} className="thumbnail"
                style={{
                  background: "#ffffff",
                  border: "0",
                  width: "12.5%",
                  padding: "5px",
                  borderRadius:"5px"
                }}
                onClick={() =>
                  (window.location.href = `/view-product/${id}`)
                }

              >
                <div style={{ height: "auto", overflow: "hidden" }}>
                  <img
                    id="imgShow"
                    className="card-img-top "
                    style={{ width: "100%" }}
                    alt="Product Images"
                    src={values[id].productImg[0]}
                  />
                </div>
                <div style={{ paddingTop: "10px", paddingLeft: "15px", height: "100px" }}>
                  <p style={{ fontWeight: "bold", fontSize: "12px", textAlign: "left" }}>{values[id].productName}</p>
                  <p style={{ marginTop: "15px", fontWeight: "bold", fontSize: "12px", textAlign: "left" }}>{values[id].productPrice} บาท</p>
                </div>
              </div>
            );
          })}



        </div>
      </div>
    </div>
  )
}

export default Category