import React from "react";
// import { Switch,Router } from 'react-router-dom';
// import { Container, Navbar } from 'react-bootstrap';
// import { Link } from 'react-router-dom'
import * as AiIcons from "react-icons/ai";
// import * as FcIcons from "react-icons/fc";
// import * as FiIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
// import * as HiIcons from "react-icons/hi";
function HomeAdmin() {
  return (
    <div style={{ background: "lightgray" }}>
           <div className="container" >
        <div className="container mt-5">
          <h1 style={{ fontWeight: "bold", color: "gray" }}>ADMIN</h1>
        </div>
        <hr />
        <div className="container">

          <div className="col">
            <a href="/OrdersAdmin">
              <button className="btn btn-outline-secondary" style={{ width: "20%", margin: "2%", border: "0" }}>
                <RiIcons.RiFileList2Line size={200} />
                <div style={{ fontSize: "25px" }}>รายการคำสั่งซื้อจากผู้ซื้อ </div>
              </button>
            </a>
            <a href="/NewProductsAdmin">
              <button className="btn btn-outline-secondary" style={{ width: "20%", margin: "2%", border: "0" }}>
                <BsIcons.BsCardChecklist size={200} />
                <div style={{ fontSize: "25px" }}>ตรวจสอบการอัปโหลด</div>
              </button></a>
            <a href="/EditProductAdmin">
              <button className="btn btn-outline-secondary" style={{ width: "20%", margin: "2%", border: "0" }}>
                <AiIcons.AiOutlineEdit size={200} />
                <div style={{ fontSize: "25px" }}>ตรวจสอบการแก้ไข</div>
              </button></a>
            <a href="/RecomAdmin">
              <button className="btn btn-outline-secondary" style={{ width: "20%", margin: "2%", border: "0" }}>
                <RiIcons.RiStarFill size={200} />
                <div style={{ fontSize: "25px" }}>บริการสินค้าแนะนำ</div>
              </button>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;
