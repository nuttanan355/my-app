import React from "react";
// import { Container, Navbar } from "react-bootstrap";
// import * as FcIcons from "react-icons/fc";
// import * as RiIcons from "react-icons/ri";
// import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
import Logout from "../components/login/Logout";

function NavbarAdmin() {
  

  return (
    <div>
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <div>
            <p className="text-white" style={{ margin: "15px", fontSize: "28px", fontWeight: "bold" }}
            >
              Menu Admin
            </p>
          </div>

          <hr style={{ color: "black" }} />

            <div className="row">
              <div className="btn col-lg-6">
                
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/c-language/">
                  รายการคำสั่งซื้อจากผู้ซื้อ
                </a>
                
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/front-end-development/">
                  ตรวจสอบการอัปโหลด
                </a>
                
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/back-end-development/">
                  ตรวจสอบการแก้ไข
                </a>
                
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/java-programming-language/">
                  บริการสินค้าแนะนำ
                </a>
                
              </div>
            </div>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark ">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarToggleExternalContent"
          aria-controls="navbarToggleExternalContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className="navbar-toggler-icon"></div>
        </button>
        <Link
          className="navbar-toggler"
          to="/"
          style={{ border: "0" }}
        >
          TEA Marketplance
        </Link>
        <div style={{ textAlign: "right" }}>
          <p className="btn text-white"
            style={{  
                      margin: "32px", 
                      textAlign: "right", 
                      fontSize: "18px" 
                  }}
            onClick={()=>Logout()}
          >
            Logout
          </p>
        </div>
      </nav>
    </div>
  );
}
export default NavbarAdmin;
