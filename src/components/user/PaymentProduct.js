import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseAuth, firebaseDB } from '../../server/firebase';
import * as MdIcon from 'react-icons/md'



function PaymentProduct() {

  const { id } = useParams();
  const [values, setValues] = useState({});
  const [address, setAddress] = useState({});
  const [seller, setSeller] = useState({});


  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      console.log(user.uid.toString())
      if (user !== null) {
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
          .child(user.uid.toString())
          .child("Address")
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setAddress({ ...snapshot.val() });
            } else {
              setAddress({});
            }
          });
      } else { 
        setValues({}) ;
        setAddress({});
      }
    })
    return () => {
      setValues({});
    };
  }, [id]);



  const [ShowImages, setShowImages] = useState([]);
  const [Images, setImages] = useState([]);

  const ImgOnChange = (ever) => {
    const selectedFIles = [];
    const targetFilesObject = [...ever.target.files];
    setImages([...ever.target.files]);
    targetFilesObject.map((file) => {
      return selectedFIles.push(URL.createObjectURL(file));
    });
    setShowImages(selectedFIles);
  };






  console.log(values)

  return (
    <div className="default-bg">
      <h3>ชำระเงิน</h3>
      <div className='grid' style={{ display: "flex", marginLeft: "30px", marginRight: "30px" }} >
        <div style={{ display: "block", marginBottom: "20px", width: "60%", paddingRight: "10px" }}>
          <div style={{ display: "flex" }}>
            <h5 style={{ display: "block", width: "60px", color: "gray" }}>สินค้า</h5>
            <hr style={{ display: "block", width: "80%" }} />
          </div>

          {Object.keys(values).map((id, index) => (
            <div key={index}>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                <img style={{ display: "block", height: "50px", width: "50px", borderRadius: "15%" }} src={values[id].productImg[0]} />
                <a style={{ display: "block", marginLeft: "20px" }}>{values[id].productName}<br /> {values[id].productPrice} ฿ <br /> {values[id].sellerUid}</a>
              </div>
            </div>
          ))}

        </div>
        <div className='address-pay' style={{ display: "block", marginBottom: "20px", width: "40%" }}>
          <div style={{ display: "flex" }}>
            <h5 style={{ display: "block", width: "60px", color: "gray" }}>ที่อยู่</h5>
            <hr style={{ display: "block", width: "80%" }} />
          </div>
          {Object.keys(address).map((id, index) => {
        return (
          <div className="container px-5" key={index}>
            <div className="card">
              <div className="card-body">ชื่อ : {address[id].fullName}</div>
              <div className="card-body">
                เบอร์โทร :{address[id].phoneNumber}
              </div>
              <div className="card-body">
                ที่อยู่ : {address[id].addressDetails} รหัสไปรษณีย์ :{address[id].zipcode}
              </div>

            </div>
          </div>
        );
      })}
        </div>
      </div>
      <hr/>


<div className="container">
  <h3>แสกนเพื่อชำระเงิน</h3>
  
  <div>

  </div>
</div>

      {ShowImages.map((url, i) => (
        <div key={i}>
        {url ?(
          <img
          style={{ width: "150px" }}
          src={url}
          alt="firebase-images"
        />
        ):(
          <img
          style={{ width: "150px" }}
          src={<MdIcon.MdPayment/>}
          alt="firebase-images"
        />
        )}
        </div>
            ))}

      <button className='btn-payment' >สั่งซื้อสินค้า</button>
    </div>
  );
} export default PaymentProduct;