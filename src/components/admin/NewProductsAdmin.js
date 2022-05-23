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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
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
          <div>
            {Object.keys(values,users).map((id, index) => {
            //     const nameStore = [];
            //   firebaseDB.child("Users").child(values[id].sellerUid).child("seller").on("value",(snapshot)=>{
            //     return nameStore.push(snapshot.val().storeName);
            // });
            // console.log("User : ",users[values[id].sellerUid].seller.storeName);
              return (
                <div key={index}>
                  <Card className="my-2">
                    <Card.Header>ชื่อร้าน : {users[values[id].sellerUid].seller.storeName}
                  </Card.Header>
                    <Card.Body>
                      <div className="slide-container">
                        <section id="slider">
                          {Object.keys(values[id].productImg).map((url, i) => {
                            return (
                              <div key={i} >
                                <div className="img-product">
                                  <Card.Img
                                    id="imgShow"
                                    className="card-img-top "
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
                      <Card.Title>{values[id].productName} ราคา : {values[id].productPrice}</Card.Title>
                      <Card.Text>ราคาจัดส่งต่อชิ้น : {values[id].produtcCost100}</Card.Text>
                      <Card.Text>ราคาจัดส่งตั้งแต่ {values[id].produtcCost200} ถึง {values[id].produtcCost201} ราคา : {values[id].produtcCost202}</Card.Text>
                      <Card.Text>ราคาจัดส่งตั้งแต่ {values[id].produtcCost300} ถึง {values[id].produtcCost301} ราคา : {values[id].produtcCost302}</Card.Text>
                      <Card.Text>ประเภท : {values[id].productCategory}</Card.Text>
                      <Card.Text>รายละเอียด : {values[id].productDetails}</Card.Text>

                      <Button
                        variant="primary"
                        onClick={() => AllowProduct(id)}
                        className="mt-3"
                        size="lg"
                      >
                        อนุมัติ
                      </Button>
                    </Card.Body>
                  </Card>
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
