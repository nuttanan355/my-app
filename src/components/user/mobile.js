import React from "react";
import { firebaseDB } from "../firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import * as AiIcons from "react-icons/ai";

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

function Mobile() {
    const [values, setValues] = useState({});
    // const [images, setImages] = useState([]);
    // const [sort, setSort] = useState(false);

    useEffect(() => {
        firebaseDB.child("product").on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setValues({ ...snapshot.val() });
                // console.log(snapshot.child('productImg'));
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
            <div className="container" >
                <h2 style={{ margin: "2% 0px 0px 0px" }}>มือถือ และ อุปกรณ์</h2>
                <hr style={{ textAlign: "center", margin: "2% 0px 0px 0px" }}/>
                <div className="row">
                    <div className="item-container" style={{ width: "100%", textAlign: "center" }}>

                        {Object.keys(values).map((id, index) => {
                            return (
                                <div key={id} className="btn col-lg-2" style={{
                                    height: "30%", margin: "80px 0px 80px 0px", textAlign: "left"
                                }}>

                                    <Card className="thumbnail"
                                        style={{
                                            background: "#ffffff",
                                            border: "0",
                                            width: "80%",
                                            padding: "1px"
                                        }}
                                    >
                                        <img
                                            id="imgShow"
                                            className="card-img-top "
                                            // style="height:200px;"
                                            style={{ width: "100%" }}
                                            alt="Product Images"
                                            src={values[id].productImg[0]}
                                        // onClick="#"
                                        />
                                        <Card.Body>
                                            <Card.Title style={{ fontWeight: "bold", fontSize: "100%" }}>{values[id].productName} </Card.Title>
                                            <Card.Text style={{ fontSize: "100%", textAlign: "right" }} >{values[id].productPrice} บาท</Card.Text>
                                        </Card.Body>
                                        <button className="btn btn-outline-warning">Buy Now</button>
                                    </Card>
                                </div>
                            );
                        })}

                    </div >

                </div>
            </div>
        </div>
    );
}
export default Mobile;