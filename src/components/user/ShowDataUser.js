import React from "react";
import { firebaseDB } from "../firebase";
import { useState, useEffect } from "react";

function ShowDataUser() {
  const [values, setValues] = useState({});
  // const [images, setImages] = useState({});
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

  // useEffect(()=>{
  //   firebaseDB.child('product').child('productImg').on('value',(snapshot)=>{
  //     if(snapshot)
  //   })
  // },[]);

  return (
    <div>
      <div className="row">
      {Object.keys(values).map((id, index) => {
        return (
          <div className="col-md-4">
            <div className="card mb-4 box-shadow">
              <image
                id="imgShow"
                className="card-img-top"
                // style="height:200px;"
                style={{ height: "200px" }}
                alt="Product Image"
                src=""
              />
              <div className="card-body">
                <div>
                  <p
                    id="txtShowTitle"
                    className="text-center font-weight-bold"
                    style={{ fontSize: "18px" }}
                  >
                    {values[id].productName}
                  </p>
                </div>
                <div>
                  <p
                    id="txtShowTitle"
                    className="text-center font-weight-bold"
                    style={{ fontSize: "18px" }}
                  >
                    {values[id].productCategory}
                  </p>
                </div>
                <div>
                  <p
                    id="txtShowTitle"
                    className="text-center font-weight-bold"
                    style={{ fontSize: "18px" }}
                  >
                    {values[id].productPrice}
                  </p>
                </div>
              </div>
            </div>
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