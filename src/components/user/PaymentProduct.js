import { Button } from "bootstrap";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from "../../server/firebase";
import * as MdIcon from "react-icons/md";
import Swal from "sweetalert2";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;

function PaymentProduct() {
  const { id } = useParams();
  const [values, setValues] = useState({});
  const [address, setAddress] = useState({});
  const [Seladdress, setSeladdress] = useState("");
  const [seller, setSeller] = useState({});
  const [user, setUser] = useState({});

  const sum = [];
  const cost = [];

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user.uid.toString());
      if (user !== null) {
        setUser(user.uid.toString());

        firebaseDB
          .child("Cart")
          .child(user.uid.toString())
          .child(id)
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
            } else {
              setValues({});
            }
          });

        firebaseDB
          .child("Users")
          .child(id)
          .child("seller")
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setSeller({ ...snapshot.val() });
            } else {
              setSeller({});
            }
          });

        firebaseDB
          .child("Users")
          .child(user.uid.toString())
          .child("Address")
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setAddress({ ...snapshot.val() });
            } else {
              setAddress({});
              let timerInterval;
              Swal.fire({
                icon: "error",
                title: "เพิ่มข้อมูลที่อยู่",
                html: "มีข้อมูลที่อยู่แล้ว จะสามารถสั่งซืั้อได้",
                timer: 3000,
                timerProgressBar: true,
                didOpen: () => {
                  Swal.showLoading();
                  const b = Swal.getHtmlContainer().querySelector("b");
                  timerInterval = setInterval(() => {}, 100);
                },
                willClose: () => {
                  clearInterval(timerInterval);
                },
              }).then((result) => {
                window.location.href = "/user/profile";
              });
            }
          });
      } else {
        setValues({});
        setAddress({});
      }
    });
    return () => {
      setValues({});
    };
  }, [id]);

  const [ShowImageSlip, setShowImageSlip] = useState([]);
  const [Slip, setSlip] = useState([]);

  const ImageSlipOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setSlip([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImageSlip(selectedFIles);
  };

  const SelAddressOnChange = (ever) => {
    setSeladdress(ever.target.value);
  };

  const handleonSubmit = () => {
    Slip.forEach((files) => {
      const sotrageRef = ref(
        firebaseStorage,
        `orders/Order-${dateKey}/${user}/${files.name}`
      );
      const uploadTask = uploadBytesResumable(sotrageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => console.log(error),
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("Slip", downloadURL);
            firebaseDB
              .child("Orders")
              // .child(user)
              .child("Orders-" + dateKey)
              .set({
                userID: user,
                address: address[Seladdress],
                statusOrder: false,
                OrderPackage: "",
                sellerID: id,
                OrderList: values,
                OrderSucceed: false,
                SlipPayment: downloadURL,
                totalPrice: sum.reduce((partialSum, a) => partialSum + a, 0),
                totalCost: cost.reduce(
                  (partialSum, a) => parseInt(partialSum) + parseInt(a),
                  0
                ),
              })
              .then(() => {
                firebaseDB
                  .child("Cart")
                  .child(user)
                  .child(id)
                  .remove()
                  .then(() => {
                    console.log("add Orders success");
                    window.location.href = "/user/order";
                  })
                  .catch((error) => console.log(error));
              })
              .catch((error) => console.log(error));
          });
        }
      );
    });
  };

  // -----------END ADD IMAGE----------------------------

  const checkData = () => {
    // if (values.productName === "") {
    //   console.log("ใส่ชื่อ ไอ้สอง")
    // } else if (values.productCategory === "") {
    //   console.log("ใส่ประเภทด้วย ไอ้สัส")
    // } else if (values.productCategory === "ประเภทสินค้า") {
    //   console.log("ใส่ประเภทด้วย ไอ้สัส")
    // } else if (values.productPrice === "") {
    //   console.log("ใส่ราคาด้วย ไม่งั้นจะขายใครไอ้เ-ร")
    // } else if (values.productDetails === "") {
    //   console.log("ใส่รายละเอียดด้วย เขาจะรู้ไหมว่าใช้งานยังไง")
    // } else if (values.produtcCost100 === "") {
    //   console.log("ใส่ค่าส่งด้วย")
    // } else if (values.produtcCost200 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 01")
    // } else if (values.produtcCost201 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 02")
    // } else if (values.produtcCost202 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 03")
    // } else if (values.produtcCost300 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 04")
    // } else if (values.produtcCost301 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 05")
    // } else if (values.produtcCost302 === "") {
    //   console.log("ราคาเดียวก็ใส่-ซะไอ้สัส 06")
    // } else if (Images.length === 0) {
    //   console.log("ไม่ใส่รูป ใครจะรูปว่าขายอะไรว่ะ")
    // }else {
    // let text = "Press a button!\nEither OK or Cancel.";
    // if (window.confirm(text) == true) {
    handleonSubmit();
    // } else {
    //   text = "You canceled!";
    // }

    // }
  };

  // console.log("address : ",address[Seladdress]);
  // console.log("Seladdress : ",Seladdress);
  // console.log("User ID : ",user);
  // console.log("values : ",values);
  // console.log("seller : ",seller);

  return (
    <div className="default-bg">
      <h3>ชำระเงิน</h3>
      <div
        className="grid"
        style={{ display: "flex", marginLeft: "30px", marginRight: "30px" }}
      >
        <div
          style={{
            display: "block",
            marginBottom: "20px",
            width: "60%",
            paddingRight: "10px",
          }}
        >
          <div style={{ display: "flex" }}>
            <h5 style={{ display: "block", width: "60px", color: "gray" }}>
              สินค้า
            </h5>
            <hr style={{ display: "block", width: "80%" }} />
          </div>

          {Object.keys(values).map((id, index) => {
            const quantity = values[id].ValQuantity;
            const allC = () => {
              if (quantity >= values[id].produtcCost301) {
                return values[id].produtcCost302;
              } else if (quantity >= values[id].produtcCost201) {
                return values[id].produtcCost202;
              } else {
                return values[id].produtcCost100;
              }
            };
            sum.push(values[id].productPrice * values[id].ValQuantity);
            cost.push(allC());
            return (
              <div key={index}>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <img
                    style={{
                      display: "block",
                      height: "50px",
                      width: "50px",
                      borderRadius: "15%",
                    }}
                    src={values[id].productImg[0]}
                  />
                  <a style={{ display: "block", marginLeft: "20px" }}>
                    {values[id].productName}
                    <br /> {values[id].productPrice} ฿ <br />{" "}
                    {values[id].sellerUid}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className="address-pay"
          style={{ display: "block", marginBottom: "20px", width: "40%" }}
        >
          <div style={{ display: "flex" }}>
            <h5 style={{ display: "block", width: "60px", color: "gray" }}>
              ที่อยู่
            </h5>
            <hr style={{ display: "block", width: "80%" }} />
          </div>

          {Object.keys(address).map((id, index) => {
            return (
              <div className="container px-5 form-check" key={index}>
                <div className="card bg-danger">
                  <input
                    className="form-check-input"
                    type="radio"
                    value={id}
                    onChange={SelAddressOnChange}
                  />
                  <div className="card-body">ชื่อ : {address[id].fullName}</div>
                  <div className="card-body">
                    เบอร์โทร :{address[id].phoneNumber}
                  </div>
                  <div className="card-body">
                    ที่อยู่ : {address[id].addressDetails} รหัสไปรษณีย์ :
                    {address[id].zipcode}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <div className="container">
        <h3>ราคารวม</h3>
        <div>
          <div>
            <h5>
              รวมราคา : {sum.reduce((partialSum, a) => partialSum + a, 0)}
            </h5>
            <br />
            <h5>
              ค่าส่ง :{" "}
              {cost.reduce(
                (partialSum, a) => parseInt(partialSum) + parseInt(a),
                0
              )}
            </h5>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <h3>แสกนเพื่อชำระเงิน</h3>
        <div>
          <p>ธนาคาร: {seller.bankAccount}</p>
          <p>ชื่อบัญชี : {seller.nameBankAccount}</p>
          <p>เลขบัญชี : {seller.numberBankAccount}</p>
          <p>QR CODE</p>
          <img
            style={{height:"100%",width:"50%"}}
            src={seller.storeImg}
          />
        </div>
      </div>
      <hr />
      <div className="container">
        <h3>แนบสลิป</h3>
        <div>
          <form className="was-validated">
            {ShowImageSlip.map((url, i) => (
              <img
                key={i}
                style={{ width: "150px" }}
                src={url}
                alt="firebase-images"
              />
            ))}

            <div className="form-group">
              <label style={{ marginRight: "10px" }} htmlFor="productImg">
                รูปภาพ ( scale 1:1 ){" "}
              </label>
              <input
                accept="image/*"
                type="file"
                onChange={ImageSlipOnChange}
                multiple
                required
              />
            </div>
          </form>
        </div>
      </div>
      <button className="btn-payment" onClick={checkData}>
        สั่งซื้อสินค้า
      </button>
    </div>
  );
}export default PaymentProduct;
