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
      title: 'อนุมัติ ?',
      text: "อนุมัติ สินค้าแนะนำ!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "อนุมัติ",
      cancelButtonText:"ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("อนุมัติสินค้าแล้ว",'','success');
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
                      <div className="my-2 border border-dark rounded" >
                        <Card.Header>{users[values[id].sellerUid].seller.storeName}</Card.Header>
                        <Card.Body>
                        <div className="mb-3 mx-2">
                        <section id="slider">
                          {Object.keys(values[id].productImg).map((url, i) => {
                            return (
                              <div key={i} >
                                <div className="img-product">
                                  <Card.Img
                                    id="imgShow"
                                    className="card-img-top mx-1"
                                    style={{
                                      width: "200px",
                                      height: "180px",
                                    }}
                                    alt="Product Images"
                                    src={values[id].productImg[url]}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </section>
                      </div>

                        {/* <Card.Img variant="top" src={values[id].productImg[0]} style={{width:'100px'}} /> */}
                          <Card.Title>{values[id].productName}</Card.Title>
                          <div className="row">
                          <div className="col-10">
                            <p className="badge bg-danger text-wrap">รายละเอียด : </p>
                          <p>{values[id].productDetails}</p>
                          </div>
                          <div className="col">
                          <p className="badge bg-primary text-wrap">Splip Images : </p>
                          <img 
                           style={{
                            width: "100%",
                            height: "100%",
                          }}
                          alt="Splip Images"
                          className=' border border-dark rounded'
                          src={values[id].SlipAllowRecom} />
                          </div>
                        </div>
                          {/* <Card.Text>{values[id].productDetails}</Card.Text> */}
                          <Button variant="primary" onClick={()=>AllowProduct(id)}>อนุมัติ</Button>
                        </Card.Body>
                      </div>
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