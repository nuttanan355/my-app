import { Tab } from "bootstrap";
import React, { useEffect, useState } from "react";
import { Tabs } from "react-bootstrap";
import { firebaseAuth, firebaseDB } from "../../server/firebase";

function OrdersAdmin() {
  const [values, setValues] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    firebaseDB.child("Users").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setUsers(snapshot.val());
      } else {
        setUsers({});
      }
    });

    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user.uid.toString());
      if (user !== null) {
        firebaseDB.child("Orders").on("value", (snapshot) => {
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
          <Tab eventKey="orderWaiting" title="รอจัดส่ง" className="bg-dark">
            {/* <p>รอจัดส่ง</p> */}
            {Object.keys(values).map((id, index) => {
              const sum = [];
              const cost = [];
              return (
                <div className="container px-3 py-3" key={index}>
                  {values[id].statusOrder == false ? (
                    <div className="card my-3">
                      <div className="card-body">
                        <label className="me-5">
                          ชื่อ : {values[id].address.fullName}
                        </label>
                        <label>
                          เบอร์โทร : {values[id].address.phoneNumber}
                        </label>
                        <br />
                        <label className="me-5">
                          ที่อยู่ : {values[id].address.addressDetails}
                        </label>
                        <label>
                          รหัสไปรษณีย์ : {values[id].address.zipcode}
                        </label>

                        <div className="row mt-3 mx-2">
                          <p className="col">รายการ</p>
                          <p className="col text-right">
                            {users[values[id].sellerID].seller.storeName}
                          </p>
                        </div>

                        <hr />
                        {Object.keys(values[id].OrderList).map((listID, i) => {
                          let list = values[id].OrderList[listID];
                          const quantity = list.ValQuantity;
                          const allC = () => {
                            if (quantity >= list.produtcCost301) {
                              return list.produtcCost302;
                            } else if (quantity >= list.produtcCost201) {
                              return list.produtcCost202;
                            } else {
                              return list.produtcCost100;
                            }
                          };
                          sum.push(list.productPrice * list.ValQuantity);
                          cost.push(allC());
                          // let list = values[id].OrderList[listID];
                          return (
                            <div className="card" key={i}>
                              <div className="card-body">
                                <label className="me-5">
                                  ชื่อ : {list.productName}
                                </label>
                                <label className="me-5">
                                  ประเภท : {list.productCategory}
                                </label>
                                <label className="me-5">
                                  ราคาต่อชิ้น : {list.productPrice} บาท
                                </label>
                                <label className="me-5">
                                  จำนวน : {list.ValQuantity} ชิ้น
                                </label>
                                <label className="me-5">
                                  ราคารวม :{" "}
                                  {list.ValQuantity * list.productPrice} บาท
                                </label>
                              </div>
                            </div>
                          );
                        })}
                        <div>
                          <label className="me-5">
                            ราคาสินค้า :{" "}
                            {sum.reduce((partialSum, a) => partialSum + a, 0)}
                          </label>
                          <label className="me-5">
                            ค่าส่ง :{" "}
                            {cost.reduce(
                              (partialSum, a) =>
                                parseInt(partialSum) + parseInt(a),
                              0
                            )}
                          </label>
                          <label className="me-5">
                            ทั้งหมด :{" "}
                            {sum.reduce((partialSum, a) => partialSum + a, 0) +
                              cost.reduce(
                                (partialSum, a) =>
                                  parseInt(partialSum) + parseInt(a),
                                0
                              )}{" "}
                            บาท
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p></p>
                  )}
                  <hr />
                </div>
              );
            })}
          </Tab>

          <Tab eventKey="orderSending" title="กำลังส่ง">
            {/* <p>กำลังส่ง</p> */}
            {Object.keys(values).map((id, index) => {
              return (
                <div className="container px-5" key={index}>
                  {values[id].statusOrder == true ? (
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
            {/* <p>สำเร็จ</p> */}
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
