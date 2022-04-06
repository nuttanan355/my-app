import React from "react";
import "../../css/pages.css";
import "../../css/home.css";
import NavbarSeller from "../../navigation/navbar_seller";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";

function HomeSeller() {
  return (
    <div>
      <NavbarSeller />
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-10">
            <h1>ร้านค้าของฉัน</h1>
          </div>
          <a
            href="/AddNewProduct"
            className="btn btn-primary btn-lg col"
            role="button"
          >
            ลงขายสินค้า
          </a>
        </div>
        <hr />
        
        <div className="row">
          <div className="col-lg bg-warning rounded-3 p-3 mx-3 my-3" id="div1">
            <div className="text-center">
              <FaIcons.FaBox size={200} />
            </div>
            <p className="text-center mt-3 h4">ตรวจสอบสถานะคำสั่งซื้อ</p>
          </div>
          <div className="col-lg bg-warning rounded-3 p-3 mx-3 my-3" id="div2">
            <Link to="/AddNewProduct">
              <div className="text-center">
                <FaIcons.FaBoxes size={200} />
              </div>
              <p className="text-center mt-3 h4">ประกาศการขาย</p>
            </Link>
          </div>
          <div className="col-lg bg-warning rounded-3 p-3 mx-3 my-3" id="div3">
            <div className="text-center">
              <FaIcons.FaShoppingBasket size={200} />
            </div>
            <p className="text-center mt-3 h4">ตรวจสอบการโอนเงินจากระบบ</p>
          </div>
          <div class="w-100"></div>
          <div
            className="col-lg bg-warning rounded-3 p-3 mx-3 my-3"
            id="div4"
          >
            <div className="text-center">
              <AiIcons.AiFillLike size={200} />
            </div>
            <p className="text-center mt-3 h4">บริการสินค้าแนะนำ</p>
          </div>
          <div className="col-lg bg-warning rounded-3 p-3 mx-3 my-3" id="div5">
            <div className="text-center">
              <FaIcons.FaRegCreditCard size={200} />
            </div>
            <p className="text-center mt-3 h4">เลขบัญชีผู้ขาย</p>
          </div>
          <div className="col-lg bg-warning rounded-3 p-3 mx-3 my-3" id="div6">
            <div className="text-center">
              <FaIcons.FaClipboardList size={200} />
            </div>
            <p className="text-center mt-3 h4">รายการคำสั่งซื้อ Packgate</p>
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
