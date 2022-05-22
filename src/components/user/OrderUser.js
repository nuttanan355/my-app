import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Card, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { firebaseAuth, firebaseDB } from "../../server/firebase";

function OrderUser() {
  const [values, setValues] = useState({});
  //   const [order, setOrder] = useState({});
  //   const [address, setAddress] = useState({});

  //   console.log("values", values);
  //   console.log("order", order);
  //   console.log("address", address);

  const updaateOrderSucceed = (id) => {
      Swal.fire({
        title: "คุณยอมรับสินค้า ?",
        text: "คุณจะยืนยันไหมว่า ได้รับสินค้าแล้ว",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยอมรับ",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("ยอมรับสินค้า !", "คุณได้รับสินค้าแล้ว.", "success");
          firebaseDB
            .child("Orders")
            .child(id)
            .update({ OrderSucceed: true })
            .then(() => {
              firebaseDB
              .child("Orders")
              .child(id).child("statusOrder")
              .remove()
              .then(() => {
                // alert("Add Admin success");
              })
              .catch((error) => {
                console.error(error);
              });
            })
            .catch((error) => {
              console.error(error);
            });
        }});
  };


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user.uid.toString());
      if (user !== null) {
        firebaseDB
          .child("Orders")
          .orderByChild("userID").equalTo(user.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
            } else {
              setValues({});
            }
          });
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
      <h1>Order</h1>
      <hr />
      <div className="container">
        <Tabs
          defaultActiveKey="orderWaiting"
          id="uncontrolled-tab-example"
          fill
          justify
        >
          <Tab eventKey="orderWaiting" title="รอจัดส่ง">
            <p>รอจัดส่ง</p>
            {Object.keys(values).map((id, index) => {
              return (
                <div className="container px-5" key={index}>
                  {values[id].statusOrder==false ? (
                    <div className="card my-3">
                      <div className="card-body">
                        ชื่อ : {values[id].address.fullName}
                      </div>
                      <div className="card-body">
                        เบอร์โทร : {values[id].address.phoneNumber}
                      </div>
                      <div className="card-body">
                        ที่อยู่ : {values[id].address.addressDetails}{" "}
                        รหัสไปรษณีย์ : {values[id].address.zipcode}
                      </div>
                      <div className="card-body">
                        <p>รายการ</p>
                        <hr />
                        {Object.keys(values[id].OrderList).map((listID, i) => {
                          let list = values[id].OrderList[listID];
                          return (
                            <div key={i}>
                              <div className="card">
                                <div className="card-body">
                                  <p>{list.productName}</p>
                                  <p>{list.productCategory}</p>
                                  <p>{list.ValQuantity}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              );
            })}
          </Tab>

          <Tab eventKey="orderSending" title="กำลังส่ง">
          <p>กำลังส่ง</p>
            {Object.keys(values).map((id, index) => {
              return (
                <div className="container px-5" key={index}>
                  {values[id].statusOrder==true ? (
                    <div className="card my-3">
                      <div className="card-body">
                        ชื่อ : {values[id].address.fullName}
                      </div>
                      <div className="card-body">
                        เบอร์โทร : {values[id].address.phoneNumber}
                      </div>
                      <div className="card-body">
                        ที่อยู่ : {values[id].address.addressDetails}{" "}
                        รหัสไปรษณีย์ : {values[id].address.zipcode}
                      </div>
                      <div className="card-body">
                        <p>รายการ</p>
                        <hr />
                        {Object.keys(values[id].OrderList).map((listID, i) => {
                          let list = values[id].OrderList[listID];
                          return (
                            <div key={i}>
                              <div className="card">
                                <div className="card-body">
                                  <p>{list.productName}</p>
                                  <p>{list.productCategory}</p>
                                  <p>{list.ValQuantity}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                          className="btn btn-primary mt-3"
                          onClick={() => updaateOrderSucceed(id)}
                        >
                          ยอมรับสินค้า
                        </button>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              );
            })}
          </Tab>

          <Tab eventKey="oderSucceed" title="สำเร็จ">
          <p>สำเร็จ</p>
            {Object.keys(values).map((id, index) => {
              return (
                <div className="container px-5" key={index}>
                  {values[id].OrderSucceed == true ? (
                    <div className="card my-3">
                      <div className="card-body">
                        ชื่อ : {values[id].address.fullName}
                      </div>
                      <div className="card-body">
                        เบอร์โทร : {values[id].address.phoneNumber}
                      </div>
                      <div className="card-body">
                        ที่อยู่ : {values[id].address.addressDetails}{" "}
                        รหัสไปรษณีย์ : {values[id].address.zipcode}
                      </div>
                      <div className="card-body">
                        <p>รายการ</p>
                        <hr />
                        {Object.keys(values[id].OrderList).map((listID, i) => {
                          let list = values[id].OrderList[listID];
                          return (
                            <div key={i}>
                              <div className="card">
                                <div className="card-body">
                                  <p>{list.productName}</p>
                                  <p>{list.productCategory}</p>
                                  <p>{list.ValQuantity}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                </div>
              );
            })}
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
export default OrderUser;
