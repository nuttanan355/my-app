import { Button } from "bootstrap";
import { updateMetadata } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { Form, Tab, Tabs } from "react-bootstrap";
import Swal from "sweetalert2";
import { CargoData } from "../../client/CargoData";
import { firebaseAuth, firebaseDB } from "../../server/firebase";

function OrderSellerList() {
  const [values, setValues] = useState({});
  const [OrderPackage, setOrderPackage] = useState(null);
  const [OrderCompanyPackage, setOrderCompanyPackage] = useState(null);
  //   const [address, setAddress] = useState({});

  console.log("OrderPackage", OrderPackage);
  console.log("OrderCompanyPackage", OrderCompanyPackage);
  //   console.log("address", address);

  const updaateOrderPackage = (id) => {
    if (OrderPackage !== null) {
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
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          firebaseDB
            .child("Orders")
            .child(id)
            .update({
              OrderPackage: OrderPackage,
              OrderCompanyPackage: OrderCompanyPackage,
              statusOrder: true,
            })
            .then(() => {
              // alert("Add Admin success");
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    } else {
      Swal.fire("เพิ่มเลขพัสดุ");
    }
  };

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        console.log(user.uid.toString());
        firebaseDB
          .child("Orders")
          .orderByChild("sellerID")
          .equalTo(user.uid.toString())
          .once("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
              console.log("value", snapshot.val());
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
    <div style={{ padding: "10px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "15px" }}>
      <h1>Order Seller</h1>
      <hr />
      <div className="container">
        <Tabs
          defaultActiveKey="orderWaiting"
          id="uncontrolled-tab-example"
          fill
          justify
        >
          <Tab eventKey="orderWaiting" title="รอจัดส่ง" style={{ flex: "1" }}>
            <p>รอจัดส่ง</p>
            {Object.keys(values).map((id, index) => {
              return (
                <div className="container" key={index}>
                  {values[id].statusOrder == false ? (
                    <div className="card my-3" style={{}}>
                      <div className="card-body">
                        ชื่อ : {values[id].address.fullName}
                      </div>
                      <div className="card-body">
                        เบอร์โทร : {values[id].address.phoneNumber}
                      </div>
                      <div className="card-body">
                        ที่อยู่ : {values[id].address.addressDetails}
                        รหัสไปรษณีย์ : {values[id].address.zipcode}
                      </div>
                      <div className="card-body">
                        <form className="was-validated">
                          <div className="form-group mt-3">
                            <label htmlFor="OrderCompanyPackages">
                              บริษัทขนส่งสินค้า
                            </label>

                            <Form.Select
                              aria-label="Default select example"
                              id="OrderCompanyPackage"
                              name="OrderCompanyPackage"
                              className="form-select"
                              onChange={(e) =>
                                setOrderCompanyPackage(e.target.value)
                              }
                              required
                            >
                              <option value="">บริษัทขนส่งสินค้า</option>
                              {CargoData.map((item, keys) => {
                                return (
                                  <option
                                    name="productCategory"
                                    key={keys}
                                    value={item.title}
                                  >
                                    {item.title}
                                  </option>
                                );
                              })}
                            </Form.Select>
                          </div>

                          <div className="form-group mt-3">
                            <label htmlFor="OrderPackage">เลขพัสดุ</label>
                            <input
                              type="text"
                              id="OrderPackage"
                              name="OrderPackage"
                              className="form-control"
                              placeholder="เลขพัสดุ"
                              onChange={(e) => setOrderPackage(e.target.value)}
                              required
                            />
                          </div>
                        </form>
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
                        <button
                          className="btn btn-primary mt-3"
                          onClick={() => updaateOrderPackage(id)}
                        >
                          จัดส่งสินค้า
                        </button>
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
                  {values[id].statusOrder == true ? (
                    <div className="card my-3">
                      <div className="card-body">
                        ชื่อ : {values[id].address.fullName}
                      </div>
                      <div className="card-body">
                        เบอร์โทร : {values[id].address.phoneNumber}
                      </div>
                      <div className="card-body">
                        ที่อยู่ : {values[id].address.addressDetails},
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
export default OrderSellerList;
