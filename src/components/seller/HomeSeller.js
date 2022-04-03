import React from "react";
import "../../css/pages.css";
import "../../css/home.css";
import NavbarSeller from "../../navigation/navbar_seller";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Navs from "../../navigation/navsTest";
// import AddNewProduct from "./AddNewProduct";
// import { BrowserRouter } from "react-router-dom";

function HomeSeller() {
  return (
    <div>
      <NavbarSeller />
      <div className="container">
        <div className="row mt-30">
          <div className="col-md-10">
            <h1>ร้านค้าของฉัน</h1>
          </div>
          {/* <div className="col-md-2"> */}
            <a
              name=""
              id=""
              className="btn btn-primary btn-ls col md-2"
              href="/AddNewProduct"
            >
              ลงประกาศขาย
            </a>
          {/* </div> */}
        </div>
        <hr />
        <div className="row mt-30">
          <div className="col" id="stateProduct">
          <FontAwesomeIcon icon="fa-duotone fa-box-open-full fa-10x" />
            <p className="text-center">ตรวจสอบสถานะคำสั่งซื้อ</p>
          </div>
          <div className="col" id="div2">
          <FontAwesomeIcon icon="fa-solid fa-square-list fa-10x" />
          <i class="fa-solid fa-envelope-open-dollar fa-50x"></i>
            <p className="text-center">ประกาศการขาย</p>
          </div>
          <div className="col" id="div3">
          <FontAwesomeIcon icon="fa-solid fa-envelope-open-dollar" />
            <p className="text-center">ตรวจสอบการโอนเงินจากระบบ</p>
          </div>
        </div>
        <div className="row mt-30">
          <div className="col" id="stateProduct">
          <FontAwesomeIcon icon="fa-duotone fa-box-open-full fa-10x" />
            <p className="text-center">บริการสินค้าแนะนำ</p>
          </div>
          <div className="col" id="div2">
          <FontAwesomeIcon icon="fa-solid fa-square-list fa-10x" />
            <p className="text-center">เลขบัญชีผู้ขาย</p>
          </div>
          <div className="col" id="div3">
            <p className="text-center">รายการคำสั่งซื้อ Packgate</p>
          </div>
        </div>
      </div>
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
