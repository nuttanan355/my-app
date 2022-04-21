import React from "react";
import { firebaseDB } from "../firebase";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
function ShowDataUser() {
  const [values, setValues] = useState({});
  // const [images, setImages] = useState([]);
  // const [sort, setSort] = useState(false);

  useEffect(() => {
    firebaseDB.child("product").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setValues({ ...snapshot.val() });
        // console.log(snapshot.child('productImg'));
      } else {
        setValues({});
      }
    });

    return () => {
      setValues({});
    };
  }, []);

  // useEffect(()=>{
  //   firebaseDB.child('product').child('productImg').on('value',(snapshot)=>{
  //     if(snapshot.val()!==null){
  //       setImages({...snapshot.val()})
  //     }else{
  //       setImages({});

  //     }
  //   });
  //   return()=>{
  //     setImages({});
  //   }
  // },[]);

  return (
    <div className="container" >
      <div className="row">
        {Object.keys(values).map((id,index) => {
          return (
            <div key={id} className="col-md-4">

                <Card 
                  style={{
                    width: "350px",
                    backgrounds: "white",
                    margin: "10%",
                    padding: "5%",
                  }}
                  
                >
                  <img
                    id="imgShow"
                    className="card-img-top"
                    // style="height:200px;"
                    style={{height:"350px"}}
                    alt="Product Images"
                    src={values[id].productImg[0]}
                    // onClick="#"
                  />
                  <Card.Body>
                    <Card.Title>{values[id].productName}</Card.Title>
                    <Card.Text>{values[id].productCategory}</Card.Text>
                    <Card.Text style={{textAlign:"right"}} >{values[id].productPrice} บาท</Card.Text>
                  </Card.Body>
                </Card>
              </div>
          );
        })}
      </div>
    </div>
  );
}
export default ShowDataUser;

// <table className="styled-table">
// <thead>
//   <tr>
//     {/* <th style={{ textAlign: "center" }}>productName.</th> */}
//     <th style={{ textAlign: "center" }}>Name</th>
//     <th style={{ textAlign: "center" }}>Category</th>
//     <th style={{ textAlign: "center" }}>Price</th>
//     {/* <th style={{ textAlign: "center" }}>Status</th> */}
//   </tr>
// </thead>
// <tbody>
//   {Object.keys(values).map((id, index) => {
//     return (
//       <tr key={id}>
//         {/* <th scope="row">{index + 1}</th> */}
//         <td>{values[id].productName}</td>
//         <td>{values[id].productCategory}</td>
//         <td>{values[id].productPrice}</td>
//         {/* <td>{values[id].status}</td> */}
//       </tr>
//     );
//   })}
// </tbody>
// </table>
