import React from "react";
import { firebaseDB, firebaseAuth } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import PaymentProduct from "./PaymentProduct";

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
      <div>
        {Object.keys(values).map((id, index) => {
          return (
            <div style={{ paddingLeft: "50px", paddingRight: "50px", marginTop: "50px" }}>
              <div key={index}>
                {Object.keys(values[id]).map((kery, i) => {
                  const value = values[id][kery];
                  console.log(kery)
                  return (
                    <div className="item-cart" key={i}>
                      <div className="cart-detail"><img className="img-cart" src={value.productImg[0]} />
                        <div style={{fontSize:"36px"}} className="cart-detail-item">{value.productName}</div>
                        <div className="cart-detail-item">ชื่อร้าน : {id}</div>
                      </div>
                      <div className="cart-hr" />
                      <div className="cart-payment">
                        <div className="cart-detail-item">ชื่อร้าน : {id}</div>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
export default CartUser;
