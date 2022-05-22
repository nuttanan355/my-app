import React from "react";
import { firebaseDB, firebaseAuth } from "../../server/firebase";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, Tabs } from "react-bootstrap";
import { Tab } from "bootstrap";
// import NavbarSeller from "../../navigation/navbar_seller";

function ShowDataSeller() {
  const [values, setValues] = useState({});
  const [Images, setImages] = useState([]);

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

  const onDelete = (id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that contact ?")
    ) {
      firebaseDB.child(`product/${id}`).remove((err) => {
        if (err) {
          console.error(err);
        } else {
          // colors.log("Contact Deleted Successfully");
          console.log("Contact Deleted Successfully");
        }
      });
    }
  };

  return (
    <div className="default-bg sm-auto" >
      <Tabs
        defaultActiveKey="allow"
        id="uncontrolled-tab-example"
  

      >
        <Tab eventKey="allow" title="อนุมัติ" style={{ background: "#f8f8f8", border: "1px solid lightgray" }}>
        
          {Object.keys(values).map((id, index) => {
            return (
              <div key={index} style={{ background: "white" }}>
                {values[id].productAllow ? (
                  <div style={{ background: "white" }}>
                    <Card.Body >
                      <Card.Img
                        variant="top"
                        src={values[id].productImg[0]}
                        style={{ width: "100px", height: "auto" }}
                      />
                      <Card.Title style={{ marginTop: "20px" }}>{values[id].productName}</Card.Title>
                      <Card.Text style={{ overflow: "hidden" }}>{values[id].productDetails}</Card.Text>
                      <Card.Text>{values[id].productPrice} ฿</Card.Text>
                      <Card.Text>{values[id].storeName}</Card.Text>

                    </Card.Body>
                    <hr style={{ background: "white" }} />
                  </div>
                ) : (
                  <></>
                )}
              </div>
            );
          })}
        </Tab>
        <Tab eventKey="not-allow" title="รออนุมัติ">
          {Object.keys(values).map((id, index) => {
            return (
              <div key={index}>
                {values[id].productAllow ? (
                  <></>
                ) : (
                  <div className="my-2">
                    <Card.Body>
                      <Card.Img
                        variant="top"
                        src={values[id].productImg[0]}
                        style={{ width: "100px", heiht: "auto" }}
                      />
                      <Card.Title style={{ marginTop: "20px" }}>{values[id].productName}</Card.Title>
                      <Card.Text style={{ overflow: "hidden" }}>{values[id].productDetails}</Card.Text>
                      <Card.Text>{values[id].productPrice} ฿</Card.Text>
                      <Card.Text>{values[id].storeName}</Card.Text>
                    </Card.Body>
                  </div>
                )}
              </div>
            );
          })}
        </Tab>
      </Tabs>
    </div>
  );
}
export default ShowDataSeller;

