import React from "react";
import { firebaseDB } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import * as AiIcons from "react-icons/ai";

// let thumbnails = document.getElementsByClassName('thumbnail');
// let slider = document.getElementById('slider');

// const maxScrollLeft = slider.scrollWidth - slider.clientWidth;

// function autoPlay() {
//     if (slider.scrollLeft > (maxScrollLeft - 1)) {
//         slider.scrollLeft -= maxScrollLeft;
//     } else {
//         slider.scrollLeft += 1;
//     }
// }
// let play = setInterval(autoPlay, 50);

// // PAUSE THE SLIDE ON HOVER
// for (var i=0; i < thumbnails.length; i++){

// thumbnails[i].addEventListener('mouseover', function() {
//     clearInterval(play);
// });

// thumbnails[i].addEventListener('mouseout', function() {
//     return play = setInterval(autoPlay, 50);
// });
// }

function ShowDataUser() {
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
    <div className="slide-container" >
      <section id="slider" >
        {Object.keys(values).map((id, index) => {
          return (
            <div className="hovercard-rec" style={{ height: "300px", padding: "5px" }} key={index} >
              <div type="button" onClick={() => (window.location.href = `/view-product/${id}`)} style={{ borderRadius: "5px" }}>
                <div className='img-product' >
                  <img
                    id="imgShow"
                    className="card-img-top "
                    style={{ width: "200px", height: '180px', borderRadius: "5px 5px 0px 0px" }}
                    alt="Product Images"
                    src={values[id].productImg[0]}
                  />
                </div>

                <div style={{ padding: "10px", background: "white", height: "80px", borderRadius: "0px 0px 5px 5px" ,width:"200px"}}>
                  <div style={{ height: "40px", overflow: "hidden" }}>
                    <p className='cut-text-multi' style={{ fontWeight: "bold", fontSize: "12px", textAlign: "left" }}>{values[id].productName}</p>
                  </div>
                  <div>
                    <p style={{ marginTop: "5px", fontWeight: "bold", fontSize: "12px", textAlign: "left", color: "#14DDA0" }}> {values[id].productPrice} บาท </p>
                  </div>
                </div>
              </div>
              <p style={{ textAlign: "center", color: "white", fontWeight: "bold", fontSize: "20px" }}>เลือก</p>
            </div>
          );
        })}

      </section >



    </div>
  );
} export default ShowDataUser;
