import React from "react";
import { firebaseDB, firebaseAuth } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import PaymentProduct from "./PaymentProduct";
import * as RiIcons from 'react-icons/ri';
import * as HiIcons from 'react-icons/hi';
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
              // console.log(snapshot.child('productImg'));
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

  // console.log(values);

  const DeleteProductCart = (id, kery) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        firebaseDB.child(`Cart/${uid}/${id}/${kery}`).remove().then().catch();
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    // console.log("ID",id);
    // console.log("KERY",kery);
    // if (
    //   window.confirm("Are you sure that you wanted to delete that contact ?")
    // ) {
    //   firebaseDB.child(`Cart/${uid}/${id}/${kery}`).remove().then().catch();
    // }
  };
  return (
    <div className="default-bg">
      <div className="icon-bg" style={{ height: "60px", fontSize: "35px", marginTop: "10px" }}>
        <RiIcons.RiShoppingBasket2Line style={{ fontSize: "28px" }} /> ตะกร้าสินค้า
      </div>
      <div>
        {Object.keys(values).map((id, index) => {
          return (
            <div style={{ paddingLeft: "50px", paddingRight: "50px", marginTop: "10px" }}>
              <div className="big-cart" key={index}>
                {Object.keys(values[id]).map((kery, i) => {
                  const value = values[id][kery];
                  console.log(kery)
                  return (
                    <div className="item-cart" key={i}>
                      <div ></div>
                      <div className="cart-detail">
                        <div>
                          <img style={{ borderRadius: "15%", overflow: "hidden", width: "80px", height: "80px" }} src={value.productImg[0]} />
                        </div>

                        <div style={{ fontSize: "22px" }} className="cart-detail-item">{value.productName}</div>
                      </div>
                      <div className="cart-hr" />
                      <div className="cart-payment">
                        <button className="bin-icon"
                          style={{ marginRight: "20px", marginLeft: "20px", fontSize: "22px" }}
                          variant="primary"
                          onClick={() => DeleteProductCart(id, kery)}
                        >
                          <RiIcons.RiDeleteBin5Fill />
                        </button>
                        <div style={{ weight: "15px", height: "15px", alignItems: "center", paddingTop: "6%" }}>
                          <button  style={{ marginLeft: "50px" }}
                            type="button"
                            onClick={() =>
                              firebaseDB
                                .child("Cart")
                                .child(uid)
                                .child(id)
                                .child(kery)
                                .update({ ValQuantity: value.ValQuantity - 1 })
                            }
                          >
                            <HiIcons.HiMinus className="btn-delete" />
                          </button>

                          <input

                            type="text"
                            style={{ width: "100px", textAlign: "center", marginLeft: "5px", marginRight: "5px" }}
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
                                .update({ ValQuantity: value.ValQuantity + 1 })
                            }
                          >
                            <HiIcons.HiPlus className="btn-add"/>
                          </button>

                        </div>

                      </div>

                    </div>

                  )
                })}
                <div style={{ width: "100%", textAlign: "right" }}>
                  <button type="button" className="btn-payment" style={{ fontSize: "20px", width: "20%", height: "60px", borderRadius: "0px 0px 15px 0px " }}
                    variant="primary"
                    onClick={() => (window.location.href = `/user/payments/${id}`)}
                  >
                    ชำระเงิน
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CartUser;
