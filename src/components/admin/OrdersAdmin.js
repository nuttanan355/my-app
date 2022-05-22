import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { firebaseAuth, firebaseDB } from "../../server/firebase";

function OrdersAdmin() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user.uid.toString());
      if (user !== null) {
        firebaseDB
          .child("Orders")
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
export default OrdersAdmin;
