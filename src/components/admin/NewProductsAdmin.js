import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { firebaseDB } from "../../server/firebase";

function NewProductsAdmin() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebaseDB
      .child("product")
      .orderByChild("productAllow")
      .equalTo(false)
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
        } else {
          setValues({});
        }
      });
    return () => {
      setValues({});
    };
  }, []);

  const AllowProduct =(id)=>{
    firebaseDB
      .child("product")
      .child(id)
      .update({productAllow:true}).thead(()=>{window.location.reload(); console.log("Allow");}).catch((error)=>console.log(error))
  }

  return (
    <div className="container">
      <h1>ประกาศการขาย</h1>
      <hr />
      <div className="row">
        {Object.keys(values).map((id, index) => {
          return (
            <Card key={index} className="my-2">
              <Card.Header>ชื่อร้าน</Card.Header>
              <Card.Body>
              <Card.Img variant="top" src={values[id].productImg[0]} style={{width:'100px'}} />
                <Card.Title>{values[id].productName}</Card.Title>
                <Card.Text>{values[id].productDetails}</Card.Text>
                <Button variant="primary" onClick={()=>AllowProduct(id)}>อนุมัติ</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default NewProductsAdmin;
