import React from 'react';
import { firebaseDB,firebaseAuth } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

function CartUser(){
    const [values, setValues] = useState({});
    // const [images, setImages] = useState([]);
    // const [sort, setSort] = useState(false);

    const [uid, setUid] = useState();

    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
        if(user !==null){
            firebaseDB.child("cart").child(user.uid.toString()).on("value", (snapshot) => {
              if (snapshot.val() !== null) {
                setValues({ ...snapshot.val() });
                setUid(user.uid.toString())
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

const DeleteProductCart =(id)=>{
        if (
          window.confirm("Are you sure that you wanted to delete that contact ?")
        ) {
          firebaseDB.child(`cart/${uid}/${id}`).remove((err) => {
            if (err) {
              console.error(err);
            } else {
              // colors.log("Contact Deleted Successfully");
              console.log("Contact Deleted Successfully");
            }
          });
        }
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
                <Button variant="primary" onClick={()=>DeleteProductCart(id)}>ลบ</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
        </div>
    );
}export default CartUser;