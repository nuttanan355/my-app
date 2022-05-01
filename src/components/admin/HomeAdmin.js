import React from "react";

import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
// import * as HiIcons from "react-icons/hi";
function HomeAdmin() {
  return (
    <div className="pt-5 pb-5" style={{ background: "lightgray" }}>
      <h1 style={{ fontWeight: "bold", color: "gray" }}>ADMIN</h1>
      <hr />
      <div className="container mb-5 mt-5">
        {/* <Link to="/admin/oders" className="btn btn-outline-secondary"  style={{ width: "20%", margin: "2%", border: "0" }}> */}
        <Link to="/admin/oders" className="btn btn-secondary btn-lg m-2">
          <RiIcons.RiFileList2Line size={200} />
          <div style={{ fontSize: "25px" }}>รายการคำสั่งซื้อจากผู้ซื้อ</div>
        </Link>

        <Link to="/admin/new-products" className="btn btn-secondary btn-lg m-2">
          <BsIcons.BsCardChecklist size={200} />
          <div style={{ fontSize: "25px" }}>ตรวจสอบการอัปโหลด</div>
        </Link>

        <Link to="/admin/edit-product" className="btn btn-secondary btn-lg m-2 ">
          <AiIcons.AiOutlineEdit size={200} />
          <div style={{ fontSize: "25px" }}>ตรวจสอบการแก้ไข</div>
        </Link>

        <Link to="/admin/recom" className="btn btn-secondary btn-lg m-2">
          <RiIcons.RiStarFill size={200} />
          <div style={{ fontSize: "25px" }}>บริการสินค้าแนะนำ</div>
        </Link>
      </div>
    </div>
  );
}
export default HomeAdmin;
