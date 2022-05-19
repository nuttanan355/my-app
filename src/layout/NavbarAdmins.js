import React from "react";
// import { Container, Navbar } from "react-bootstrap";
// import * as FcIcons from "react-icons/fc";
// import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io5";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import Logout from "../components/login/Logout";

function NavbarAdmin() {
  return (
    // <div>
    //   <div className="collapse" id="navbarToggleExternalContent">
    //     <div className="bg-dark p-4">
    //       <div>
    //         <p className="text-white" style={{ margin: "15px", fontSize: "28px", fontWeight: "bold" }}
    //         >
    //           Menu Admin
    //         </p>
    //       </div>

    //       <hr style={{ color: "black" }} />

    //         <div className="row">
    //           <div className="btn col-lg-6">

    //             <a className="btn btn-outline-light" href="http://scanfcode.com/category/c-language/">
    //               รายการคำสั่งซื้อจากผู้ซื้อ
    //             </a>

    //             <a className="btn btn-outline-light" href="http://scanfcode.com/category/front-end-development/">
    //               ตรวจสอบการอัปโหลด
    //             </a>

    //             <a className="btn btn-outline-light" href="http://scanfcode.com/category/back-end-development/">
    //               ตรวจสอบการแก้ไข
    //             </a>

    //             <a className="btn btn-outline-light" href="http://scanfcode.com/category/java-programming-language/">
    //               บริการสินค้าแนะนำตรวจสอบการแก้ไข
    //             </a>

    //           </div>
    //         </div>
    //     </div>
    //   </div>
    //   <nav className="navbar navbar-dark bg-dark ">
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarToggleExternalContent"
    //       aria-controls="navbarToggleExternalContent"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <div className="navbar-toggler-icon"></div>
    //     </button>
    //     <Link
    //       className="navbar-toggler"
    //       to="/"
    //       style={{ border: "0" }}
    //     >
    //     <img className="img" src="../img/logo copy1.png"/>
    //       {/* TEA Marketplance */}
    //     </Link>
    //     <div style={{ textAlign: "right" }}>
    //       <p className="btn text-white"
    //         style={{  
    //                   margin: "32px", 
    //                   textAlign: "right", 
    //                   fontSize: "18px" 
    //               }}
    //         onClick={()=>Logout()}
    //       >
    //         <IoIcons.IoLogOut/> Logout
    //       </p>
    //     </div>
    //   </nav>
    // </div>
    // <div>
    //   <div className="collapse" id="navbarToggleExternalContent">
    //     <div className="bg-dark p-4">
    //       <h4 className="text-white">Collapsed content</h4>
    //       <span className="text-muted">Toggleable via the navbar brand.</span>
    //     </div>
    //   </div>
    //   <nav className="navbar navbar-dark bg-dark">
    //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //   </nav>
    // </div>
    // <div className="navbar" style={{ paddingBottom: "0", paddingTop: "0" }}>
    //   <a className="navbar-brand" style={{ display: "block", fontFamily: "Monospace", width: "10%", fontWeight: "bold", color: "white" }} href="/">Admin TEA</a>

    //   <div className="nav-item-admin" style={{ background: "red", width: "10%", display: "block", marginLeft: "10px" }}>
    //     <a className="nav-link-admin" style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Monospace" }} href="/admin/oders">รายการคำสั่งซื้อจากผู้ซื้อ</a>
    //   </div>

    //   <div className="nav-item-admin" style={{ display: "block", marginLeft: "10px", textAlign: "left" }}>
    //     <a className="nav-link-admin" style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Monospace" }} href="/admin/new-products">ตรวจสอบการอัปโหลด</a>
    //   </div >

    //   <div className="nav-item-admin" style={{ display: "block", marginLeft: "10px", textAlign: "left" }}>
    //     <a className="nav-link-admin" style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Monospace" }} href="/admin/edit-product">ตรวจสอบการแก้ไข</a>
    //   </div>

    //   <div className="nav-item-admin" style={{ display: "block", marginLeft: "10px", textAlign: "left" }}>
    //     <a className="nav-link-admin" style={{ fontSize: "14px", fontWeight: "bold", fontFamily: "Monospace" }} href="/admin/recom">บริการสินค้าแนะนำ</a>
    //   </div>

    //   <button style={{ display: "block" }} className="btn btn-danger my-2 my-sm-0" onClick={() => Logout()}><IoIcons.IoLogOut />
    //     Logout
    //   </button>
    // </div>

    <div className="navbar" style={{ alignItems: "left", justifyContent: "center", fontSize: "16px" }}>
      <div type="button" style={{ display: "block", height: "100%", width: "8%" }} >
        <img src="./img/logo.png" style={{ width: "100px" }} />
      </div>
      <div className="nav-item-admin" type="button" style={{ display: "block", marginLeft: "40px", textAlign: "center" }} >
        รายการคำสั่งซื้อจากผู้ซื้อ
      </div>
      <div className="nav-item-admin" type="button" style={{ display: "block", marginLeft: "40px", textAlign: "center" }} >
        ตรวจสอบการอัปโหลด
      </div>
      <div className="nav-item-admin" type="button" style={{ display: "block", marginLeft: "40px", textAlign: "center" }} >
        บริการสินค้าแนะนำ
      </div>
      <div className="nav-item-admin" type="button" style={{ display: "block", marginLeft: "40px", textAlign: "center" }} >
        ตรวจสอบการแก้ไข
      </div>
      <div className="nav-item-admin"  type="button" style={{ display: "block", marginLeft: "40px", textAlign: "center"}} onClick={() => Logout()}>
        <IoIcons.IoLogOut /> Logout
      </div>
    </div>
  );
}
export default NavbarAdmin;
