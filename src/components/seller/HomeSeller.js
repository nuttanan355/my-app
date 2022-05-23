import React from "react";
import "../../css/pages.css";
import "../../css/home.css";
import * as IoIcons from "react-icons/io5";
import * as FcIcons from "react-icons/fc";
import * as AiIcons from "react-icons/ai";
import * as GiIcons from "react-icons/gi";

import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

function HomeSeller() {
  return (
    <div className="default-bg" style={{ background: "white" }}>
      <div className="container">
        <div className="row pt-3">
          <div className="col-8 md-10" >

            <h1 style={{color:"green"}}> <IoIcons.IoStorefrontOutline size={50}/> &nbsp;&nbsp; ร้านค้าของฉัน</h1>
          </div>
          <a
            href="/seller/seller-product/add-product"
            className="btn btn-warning btn-lg col-2 mt-4 mb-4"
            role="button"
            style={{fontSize:'22px' , color:"white"}}
          >
            ลงขายสินค้า
          </a>
        </div>
        <div style={{borderBottom:"3px solid green"}}/>

        <div className="row" style={{ justifyContent: "center", borderRadius: "15px" }}>
          <div style={{ width: "30%", marginTop: "20px", height: "315px", marginBottom: "20px" }} id="div1">
            <Link to="/seller/seller-product">
              <div className="text-center menu-seller" style={{ padding: "10px" }}>
                <FcIcons.FcAdvertising style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">ประกาศการขาย</h4>
              </div>

            </Link>
          </div>

          <div style={{ width: "30%", marginTop: "20px", marginBottom: "20px" }} id="div2">
            <Link to="/seller/seller-orders">
              <div className="text-center menu-seller" style={{ padding: "10px" }}>
                <FcIcons.FcFinePrint style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">ตรวจสอบสถานะคำสั่งซื้อ</h4>
              </div>

            </Link>
          </div>
          <div style={{ width: "30%", marginTop: "20px", marginBottom: "20px" }} id="div3">
            <Link to="/seller/seller-payment">
              <div className="text-center menu-seller" style={{ padding: "10px" }}>
                <FcIcons.FcMoneyTransfer style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">ตรวจสอบการโอนเงินจากระบบ</h4>
              </div>

            </Link>
          </div>
          <div className="w-100"></div>
          <div style={{ width: "30%", marginTop: "20px", marginBottom: "20px" }} id="div4">
            <Link to="/seller/seller-recom">
              <div className="text-center menu-seller" style={{ padding: "10px" }}>
                <FcIcons.FcCustomerSupport style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">บริการสินค้าแนะนำ</h4>
              </div>
            </Link>
          </div>
          <div style={{ width: "30%", marginTop: "20px", marginBottom: "20px" }} id="div5">
            <Link to="/seller/seller-profile">
              <div className="text-center menu-seller" style={{ padding: "10px" }}>
                <FcIcons.FcShop style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">Profile Seller</h4>
              </div>
            </Link>
          </div>
          <div style={{ width: "30%", marginTop: "20px", marginBottom: "20px" }} id="div6">
            <Link to="/seller/seller-packgate">
              <div className="text-center menu-seller" style={{ padding: "10px" }}>
                <FcIcons.FcPackage style={{ fontSize: "12vw" }} />
                <h4 className="text-center mt-3 h4">รายการคำสั่งซื้อ Packgate</h4>
              </div>
            </Link>
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
