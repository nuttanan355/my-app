import React from "react";
// import { Switch,Router } from 'react-router-dom';
// import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import NavbarAdmin from "../../navigation/navbar_admins";
// import * as FaIcons from "react-icons/fa";
// import * as AiIcons from "react-icons/ai";
import * as FcIcons from "react-icons/fc";

function HomeAdmin() {
  return (
    <div>
      {/* <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/HomeAdmin">
        <img
          alt=""
          src="../../img/logo_kmutnb.png"
          // width="30"
          // height="30"
          className="d-inline-block align-top"
        />{' '}
     HomeAdmin
      </Navbar.Brand>
    </Container>
  </Navbar> */}
      <NavbarAdmin />
      <div className="container">
        <div className="container mt-5">
          <h1>ADMIN</h1>
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div
              className="col-lg bg-secondary bg-opacity-10 rounded-3 p-3 mx-3 my-3"
              id="stateProduct"
            >
              <Link to={"/OrdersAdmin"}>
              <div className="text-center">
                <FcIcons.FcRatings size={200} />
              </div>
              <p className="text-center mt-3 h4">รายการคำสั่งซื้อจากผู้ซื้อ</p>
              </Link>
            </div>
            <div
              className="col-lg bg-success bg-opacity-10  rounded-3 p-3 mx-3 my-3 text-dark"
              id="div2"
            >
              <Link to={"/NewProductsAdmin"}>
                <div className="text-center">
                  <FcIcons.FcComboChart size={200} />
                </div>
                <p className="text-center mt-3 h4"> ตรวจสอบการอัปโหลด อนุมัติรายการสินค้า </p>
              </Link>
            </div>
            <div
              className="col-lg bg-secondary bg-opacity-10  rounded-3 p-3 mx-3 my-3"
              id="div3"
            >
              <Link to={'/EditProductAdmin'}>
              <div className="text-center">
                <FcIcons.FcDataConfiguration size={200} />
              </div>
              <p className="text-center mt-3 h4">ตรวจสอบการแก้ไขรายการสินค้า</p>
            </Link>
            </div>
            <div
              className="col-lg bg-secondary bg-opacity-10  rounded-3 p-3 mx-3 my-3"
              id="stateProduct"
            >
              <Link to={'/RecomAdmin'}>
              <div className="text-center">
                <FcIcons.FcLike size={200} />
              </div>
              <p className="text-center mt-3 h4">บริการสินค้าแนะนำ</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;
