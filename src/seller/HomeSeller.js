import React from "react";
import "../css/pages.css";
import "../css/home.css";
import {firebaseDB} from "../firebase";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";


function HomeSeller() {

  const [values, setValues] = useState({});
  // const [sortedData, setSortedData] = useState([]);
  // const [sort, setSort] = useState(false);

  useEffect(() => {
    firebaseDB.child("product").on("value", (snapshot) => {
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
        <h1>HomeSeller</h1>
    <table className="styled-table">
      <thead>
        <tr>
          {/* <th style={{ textAlign: "center" }}>productName.</th> */}
          <th style={{ textAlign: "center" }}>productName</th>
          <th style={{ textAlign: "center" }}>productCategory</th>
          <th style={{ textAlign: "center" }}>productPrice</th>
          {/* <th style={{ textAlign: "center" }}>Status</th> */}
        </tr>
      </thead>
        <tbody>
          {Object.keys(values).map((id, index) => {
            return (
              <tr key={id}>
                {/* <th scope="row">{index + 1}</th> */}
                <td>{values[id].productName}</td>
                <td>{values[id].productCategory}</td>
                <td>{values[id].productPrice}</td>
                {/* <td>{values[id].status}</td> */}
                <td>
                  <Link to={`/EditData/${id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(id)}
                  >
                    Delete
                  </button>
                  <Link to={`/ViewData/${id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
     
    </table>
    
  </div>
  );
}

export default HomeSeller;

// <div GrouprData="div-main">
    //   <h2>สินค้าที่ได้รับความนิยม</h2>
    //   <div>
    //     <h2>หมวดหมู่</h2>
    //   </div>
    //   <div>
    //     <h2>ทำไมต้องเลือกซื้อ-ขายของออนไลน์ที่ \n Tea Marketplace</h2>
    //     <h1>มั่นใจได้ทุกการขาย</h1>
    //     <h2>ไม่ต้องกังวลเรื่องเช็คเครดิตปิดการขายง่ายขึ้น</h2>
    //   </div>
    // </div>