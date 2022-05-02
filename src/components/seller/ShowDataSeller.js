import React from 'react'
import { firebaseDB } from "../firebase";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import NavbarSeller from "../../navigation/navbar_seller";

function ShowDataSeller(){
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
      <div>
        <div className="container sm-auto">
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
      </div>
    );
}
export default ShowDataSeller;