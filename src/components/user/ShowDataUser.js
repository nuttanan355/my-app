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
    <div className="slide-container">
      <section className="item-container" id="slider">
        {Object.keys(values).map((id, index) => {
          return (
            <div key={index} className="btn col-lg-3">
              <Card className="thumbnail"
                style={{
                  background: "#ffffff",
                  border: "0",
                  width: "80%",
                  padding: "1px"
                }}
                onClick={() =>
                  (window.location.href = `/view-product/${id}`)
                }

              >
                <div>
                <img
                  id="imgShow"
                  className="card-img-top "
                  // style="height:200px;"
                  style={{ width: "200px",height: "200px" , overflow:"hidden"}}
                  alt="Product Images"
                  src={values[id].productImg[0]}
                // onClick="#"
                />
                </div>
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold", fontSize: "100%" }} length="10">{values[id].productName} </Card.Title>
                  <Card.Text style={{ fontSize: "100%", textAlign: "right" }} >{values[id].productPrice} บาท</Card.Text>
                </Card.Body>

              </Card>
            </div>
          );
        })}

      </section >



    </div>
  );
}export default ShowDataUser;
