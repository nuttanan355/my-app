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
      <div>
        {Object.keys(values).map((id, index) => {
          const sum =[];
          const cost =[];
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
              <div className="big-cart">
                {Object.keys(values[id]).map((kery, i) => {
                  const value = values[id][kery];
                  const quantity = value.ValQuantity;
                  const allC=()=>{
                    if(quantity >= value.produtcCost301){
                      return value.produtcCost302;
                    }else if(quantity >= value.produtcCost201){
                      return value.produtcCost202;
                    }else{
                      return value.produtcCost100;
                    }
                  }
                  sum.push(value.productPrice * value.ValQuantity)
                  cost.push(allC())
                  return (
                    <div className="item-cart" key={i}>
                      <div></div>
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
                            {value.productPrice} ฿ / ชิ้น
                          </h5>{" "}
                          <br />
                        </div>
                      </div>
                      <div className="cart-hr" />
                      <div className="cart-payment">
                        <button
                          className="bin-icon"
                          style={{
                            marginRight: "20px",
                            marginLeft: "20px",
                            fontSize: "22px",
                          }}
                          variant="primary"
                          onClick={() => DeleteProductCart(id, kery)}
                        >
                          <RiIcons.RiDeleteBin5Fill />
                        </button>
                        <div
                          style={{
                            weight: "15px",
                            height: "15px",
                            alignItems: "center",
                            paddingTop: "6%",
                          }}
                        >
                          <div>
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
                          <p>{value.productPrice * value.ValQuantity}</p>  
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
                  }}
                >
                  <div>
                    <h5>รวมราคา : {sum.reduce((partialSum, a) => partialSum + a, 0)}</h5>
                    <br />
                    <h5>ค่าส่ง : {cost.reduce((partialSum, a) => parseInt(partialSum) + parseInt(a),0)}</h5>
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
    </div>
  );
}
export default CartUser;
