import React from "react";
import { firebaseDB } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { GrouprData } from "../../client/GroupData";
import Error007 from "../../error_007";

function Category() {
  const [values, setValues] = useState({});
  const [categorys, setCategorys] = useState("");

  useEffect(() => {
    if (categorys !== "") {
      firebaseDB
        .child("Product")
        .orderByChild("productCategory")
        .equalTo(categorys)
        .once("value", (snapshot) => {
          // productCategory
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(snapshot.val());
          } else {
            setValues({});
          }
        });
    }  else {
      firebaseDB
        .child("Product")
        .orderByChild("productAllow")
        .equalTo(true)
        .once("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(snapshot.val());
          } else {
            setValues({});
          }
        });
    }

    return () => {
      setValues({});
    };
  }, [categorys]);

  console.log(categorys);

  return (
    <div style={{ padding: "20px" }}>
      <h1>สินค้าทั้งหมด</h1>
      <div
        style={{
          padding: "50px",
          paddingTop: "20px",
          paddingLeft: "20px",
          background: "white",
          border: "1px solid lightgray",
          borderRadius: "20px",
        }}
      >
        <div className="flexbox" style={{ justifyContent: "center" }}>
          <div style={{ display: "block", width: "100%" }}>
            <select
              aria-label="Default select example"
              id="productCategory"
              name="productCategory"
              className="form-select"
              required
              style={{ marginBottom: "20px", width: "250px" }}
              onChange={(e) => setCategorys(e.target.value)}
            >
              <option value="">ประเภทสินค้า</option>
              {GrouprData.map((item, keys) => {
                return (
                  <option name="productCategory" key={keys} value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>

          {Object.keys(values).map((id, index) => {
            return (
              <div
                style={{
                  display: "block ",
                  height: "300px",
                  padding: "5px",
                  width: "12.5%",
                }}
                key={index}
              >
                {values[id].productAllow ? (
                  <div
                    type="button"
                    className="hoverproduct"
                    onClick={() =>
                      (window.location.href = `/view-product/${id}`)
                    }
                    style={{ borderRadius: "5px" }}
                  >
                    <div className="img-product">
                      <img
                        id="imgShow"
                        className="card-img-top "
                        style={{
                          width: "100%",
                          height: "180px",
                          borderRadius: "5px 5px 0px 0px",
                        }}
                        alt="Product Images"
                        src={values[id].productImg[0]}
                      />
                    </div>

                    <div
                      style={{
                        padding: "10px",
                        background: "white",
                        height: "80px",
                        borderRadius: "0px 0px 5px 5px",
                      }}
                    >
                      <div style={{ height: "40px", overflow: "hidden" }}>
                        <p
                          className="cut-text-multi"
                          style={{
                            fontWeight: "bold",
                            fontSize: "12px",
                            textAlign: "left",
                          }}
                        >
                          {values[id].productName}
                        </p>
                      </div>
                      <p
                        style={{
                          marginTop: "5px",
                          fontWeight: "bold",
                          fontSize: "12px",
                          textAlign: "left",
                          color: "#14DDA0",
                        }}
                      >
                        {values[id].productPrice} บาท
                      </p>
                    </div>
                  </div>
                ) : values == null ? (
                  console.log("NOT PRODUCT")
                ) : (
                  // <Error007/>
                  <></>
                )}
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
  );
}

export default Category;
