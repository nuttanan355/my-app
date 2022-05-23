import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { firebaseDB } from "../../server/firebase";

function NewProductsAdmin() {
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


    firebaseDB
      .child("Product")
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

  const AllowProduct = (id) => {
    Swal.fire({
      title: "อนุมัติสินค้า ?",
      text: "อนุมัติสินค้าให้แสดงและขาย !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "อนุมัติ",
      cancelButtonText:"ยกเลิก"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("อนุมัติสินค้าแล้ว",'','success');
        firebaseDB
          .child("Product")
          .child(id)
          .update({ productAllow: true })
          .then(() => {
            // alert("Add Admin success");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  };

  console.log("USER",users)

  return (
    <div className="container">
      <h1>ประกาศการขาย</h1>
      <hr />
      <div className="row">
        {values ? (
          <div style={{}}>
            {Object.keys(values,users).map((id, index) => {
              return (
                  <div className="my-2 border border-dark rounded" key={index}>
                    <Card.Header>ชื่อร้าน : {users[values[id].sellerUid].seller.storeName}
                  </Card.Header>
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
                      <hr/>
                      <Card.Title className="mt-3">{values[id].productName}</Card.Title>
                      <div className="row">
                          <p className="col">ประเภท : {values[id].productCategory}</p>
                          <h4 className="col text-right" style={{color:"#dc3545",}}>
                          ราคา : {values[id].productPrice}
                          </h4>
                        </div>
                      {/* <Card.Text>ประเภท : {values[id].productCategory}</Card.Text> */}
                      {/* <h4 className="text-right" style={{color:"#dc3545",}}> ราคา : {values[id].productPrice}</h4> */}
                      <div className="container bg-light">
                      <Card.Text>ราคาจัดส่งต่อชิ้น : {values[id].produtcCost100} บาท</Card.Text>
                      <Card.Text>ราคาจัดส่งตั้งแต่ {values[id].produtcCost200} ถึง {values[id].produtcCost201} ราคา : {values[id].produtcCost202} บาท</Card.Text>
                      <Card.Text>ราคาจัดส่งตั้งแต่ {values[id].produtcCost300} ถึง {values[id].produtcCost301} ราคา : {values[id].produtcCost302} บาท</Card.Text>
                      </div>
                      
                      <hr/>
                      <p className="badge bg-danger text-wrap">รายละเอียด : </p>
                      <p>{values[id].productDetails}</p>

                      <Button
                        variant="primary"
                        onClick={() => AllowProduct(id)}
                        className="mt-3"
                        size="lg"
                      >
                        อนุมัติ
                      </Button>
                    </Card.Body>
                  </div>
          
              );
            })}
          </div>
        ) : (
          <div>
            <h5>ไม่มีรายการ</h5>
          </div>
        )}
      </div>
    </div>
  );
}
export default NewProductsAdmin;
