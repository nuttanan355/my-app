import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { firebaseDB } from "../../server/firebase";

function NewProductsAdmin() {
  const [values, setValues] = useState({});

  useEffect(() => {
    firebaseDB.child("Product").orderByChild("productAllow").equalTo(false).on("value", (snapshot) => {
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        firebaseDB.child("Product").child(id)
        .update({productAllow:true,}).then(() => {
          // alert("Add Admin success");
        }).catch((error) => {
          console.error(error);
        });
      }
    })
  }

  return (
    <div className="container">
      <h1>ประกาศการขาย</h1>
      <hr />
      <div className="row">
        {values ?(
          <div>
                  {Object.keys(values).map((id, index) => {
                    return (
                      <div key={index}>
                      <Card  className="my-2">
                        <Card.Header>ชื่อร้าน</Card.Header>
                        <Card.Body>
                        <Card.Img variant="top" src={values[id].productImg[0]} style={{width:'100px'}} />
                          <Card.Title>{values[id].productName}</Card.Title>
                          <Card.Text>{values[id].productDetails}</Card.Text>
                          <Button variant="primary" onClick={()=>AllowProduct(id)}>อนุมัติ</Button>
                        </Card.Body>
                      </Card>
                      </div>
                    );
                  })}
                  </div>
        ):(
          <div>
            <h5>ไม่มีรายการ</h5>
          </div>
        )}

      </div>
    </div>
  );
}
export default NewProductsAdmin;
