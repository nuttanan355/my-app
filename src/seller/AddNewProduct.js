import React from "react";
import firebase from "../firebase"

function AddNewProduct() {
  return (
    <div>
      <div class="container">
        <h1>Add New Product</h1>
        <hr />

        <div class="container">
    
          <p>ชื่อสินค้า</p>
          <input id="productName" type="text" />

          <p>ประเภทสินค้า</p>
          <input list="productCategorys" id="productCategory" />
          <datalist id="productCategorys">
            {/* --------เสื้อผ้า------- */}
            <option value="เสื้อผ้าผู้ชาย" />
            <option value="เสื้อผ้าผู้หญิง" />
            {/* --------รองเท้า------- */}
            <option value="รองเท้าผู้ชาย" />
            <option value="รองเท้าผู้หญิง" />
            {/* --------กระเป๋า------- */}
            <option value="กระเป๋าผู้ชาย" />
            <option value="กระเป๋าผู้หญิง" />
            <option value="กระเป๋าเดินทาง" />
            {/* --------มือถือ------- */}
            <option value="โทรศัพท์มือถือ" />
            <option value="อุปกรณ์เสริม" />
            <option value="อื่นๆ" />
          </datalist>

          <p>ราคา</p>
          <input id="productPrice" type="number" />
          <p>รายละเอียด</p>
          <input id="" type="text" />
          <div class="container">
            <div class="row">
              <div class="col">
                <p>ส่ง 1 ชิ้น</p>
              </div>
              <div class="col">
                {" "}
                <input id="" type="text" />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <p>ส่งชิ้น</p>
              </div>
              <div class="col">
                <input id="" type="text" />
              </div>
              <div class="col">
                {" "}
                <p>ถึง</p>
              </div>
              <div class="col">
                {" "}
                <input id="" type="text" />
              </div>
              <div class="col">
                <p>ค่าส่งที่กำหนด</p>
              </div>
              <div class="col">
                <input id="" type="text" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <p>ส่งชิ้น</p>
              </div>
              <div class="col">
                <input id="" type="text" />
              </div>
              <div class="col">
                {" "}
                <p>ถึง</p>
              </div>
              <div class="col">
                {" "}
                <input id="" type="text" />
              </div>
              <div class="col">
                <p>ค่าส่งที่กำหนด</p>
              </div>
              <div class="col">
                <input id="" type="text" />
              </div>
            </div>
          </div>
          <div>
            <p>รูปภาพ</p>
            <input type="file" />
          </div>

          <button class="btn btn-sm btn-primary" onClick={insert()}>Add New Phone</button>

        </div>
      </div>
    </div>
  );
}


function insert() {
  // const db = getDatabase.ref("Product");
  const db = firebase.ref("/Product");

  var name = document.getElementById('name').value;
  var tel = document.getElementById('tel').value;
  var rdSect = document.getElementsByName('sect');
  var sect;
  for (i = 0; i<rdSect.length; i++) {
      if (rdSect[i].checked) { sect = rdSect[i].value; }
  }
  
  db.push({ "name": name, "sect": sect, "tel": tel })
      .then(function () {
          window.alert("Add Data OK !");
          // window.location = "/"; //add ข้อมูลต่อไปที่หน้า index หรือ
          window.location = "index.html"; //add ข้อมูลต่อไปที่หน้า index
      })
      .catch(function (error) {
          alert(error.message);
      });
}











export default AddNewProduct;
