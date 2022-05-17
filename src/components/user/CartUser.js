import React from "react";
import { firebaseDB, firebaseAuth } from "../../server/firebase";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import PaymentProduct from "./PaymentProduct";

function CartUser() {
  const [values, setValues] = useState({});
  // const [images, setImages] = useState([]);
  // const [sort, setSort] = useState(false);

  const [uid, setUid] = useState();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if (user !== null) {
        firebaseDB
          .child("Cart")
          .child(user.uid.toString())
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setValues({ ...snapshot.val() });
              setUid(user.uid.toString());
              // console.log(snapshot.child('productImg'));
            } else {
              setValues({});
            }
          });
        return () => {
          setValues({});
        };
      } else {
      }

      console.log(user.uid.toString());
    });
  }, []);

  // console.log(values);

  const DeleteProductCart = (id,kery) => {
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
        firebaseDB.child(`Cart/${uid}/${id}/${kery}`).remove().then().catch();
        Swal.fire({
          // position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
    // console.log("ID",id);
    // console.log("KERY",kery);
    // if (
    //   window.confirm("Are you sure that you wanted to delete that contact ?")
    // ) {
    //   firebaseDB.child(`Cart/${uid}/${id}/${kery}`).remove().then().catch();
    // }
  };

  return (
    <div className="mt-3">
      <div className="row">
        {Object.keys(values).map((id, index) => {
          return (
            <div className ="container mt-5" key={index}>
              <h4>ชื่อร้าน : {id}</h4>

              {/* {console.log(values[id])} */}
              {Object.keys(values[id]).map((kery,i) => {
                const value = values[id][kery];
                console.log(kery)
                return (
                  <Card className="my-2" key={i}>
                    {/* <Card.Header>{id}</Card.Header> */}
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={value.productImg[0]}
                        style={{ width: "100px" }}
                      />
                      <Card.Title>{value.productName}</Card.Title>
                      <Card.Text>{value.productDetails}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => DeleteProductCart(id,kery)}
                      >
                        ลบ
                      </Button>
                      <Button
                        type="button"
                        className="btn btn-danger"
                        onClick={() =>
                          firebaseDB
                            .child("Cart")
                            .child(uid)
                            .child(id)
                            .child(kery)
                            .update({ ValQuantity: value.ValQuantity - 1 })
                        }
                      >
                        -
                      </Button>
                      <input
                        type="number"
                        id="orderQuantity"
                        name="orderQuantity"
                        value={value.ValQuantity}
                        onChange={(e) => e.target.value}
                      />

                      <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          firebaseDB
                            .child("Cart")
                            .child(uid)
                            .child(id)
                            .child(kery)
                            .update({ ValQuantity: value.ValQuantity + 1 })
                        }
                      >
                        +
                      </Button>
                    </Card.Body>
                  </Card>
                );
              })}


<Button
                        variant="primary"
                        onClick={() => (window.location.href = `/user/payments/${id}`)}
                      >
                        ชำระเงิน
                      </Button>

            </div>    
          );
        })}
      </div>
    </div>
  );
}
export default CartUser;
