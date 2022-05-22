import React from "react";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
// import * as HiIcons from "react-icons/hi";
function HomeAdmin() {
  return (
    <div className="pt-5 pb-5">
      <h1 style={{ fontWeight: "bold", color: "SpringGreen" }}>ADMIN</h1>
      <hr />
      <div className="container mx-auto mt-5">
        {/* <Link to="/admin/oders" className="btn btn-outline-secondary"  style={{ width: "20%", margin: "2%", border: "0" }}> */}
        <div className="row">
          <Link
            to="/admin/new-products"
            className="btn btn-secondary btn-lg col mx-2"
          >
            <BsIcons.BsCardChecklist size={200} />
            <div>ตรวจสอบการอัปโหลด</div>
          </Link>

          <Link
            to="/admin/ads-product"
            className="btn btn-secondary btn-lg col mx-2"
          >
            <AiIcons.AiOutlineEdit size={200} />
            <div>ปกโฆษณา</div>
          </Link>

          <Link
            to="/admin/oders"
            className="btn btn-secondary btn-lg col mx-2 "
          >
            <RiIcons.RiFileList2Line size={200} />
            <div>รายการคำสั่งซื้อจากผู้ซื้อ</div>
          </Link>

          <Link
            to="/admin/recom"
            className="btn btn-secondary btn-lg col mx-2"
          >
            <RiIcons.RiStarFill size={200} />
            <div>บริการสินค้าแนะนำ</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;
