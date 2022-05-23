import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { firebaseDB } from '../../server/firebase';

function RecomAdmin () {
  const [values, setValues] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {

    firebaseDB.child("Users").on("value",(snapshot)=>{
      if(snapshot.val() !== null){
        setUsers(snapshot.val());
      }else{
        setUsers({});
      }
    });

    firebaseDB.child("Product").orderByChild("ProductAllowRecom").equalTo(false).on("value", (snapshot) => {
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
        .update({ProductAllowRecom:true,}).then(() => {
          // alert("Add Admin success");
        }).catch((error) => {
          console.error(error);
        });
      }
    })
  }

  return (
    <div className="container">
      <h1>บริการสินค้าแนะนำ</h1>
      <hr />
      <div className="row">
        {values ?(
          <div>
                  {Object.keys(values,users).map((id, index) => {
                    return (
                      <div key={index}>
                      <Card  className="my-2">
                        <Card.Header>ชื่อร้าน : {users[values[id].sellerUid].seller.storeName}</Card.Header>
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
}export default RecomAdmin;