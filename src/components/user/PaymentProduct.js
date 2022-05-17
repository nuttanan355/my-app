import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseAuth, firebaseDB } from '../../server/firebase';
function PaymentProduct(){

    const { id } = useParams();
    const [values, setValues] = useState({});
   

    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
        console.log(user.uid.toString())
          if(user !== null){
            firebaseDB
            .child("Cart")
            .child(user.uid.toString())
            .child(id.toString())
            .on("value", (snapshot) => {
              if (snapshot.val() !== null) {
                setValues({ ...snapshot.val()});
              } else {
                setValues({});
              }
            });
          }else{setValues({})}
      })
        return () => {
          setValues({});
        };
      }, [id]);

      console.log(values)

    return(
    <div className="container">
        <h3>ชำระเงิน</h3>
      <table className="table">
              <tr>
                  <td scope="row"></td>
                  <td>ชื่อร้าน</td>
                  <td>{id}</td>
              </tr>
              <tr>
                  <td scope="row"></td>
                  <td>สินค้า</td>
                  {Object.keys(values).map((id,index)=>(
            
<td scope='col' key={index}>
    <img
    src={values[id].productImg[0]}/>
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
      </form>
        <button className='btn' >สั่งซื้อสินค้า</button>
    </div>
    );
}export default PaymentProduct;