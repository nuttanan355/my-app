import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { firebaseAuth, firebaseDB } from '../../server/firebase';

function RecomProduct(){

    const [values, setValues] = useState({});


    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
        const refDB = firebaseDB
          .child("Product")
          .orderByChild("sellerUid")
          .equalTo(user.uid.toString());
        refDB.on("value", (snapshot) => {
          if (snapshot.val() !== null) {
            setValues({ ...snapshot.val() });
            console.log(snapshot.val());
          } else {
            setValues({});
          }
        });
      });
    }, []);




    return(
  
    <div>
      <h1> บริการแนะนำสินค้า </h1>
      <div className='container mt-3' style={{ padding: "50px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "20px" }}>
      
          {Object.keys(values).map((id, index) => {
            return (
              <div key={index}>
                {values[id].productAllow ? (
                  <Card className="my-2">
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={values[id].productImg[0]}
                        style={{ width: "100px" }}
                      />
                      <Card.Title>{values[id].productName}</Card.Title>
                      <Card.Text>{values[id].productDetails}</Card.Text>
                      <Card.Text>{values[id].sellerUid}</Card.Text>
                    </Card.Body>
                    <button className='btn btn-success' onClick={()=>(window.location.href = `/seller/seller-recom/pay/${id}`)}>แนะนำสินค้า</button>
                  </Card>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
    
    );
}export default RecomProduct