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


      <div className='flexbox' style={{ minHeight: "1000px" }}>
        {Object.keys(values).map((id, index) => {
          return (
            <div className="flex-item" key={index} >
              <div>
                <img className='img-item' src={values[id].productImg[0]} />
                <div className='name-item' style={{ position: "absolute", height: "50px", background: "white", opacity: "50%", width: "300px" }}>
                  {values[id].productName}
                </div>
              </div>

            </div>
          );
        })}
      </div>


    </div>
  )
}

export default Category