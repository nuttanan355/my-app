import React from 'react'
import { firebaseDB } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
function Category() {
  const [values, setValues] = useState({});
  useEffect(() => {
    firebaseDB.child("Product").orderByChild("productAllow").equalTo(true).once("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setValues({ ...snapshot.val() });
        console.log(snapshot.val());
      } else {
        setValues({});
      }
    });
    return () => {
      setValues({});
    };
  }, []);
  return (
    <div><a href="/"> หน้าหลัก \</a><a href="#"> หมวดหมู่ \</a>

      <div className='default-bg'>
        <div className='flexbox' >
          {Object.keys(values).map((id, index) => {
            return (
              <div type="button" className="flex-item" key={index} onClick={() =>
                (window.location.href = `/view-product/${id}`)
              }
>
                <div className='card' >
                  <img className='img-item' src={values[id].productImg[0]} />
                  <div className='title-item'>
                    <div className='name-item' >
                    <p style={{whiteSpace:"nowrap", textOverflow:"ellipsis",overflow:"hidden"}}> {values[id].productName} </p>
                    </div>
                    <div className='price-item'>
                    {values[id].productPrice} ฿
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  )
}

export default Category