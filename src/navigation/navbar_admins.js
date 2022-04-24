import React from "react";
import { Container, Navbar } from "react-bootstrap";
import * as FcIcons from "react-icons/fc";
import * as RiIcons from "react-icons/ri";
import * as BsIcons from "react-icons/bs";
import { Link } from "react-router-dom";
function NavbarAdmin() {
  return (
    <div className="pos-f-t">
      <div className="collapse" id="navbarToggleExternalContent">
        <div className="bg-dark p-4">
          <div>
            <a className="text-white" style={{ margin: "15px", fontSize: "28px", fontWeight: "bold" }}>Menu Admin</a>
          </div>

          <hr style={{ color: "black" }} />

          <div className="container" style={{ textAlign: "center" }}>
            <div className="row" >

              <div className="btn col-lg-6" >
                |
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/c-language/" style={{ padding: "10px", margin: "1px 0px 0px 0px", width: "50%", fontSize: "18px", border: "0" }}> รายการคำสั่งซื้อจากผู้ซื้อ</a> |
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/front-end-development/" style={{ padding: "10px", margin: "1px 0px 0px 0px", width: "50%", fontSize: "18px", border: "0" }}>ตรวจสอบการอัปโหลด</a> |
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/back-end-development/" style={{ padding: "10px", margin: "1px 0px 0px 0px", width: "50%", fontSize: "18px", border: "0" }}>ตรวจสอบการแก้ไข</a> |
                <a className="btn btn-outline-light" href="http://scanfcode.com/category/java-programming-language/" style={{ padding: "10px", margin: "1px 0px 0px 0px", width: "50%", fontSize: "18px", border: "0" }}>บริการสินค้าแนะนำ</a>
                |

              </div>
            </div>
          </div>
        </div>
      </div>
      <nav className="navbar navbar-dark bg-dark col-md-12">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
          <div className="navbar-toggler-icon"></div>
        </button>
        <Link className="navbar-toggler" to="/HomeAdmin" style={{ border: "0" }}>
          TEA Marketplance
        </Link>
        <div style={{ textAlign: "right" }}>
          <a className="text-white" style={{ margin: "32px", textAlign: "right", fontSize: "18px" }}>Admin User :</a>
        </div>

      </nav>
    </div>
  );
}
export default NavbarAdmin;
