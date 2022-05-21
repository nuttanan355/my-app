import { red } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { firebaseDB, firebaseAuth } from "../../server/firebase";

function ViewProduct() {
  const [values, setValues] = useState({});
  const [Images, setImages] = useState([]);
  const [ValQuantity, setValQuantity] = useState(1);
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  useEffect(() => {
    firebaseDB
      .child("Product")
      .child(id)
      .on("value", (snapshot) => {
        if (snapshot.val() !== null) {
          setValues({ ...snapshot.val() });
          setImages(snapshot.child("productImg").val());
        } else {
          setValues({});
        }
      });
    return () => {
      setValues({});
    };
  }, [id]);

  // console.log("values", values);
  // console.log("users", user);

  const addCart = () => {
    const refDB = firebaseDB.child("Cart").child(user.uid).child(values.sellerUid).child(id);
    refDB.set(values)
      .then(() => {
        refDB.update({ ValQuantity: ValQuantity, }).then(() => {
          Swal.fire('เพิ่มลงตะกร้าแล้ว').then(() => window.location.href = '/');
        }).catch((err) => {
          console.log(err);
        })
      })
      .catch((err) => console.log(err));
  };
  // console.log("values", values);
  return (
    <div className="container py-5">
      <a href="/"> หน้าหลัก \</a>
      <a href="#"> สินค้า \</a> <a href="#">{values.productCategory}</a>
      <div>
        <div>
          {/* <div className="card-header">
            <h3>{values.productName}</h3>
          </div> */}
          <div className="container">
            <div className="row" style={{ background: "green", width: "100%", padding: "20px" }}>
              <div className="col flex-view">
                <div clessName="flex-view-item">
                  {Images.map((url, i) => (
                    <img className="view-img"
                      src={url}
                      key={i}
                      alt="firebase-images"
                    />
                  ))}
                </div>

              </div>

              <div
                className="col"
                style={{
                  backgroundColor: "#92a8d1",
                  height: "500px",
                  width: "1000px",
                }}
              >
                <h2>{values.productName}</h2>
                <h4>{"฿" + values.productPrice}</h4>

                <p>1</p>
                <strong>Name: </strong>
                <span>{values.productName}</span>
                <br />

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    setValQuantity((ValQuantity) => ValQuantity - 1)
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  id="orderQuantity"
                  name="orderQuantity"
                  value={ValQuantity}
                  onChange={(e) => e.target.value}
                />

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    setValQuantity((ValQuantity) => ValQuantity + 1)
                  }
                >
                  +
                </button>
                <br />
                <button
                  type="button"
                  className="btn btn-primary"
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off"
                  onClick={() => addCart()}
                >
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewProduct;

// sellerUid: "",
// productName: "",
// productCategory: "",
// productPrice: "",
// productAllow: false,
// productImg: [],
// productDetails: "",
// produtcDate: saveCurrentDate,
// produtcTime: saveCurrentTime,
// produtcCost100: "",
// produtcCost200: "",
// produtcCost201: "",
// produtcCost202: "",
// produtcCost300: "",
// produtcCost301: "",
// produtcCost302: "",
