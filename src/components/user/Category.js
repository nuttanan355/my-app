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
    <div>
      <h1>สินค้าทั้งหมด</h1>
      <div style={{ padding: "50px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "20px", width: "80%" }}>
        <div className='flexbox' style={{ justifyContent: "center" }} >
          {Object.keys(values).map((id, index) => {
            return (
              <div style={{ display: "block ", height: "300px", padding: "5px", width: "12.5%" }} key={index} >
                <div type="button" className="card" onClick={() => (window.location.href = `/view-product/${id}`)} style={{ borderRadius: "5px" }}>
                  <div className='img-product' >
                    <img
                      id="imgShow"
                      className="card-img-top "
                      style={{ width: "100%", height: '180px', borderRadius: "5px 5px 0px 0px" }}
                      alt="Product Images"
                      src={values[id].productImg[0]}
                    />
                  </div>

                  <div style={{ padding: "10px", background: "white", height: "80px", borderRadius: "0px 0px 5px 5px" }}>
                    <div style={{ height: "40px", overflow: "hidden" }}>
                      <p className='cut-text-multi' style={{ fontWeight: "bold", fontSize: "12px", textAlign: "left" }}>{values[id].productName}</p>
                    </div>
                    <p style={{ marginTop: "5px", fontWeight: "bold", fontSize: "12px", textAlign: "left", color: "#14DDA0" }}> {values[id].productPrice} บาท </p>
                  </div>




                </div>
              </div>


              // <div type="button" key={index}
              //   style={{
              //     border: "0",
              //     height: "310px",
              //     width: "12.5%",
              //     margin: "5px",
              //     // borderRadius: "5px",
              //     // paddingLeft: "5px",
              //     // paddingRight: "5px",
              //     background: "green",
              //     marginBottom: "10px"
              //   }}
              //   onClick={() =>
              //     (window.location.href = `/view-product/${id}`)
              //   }

              // >
              //   <div style={{ height: "auto", overflow: "hidden" }}>
              //     <img
              //       id="imgShow"
              //       className="card-img-top "
              //       style={{ width: "200px", height: '200px' }}
              //       alt="Product Images"
              //       src={values[id].productImg[0]}
              //     />
              //   </div>
              //   <div style={{ padding: "10px", background: "white", height: "100px" }}>
              //     <div style={{ background: "red", height: "60px", overflow: "hidden" }}>
              //       <p style={{ fontWeight: "bold", fontSize: "12px", textAlign: "left" }}>{values[id].productName}</p>
              //     </div>
              //     <p style={{ marginTop: "5px", fontWeight: "bold", fontSize: "12px", textAlign: "left" }}>{values[id].productPrice} บาท</p>
              //   </div>
              // </div>
            );
          })}



        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}

export default Category