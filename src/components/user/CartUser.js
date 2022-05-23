import React, { useRef } from "react";
import { firebaseDB, firebaseAuth } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import PaymentProduct from "./PaymentProduct";
import * as RiIcons from "react-icons/ri";
import * as HiIcons from "react-icons/hi";
function CartUser() {
  const [values, setValues] = useState({});
  const [uid, setUid] = useState();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        firebaseDB
          .child("Cart")
          .child(user.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
              setUid(user.uid.toString());
            } else {
              setValues({});
            }
          });
        return () => {
          setValues({});
        };
      } else {
      }

      console.log(user.uid.toString());
    });
  }, []);

  const chkSeller =(id)=>{
    firebaseDB.child("Users").child(id).child("seller").on("value",(snapshot)=>{
       return <p>{snapshot.val().storeName}</p>
   });
  }

  const DeleteProductCart = (id, kery) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        firebaseDB.child(`Cart/${uid}/${id}/${kery}`).remove().then().catch();
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="default-bg">
      <div
        className="icon-bg"
        style={{ height: "60px", fontSize: "35px", marginTop: "10px" }}
      >
        <RiIcons.RiShoppingBasket2Line style={{ fontSize: "28px" }} />{" "}
        ตะกร้าสินค้า
      </div>
      <div  style={{ padding: "100px", paddingTop: "20px", paddingRight: "20px", background: "white", border: "1px solid lightgray", borderRadius: "15px", width: "100%",  }}>
        {Object.keys(values).map((id, index) => {
          const sum = [];
          const cost = [];
          const nameStore = [];
          firebaseDB.child("Users").child(id).child("seller").on("value",(snapshot)=>{
            return nameStore.push(snapshot.val().storeName);
        });

          return (
            <div
              key={index}
              className="grid-cart"
              style={{
                paddingLeft: "50px",
                paddingRight: "50px",
                marginTop: "10px",
              }}
            >
              <div className="btn btn-success"type="hidden" style={{ display: "block", width: "96%", marginBottom: "10px" }}>ร้าน : {nameStore}

              </div>
              <div className="big-cart">
                {Object.keys(values[id]).map((kery, i) => {
                  const value = values[id][kery];
                  const quantity = value.ValQuantity;
                  const allC = () => {
                    if (quantity >= value.produtcCost301) {
                      return value.produtcCost302;
                    } else if (quantity >= value.produtcCost201) {
                      return value.produtcCost202;
                    } else {
                      return value.produtcCost100;
                    }
                  }
                  sum.push(value.productPrice * value.ValQuantity)
                  cost.push(allC())
                  return (

                    <div className="item-cart" key={i}>

                      <div className="cart-detail">
                        <div>
                          <img
                            style={{
                              borderRadius: "15%",
                              overflow: "hidden",
                              width: "80px",
                              height: "80px",
                            }}
                            src={value.productImg[0]}
                          />
                        </div>

                        <div
                          style={{ fontSize: "22px" }}
                          className="cart-detail-item"
                        >
                          <h4>{value.productName}</h4> <br />
                          <h5 style={{ color: "gray" }}>
                            {value.productPrice} บาท / ชิ้น
                          </h5>{" "}
                          <br />
                        </div>
                      </div>
                      <div className="cart-hr" />
                      <div className="cart-payment" >
                        <div
                          style={{
                            weight: "15px",
                            height: "15px",
                            alignItems: "center",
                            paddingTop: "6%",
                          }}
                        >
                          <div style={{marginLeft:"30px"}}>
                            <a a style={{ color: "rgb(23, 192, 113)", fontWeight: "bold", fontSize: "32px" }}>{value.productPrice * value.ValQuantity} </a><a>บาท</a>
                            <br></br>
                            <button
                              style={{ marginLeft: "50px" }}
                              type="button"
                              onClick={() =>
                                firebaseDB
                                  .child("Cart")
                                  .child(uid)
                                  .child(id)
                                  .child(kery)
                                  .update({
                                    ValQuantity: value.ValQuantity - 1,
                                  })
                              }
                            >
                              <HiIcons.HiMinus className="btn-delete" />
                            </button>
                            <input
                              type="text"
                              style={{
                                width: "100px",
                                textAlign: "center",
                                marginLeft: "5px",
                                marginRight: "5px",
                              }}
                              id="orderQuantity"
                              name="orderQuantity"
                              value={value.ValQuantity}
                              onChange={(e) => e.target.value}
                            />

                            <button
                              type="button"
                              onClick={() =>
                                firebaseDB
                                  .child("Cart")
                                  .child(uid)
                                  .child(id)
                                  .child(kery)
                                  .update({
                                    ValQuantity: value.ValQuantity + 1,
                                  })
                              }
                            >
                              <HiIcons.HiPlus className="btn-add" />
                            </button>
                          </div>
                          <div style={{ textAlign: "right", marginTop: "20px",  width: "100%" }} >
                            <button
                              className="bin-icon"
                              style={{
                                fontSize: "22px",
                              }}
                              variant="primary"
                              onClick={() => DeleteProductCart(id, kery)}
                            >
                              <RiIcons.RiDeleteBin5Fill />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="small-cart" style={{ marginLeft: "25px" }}>
                <div
                  style={{
                    fontSize: "20px",
                    width: "100%",
                    height: "100%",
                    borderRadius: "0px 0px 15px 0px ",
                    padding: "10px",
                    paddingLeft: "30px",
                  }}
                >
                  <div>
                    <h6 style={{ marginBottom: "20px" }}>ราคาสินค้า : <a style={{ color: "rgb(23, 192, 113)", fontWeight: "bold", fontSize: "22px" }}>{sum.reduce((partialSum, a) => partialSum + a, 0)} </a> บาท</h6>
                    <h6 style={{ marginBottom: "20px" }}>ค่าส่ง : <a style={{ color: "rgb(23, 192, 113)", fontWeight: "bold", fontSize: "22px" }}> {cost.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0)}</a>  บาท</h6>
                    <h5 style={{ marginBottom: "20px" }}>ทั้งหมด : <a style={{ color: "rgb(23, 192, 113)", fontWeight: "bold", fontSize: "32px" }}> {(sum.reduce((partialSum, a) => partialSum + a, 0)) + (cost.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0))} </a> บาท</h5>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-payment"
                  variant="primary"
                  onClick={() =>
                    (window.location.href = `/user/payments/${id}`)
                  }
                >
                  ชำระเงิน
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <br></br>
      <br></br>
    </div>
  );
}
export default CartUser;
