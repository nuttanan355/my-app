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
        <Tabs defaultActiveKey="orderWaiting" id="uncontrolled-tab-example"
          fill
          justify
        >
          <Tab eventKey="orderWaiting" title="รอจัดส่ง" className="bg-light">
            {Object.keys(values).map((id, index) => {
              const sum = [];
              const cost = [];
              return (
                <div className="px-3 pt-3" key={index}>
                  {values[id].statusOrder == false ? (
                    <div className="p-3 border border-dark rounded bg-light">
                      <label className="me-5">
                        ชื่อ : {values[id].address.fullName}
                      </label>
                      <label>เบอร์โทร : {values[id].address.phoneNumber}</label>
                      <br />
                      <label className="me-5">
                        ที่อยู่ : {values[id].address.addressDetails}
                      </label>
                      <label>รหัสไปรษณีย์ : {values[id].address.zipcode}</label>

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
                          <div key={i}>
                            <div className="container mt-2">
                              <div className="row">
                                <div className="col-2">
                                <img
                                    id="imgShow"
                                    className="card-img-top mx-1"
                                    style={{
                                      width: "80px",
                                      height: "70px",
                                    }}
                                    alt="Product Images"
                                    src={list.productImg[0]}
                                  />
                                </div>
                                <div className="col-10">
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
                                ราคารวม : {list.ValQuantity * list.productPrice}{" "}
                                บาท
                              </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <hr />
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
                  ) : (
                    <p></p>
                  )}
                </div>
              );
            })}
          </Tab>

          

          <Tab eventKey="orderSending" title="กำลังส่ง" className="bg-light">
          {Object.keys(values).map((id, index) => {
              const sum = [];
              const cost = [];
              return (
                <div className="px-3 pt-1" key={index}>
                  {values[id].statusOrder == true ? (
                    <div className="p-3 border border-dark rounded bg-light">
                      <label className="me-5">
                        ชื่อ : {values[id].address.fullName}
                      </label>
                      <label>เบอร์โทร : {values[id].address.phoneNumber}</label>
                      <br />
                      <label className="me-5">
                        ที่อยู่ : {values[id].address.addressDetails}
                      </label>
                      <label>รหัสไปรษณีย์ : {values[id].address.zipcode}</label>

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
                          <div key={i}>
                            <div className="container mt-2">
                              <div className="row">
                                <div className="col-2">
                                <img
                                    id="imgShow"
                                    className="card-img-top mx-1"
                                    style={{
                                      width: "80px",
                                      height: "70px",
                                    }}
                                    alt="Product Images"
                                    src={list.productImg[0]}
                                  />
                                </div>
                                <div className="col-10">
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
                                ราคารวม : {list.ValQuantity * list.productPrice}{" "}
                                บาท
                              </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <hr />
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
                  ) : (
                    <p></p>
                  )}
                </div>
              );
            })}
          </Tab>

          <Tab eventKey="oderSucceed" title="สำเร็จ" className="bg-light">
       
                  {/* {values[id].OrderSucceed == true ? ( */}
                  {Object.keys(values).map((id, index) => {
              const sum = [];
              const cost = [];
              return (
                <div className="px-3 pt-1" key={index}>
                  {values[id].OrderSucceed == true ? (
                    <div className="p-3 border border-dark rounded bg-light">
                      <label className="me-5">
                        ชื่อ : {values[id].address.fullName}
                      </label>
                      <label>เบอร์โทร : {values[id].address.phoneNumber}</label>
                      <br />
                      <label className="me-5">
                        ที่อยู่ : {values[id].address.addressDetails}
                      </label>
                      <label>รหัสไปรษณีย์ : {values[id].address.zipcode}</label>

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
                          <div key={i}>
                            <div className="container  mt-2">
                              <div className="row">
                                <div className="col-2">
                                <img
                                    id="imgShow"
                                    className="card-img-top mx-1"
                                    style={{
                                      width: "80px",
                                      height: "70px",
                                    }}
                                    alt="Product Images"
                                    src={list.productImg[0]}
                                  />
                                </div>
                                <div className="col-10">
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
                                ราคารวม : {list.ValQuantity * list.productPrice}{" "}
                                บาท
                              </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <hr />
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
