import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseAuth, firebaseDB } from '../../server/firebase';
function PaymentProduct() {

  const { id } = useParams();
  const [values, setValues] = useState({});


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
      } else { setValues({}) }
    })
    return () => {
      setValues({});
    };
  }, [id]);

  console.log(values)

  return (
    <div className="default-bg">
      <h3>ชำระเงิน</h3>
      <div className='grid' style={{ display: "flex", marginLeft: "30px", marginRight: "30px" }} >


        {/* <table className="table">
        <tr>
          <td scope="row"></td>
          <td>ชื่อร้าน</td>
          <td>{id}</td>
        </tr>
        <tr>
          <td scope="row"></td>
          <td>สินค้า</td>
          {Object.keys(values).map((id, index) => (

            <td scope='col' key={index}>
              <img src={values[id].productImg[0]} />
              <p>{values[id].productName}</p>
              <p>{values[id].productDetails}</p>
              <p>{values[id].ValQuantity}</p>
            </td>

          ))}

        </tr>
      </table>
      <div>
        <h3>ที่อยู่</h3>
      </div>
      <div>
        <h3>ราคา</h3>
      </div>
      <div>
        <h3>รูป</h3>
      </div>
      <div>
        <h3>Show Payment</h3>
      </div>
      <form>
        <input type='file' />
      </form> */}
        <div style={{ display: "block", marginBottom: "20px", width: "60%", paddingRight: "10px" }}>
          <div style={{ display: "flex" }}>
            <h5 style={{ display: "block", width: "60px", color: "gray" }}>สินค้า</h5>
            <hr style={{ display: "block", width: "80%" }} />
          </div>
          {Object.keys(values).map((id, index) => (

            <div>
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
          {Object.keys(values).map((id, index) => (

            <div style={{ borderLeft: "1px solid lightgray",minHeight:"200px" }}>


            </div>

          ))}
        </div>




      </div>
      <button className='btn-payment' >สั่งซื้อสินค้า</button>
    </div>
  );
} export default PaymentProduct;