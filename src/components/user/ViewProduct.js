import { red } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { firebaseDB, firebaseAuth } from "../../server/firebase";

function ViewProduct() {
  const [values, setValues] = useState({});
  const [Images, setImages] = useState([]);
  const [ValQuantity, setValQuantity] = useState(1);
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    firebaseDB
      .child("Product")
      .child(id)
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
  }, [id]);

  // console.log("values", values);
  // console.log("users", user);

  const addCart = () => {
    const refDB = firebaseDB.child("Cart").child(user.uid).child(values.sellerUid).child(id);
    if (values.Address !== null) {
      refDB.set(values)
        .then(() => {
          refDB.update({ ValQuantity: ValQuantity, }).then(() => {
            Swal.fire('เพิ่มลงตะกร้าแล้ว').then(() => window.location.href = '/');
          }).catch((err) => {
            console.log(err);
          })
        })
        .catch((err) => console.log(err));
    } else {
      window.location.href = "/user/profile"
    }

  };
  // console.log("values", values);
  return (
    <div className="container py-5">
      <a href="/"> หน้าหลัก \</a>
      <a href="#"> สินค้า \</a> <a href="#">{values.productCategory}</a>
      <div>
        <div>
          {/* <div className="card-header">
            <h3>{values.productName}</h3>
          </div> */}
          <div className="container">
            <div className="row" style={{ width: "100%", padding: "20px" }}>
              <div className="col flex-view" style={{ width: "60%" }}>
                <div clessName="flex-view-item">

                  {Images.map((url, i) => (
                    <img className="view-img"
                      src={url}
                      key={i}
                      style={{ boxShadow: "2px 2px 3px lightgray" }}
                      alt="firebase-images"
                    />
                  ))}
                  
                </div>

              </div>

              <div
                className="col"
                style={{
                  borderLeft: "1px solid lightgray",
                  minHeight: "500px",
                  width: "1000px",
                }}
              >
                <div style={{ paddingLeft: "100px" }}>
                  <div style={{ marginTop: "20px" }}>
                    <strong className="cut-text-multi-5" style={{ fontSize: "40px", fontWeight: "bold" }}>
                      {values.productName}
                    </strong>
                  </div>
                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col">
                      <p>ลงขายเมื่อ {values.produtcDate}</p>
                    </div>
                  </div>

                  <div className="row" style={{ marginTop: "20px" }}>
                    <div className="col-3">
                      <h2 style={{ color: "#14DDA0", fontWeight: "bold", textAlign:"right" }}>{values.productPrice} </h2>

                    </div>
                    <div className="col">
                      <p style={{ fontWeight: "bold" }}>บาท / ชิ้น</p>
                    </div>
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <strong>ร้าน: </strong>
                    <span>{values.storeName}</span>
                    <br />

                    <button
                      type="button"

                      className="btn btn-outline-danger"
                      onClick={() =>
                        setValQuantity((ValQuantity) => ValQuantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      style={{ background: "#f8f8f8", textAlign: "center", marginRight: "10px", marginLeft: "10px", marginTop: "70px", width: "100px" }}
                      id="orderQuantity"
                      name="orderQuantity"
                      value={ValQuantity}
                      onChange={(e) => e.target.value}
                    />

                    <button
                      type="button"

                      className="btn btn-outline-primary"
                      onClick={() =>
                        setValQuantity((ValQuantity) => ValQuantity + 1)
                      }
                    >
                      +
                    </button>
                    <br />
                    <div style={{ textAlign: "right", paddingRight: "50px" }}>
                      <Button
                        type="button"
                        className="btn-payment"
                        data-toggle="button"
                        aria-pressed="false"
                        autoComplete="off"
                        onClick={() => addCart()}
                        style={{ marginTop: "20px", border: "0px", borderRadius: "15px" }}
                      >
                        เพิ่มลงตะกร้า
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row" style={{ background: "white", height: "100px", marginTop: "20px", marginBottom: "20px", borderRadius: "15px" }}>
              <div style={{}}>
                <img clasName="col" src='/img/store.png' style={{ height: "70px" , marginTop:"15px",marginLeft:"15px"}} /><span style={{fontSize:"22px"}}>{values.storeName}</span>
              </div>
            </div>

            <div className="row">
              <div >
                <div>
                  <div className="col" style={{ padding: "10px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "15px" }}>
                    <h3 style={{ color: "lightgray" }}>รายละเอียดสินค้า</h3>
                    <hr style={{ width: "80%" }} />

                    <div >
                      <p style={{ fontSize: "18px", fontWeight:"bold" }} >
                        {values.productName}
                      </p>
                      <p style={{ fontSize: "18px" }}>
                        {values.productDetails}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: "50px" }}>
              <div style={{ textAlign: "center" }}>
                {Images.map((url, i) => (
                  <img
                    src={url}
                    key={i}
                    alt="firebase-images"
                    style={{ width: "700px", marginBottom: "20px" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewProduct;

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
