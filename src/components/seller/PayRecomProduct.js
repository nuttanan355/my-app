
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firebaseAuth, firebaseDB, firebaseStorage } from '../../server/firebase';

var d = new Date();
var saveCurrentDate = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
var saveCurrentTime =
  d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
var dateKey = saveCurrentDate + "," + saveCurrentTime;


function PayRecomProduct(){

    const { id } = useParams();
    const [values, setValues] = useState({});
   
    const [ShowImageSlip, setShowImageSlip] = useState([]);
    const [Slip, setSlip] = useState([]);
  
    const ImageSlipOnChange = (ever) => {
      const selectedFIles = [];
      const targetFilesObject = [...ever.target.files];
      setSlip([...ever.target.files]);
      targetFilesObject.map((file) => {
        return selectedFIles.push(URL.createObjectURL(file));
      });
      setShowImageSlip(selectedFIles);
    };

    useEffect(() => {
      firebaseAuth.onAuthStateChanged((user) => {
        console.log(user.uid.toString());
            firebaseDB
            .child("Product")
            .child(id)
            .on("value", (snapshot) => {
              if (snapshot.val() !== null) {
                setValues({ ...snapshot.val()});
              } else {
                setValues({});
              }
            });
      })
        return () => {
          setValues({});
        };
      }, [id]);

      // console.log(values)
      // console.log(Slip)

      const handleonSubmit = () => {
        Slip.forEach((files) => {
          const sotrageRef = ref(
            firebaseStorage,
            `Recom/Recom-${dateKey}/${files.name}`
          );
          const uploadTask = uploadBytesResumable(sotrageRef, files);
          uploadTask.on(
            "state_changed",
            (snapshot) => {},
            (error) => console.log(error),
            async () => {
              await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log("Slip", downloadURL);
                firebaseDB
                .child("Product")
                .child(id)
                .update({ ProductAllowRecom: false,SlipAllowRecom: downloadURL})
                .then(() => {
                  console.log("add data success");
                  window.location.href = '/seller/seller-product';
                })
                .catch((error) => {
                  console.error(error);
                });
              });
            }
          );
        });
      };

const AddRecomProduct=()=>{
 if(Slip.length === 0){
   console.log("เพิ่มสลิป")
 }else{
  handleonSubmit();
 }
}


    return(
  <div> 
    <h1>สินค้าแนะนำ</h1>
    <div className="container mt-4" style={{ padding: "50px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "20px" }} >

  
        <hr/>
        <div className="card" style={{ padding: "50px", paddingTop: "20px", paddingLeft: "20px", background: "white", border: "1px solid lightgray", borderRadius: "20px" }}>
          <p>ชื่อร้าน : {values.storeName}</p>
          <p>E-Mail ร้าน : {values.sellerEmail}</p>
          <p>ชื่อสินค้า : {values.productName}</p>
 
        </div>
        <hr/>
        <div>
          
        </div>
        <hr/>
        <div className="container">
        <h3>แนบสลิป</h3>
        
        <div>
          <form className="was-validated">
            {ShowImageSlip.map((url, i) => (
              <img
                key={i}
                style={{ width: "150px" }}
                src={url}
                alt="firebase-images"
              />
            ))}

            <div className="form-group">
              <label style={{ marginRight: "10px" }} htmlFor="productImg">
                รูปภาพ ( scale 1:1 ){" "}
              </label>
              <input
                accept="image/*"
                type="file"
                onChange={ImageSlipOnChange}
                multiple
                required
              />
            </div>
          </form>
        </div>
      </div>
        <button className='btn btn-success' onClick={()=>AddRecomProduct()}>Confirm</button>
    </div>
    <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
  </div> 
    );
}export default PayRecomProduct