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
    <div className="container sm-auto">
      <Tabs
        defaultActiveKey="allow"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="allow" title="อนุมัติ">
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
                  </Card>
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
                  <Card className="my-2">
                    <Card.Body>
                    {values[id].productImg.map((url, i) => (
                    <div className="col" interval={3000} key={i}>
                      <img
                        src={url}
                        alt="First slide"
                        style={{
                          height: "200px",
                          textAlign: "center",
                          margin: "1%"
                        }}
                      />
                    </div>
                  ))}
                      <Card.Title>{values[id].productName}</Card.Title>
                      <Card.Text>{values[id].productDetails}</Card.Text>
                      <Card.Text>{values[id].sellerUid}</Card.Text>
                    </Card.Body>
                  </Card>
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

