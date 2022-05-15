import React from "react";
import { firebaseDB } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";

function Product() {
    const [values, setValues] = useState({});
    // const [images, setImages] = useState([]);
    // const [sort, setSort] = useState(false);

    useEffect(() => {
        firebaseDB.child("product").orderByChild("productAllow")
            .equalTo(true).on("value", (snapshot) => {
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

        <div className="container" style={{padding:"50px"}}>
            <a href="/"> หน้าหลัก \</a><a href="#"> สินค้า </a>
            <div className="flexbox">
                {Object.keys(values).map((id, index) => {
                    return (
                        <div className="flex-item product-item">
                            <div key={index}>

                                <Card className="card" style={{ background: "#ffffff"  }} onClick={() => (window.location.href = `/view-product/${id}`)}>
                                    <img
                                        id="imgShow"
                                        className="card-img-top "
                                        // style="height:200px;"
                                        style={{ width: "100%" }}
                                        alt="Product Images"
                                        src={values[id].productImg[0]}

                                    />
                                    <Card.Body>
                                        <Card.Title style={{ fontWeight: "bold", fontSize: "100%" }}>{values[id].productName} </Card.Title>
                                        <Card.Text style={{ fontSize: "100%", textAlign: "right" }} >{values[id].productPrice} บาท</Card.Text>
                                    </Card.Body>

                                </Card>
                            </div>
                        </div>


                    );
                })}
            </div>
        </div>
    )
}

export default Product