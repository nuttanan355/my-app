import React from 'react';
import { firebaseDB,firebaseAuth } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

function CartUser(){
    const [values, setValues] = useState({});
    // const [images, setImages] = useState([]);
    // const [sort, setSort] = useState(false);

    // const [uid, setUid] = useState();

    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
        if(user !==null){
            firebaseDB.child("cart").child(user.uid.toString()).on("value", (snapshot) => {
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
          }else{}
        
        console.log(user.uid.toString());
      });
    }, []);
  
    useEffect(() => {

    }, []);


const DeleteProductCart =()=>{

}


    return(
        <div>
                  <div className="row">
        {Object.keys(values).map((id, index) => {
          return (
            <Card key={index} className="my-2">
              <Card.Header>ชื่อร้าน</Card.Header>
              <Card.Body>
              <Card.Img variant="top" src={values[id].productImg[0]} style={{width:'100px'}} />
                <Card.Title>{values[id].productName}</Card.Title>
                <Card.Text>{values[id].productDetails}</Card.Text>
                <Button variant="primary" onClick={()=>DeleteProductCart()}>ลบ</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
        </div>
    );
}export default CartUser;