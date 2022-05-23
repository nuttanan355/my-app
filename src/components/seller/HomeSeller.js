import React from "react";
import "../../css/pages.css";
import "../../css/home.css";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

function HomeSeller() {
  return (
    <div >
      <div className="container">
        <div className="row pt-3">
          <div className="col-8 md-10">
          
            <h1> ร้านค้าของฉัน</h1>
          </div>
          <a
            href="/seller/seller-product/add-product"
            className="btn btn-primary btn-lg col-4 my-3"
            role="button"
          >
            ลงขายสินค้า
          </a>
        </div>
        <hr />

        <div className="row" style={{ padding: "50px", paddingTop: "20px", paddingLeft: "20px", background: "#6BCB77", border: "1px solid lightgray", borderRadius: "15px" }}>

          <div className="card" style={{ width: "30%", margin: "50px", height: "auto" }} id="div1">
            <Link to="/seller/seller-product">
              <div className="text-center btn-seller" style={{ padding: "10px" }}>
                <FcIcons.FcAdvertising style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">ประกาศการขาย</h4>
              </div>

            </Link>
          </div>

          <div className="card " style={{ width: "30%", margin: "50px" }} id="div2">
            <Link to="/seller/seller-orders">
              <div className="text-center btn-seller" style={{ padding: "10px" }}>
                <FcIcons.FcFinePrint style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">ตรวจสอบสถานะคำสั่งซื้อ</h4>
              </div>

            </Link>
          </div>
          <div className="card" style={{ width: "30%", margin: "50px" }} id="div3">
            <Link to="/seller/seller-payment">
              <div className="text-center btn-seller" style={{ padding: "10px" }}>
                <FcIcons.FcMoneyTransfer style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">ตรวจสอบการโอนเงินจากระบบ</h4>
              </div>

            </Link>
          </div>
          <div className="w-100"></div>
          <div className="card" style={{ width: "30%", margin: "50px" }} id="div4">
            <Link to="/seller/seller-recom">
              <div className="text-center btn-seller" style={{ padding: "10px" }}>
                <FcIcons.FcCustomerSupport style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">บริการสินค้าแนะนำ</h4>
              </div>
            </Link>
          </div>
          <div className="card" style={{ width: "30%", margin: "50px" }} id="div5">
            <Link to="/seller/seller-profile">
              <div className="text-center btn-seller" style={{ padding: "10px" }}>
                <FcIcons.FcShop style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">Profile Seller</h4>
              </div>
            </Link>
          </div>
          <div className="card" style={{ width: "30%", margin: "50px" }} id="div6">
            <Link to="/seller/seller-packgate">
              <div className="text-center btn-seller" style={{ padding: "10px" }}>
                <FcIcons.FcPackage style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">รายการคำสั่งซื้อ Packgate</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
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
