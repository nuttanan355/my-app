import React from "react";
// import { Switch,Router } from 'react-router-dom';
// import { Container, Navbar } from 'react-bootstrap';
import NavbarAdmin from "../../navigation/navbar_admins";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";

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
        <div className="container">
          <h1>ADMIN</h1>
        </div>
        <hr />
     
          <div className="row">
            <div
              className="col-lg bg-warning rounded-3 p-3 mx-3 my-3"
              id="stateProduct"
            >
              <div className="text-center">
                <FaIcons.FaBox size={200} />
              </div>
              <p className="text-center mt-3 h4">ตรวจสอบสถานะคำสั่งซื้อ</p>
            </div>
            <div
              className="col-lg bg-warning rounded-3 p-3 mx-3 my-3"
              id="div2"
            >
              <Link to="/AddNewProduct">
                <div className="text-center">
                  <FaIcons.FaBoxes size={200} />
                </div>
                <p className="text-center mt-3 h4">ประกาศการขาย</p>
              </Link>
            </div>
            <div
              className="col-lg bg-warning rounded-3 p-3 mx-3 my-3"
              id="div3"
            >
              <div className="text-center">
                <FaIcons.FaShoppingBasket size={200} />
              </div>
              <p className="text-center mt-3 h4">ตรวจสอบการโอนเงินจากระบบ</p>
            </div>
            <div
              className="col-lg bg-warning rounded-3 p-3 mx-3 my-3"
              id="stateProduct"
            >
              <div className="text-center">
                <AiIcons.AiFillLike size={200} />
              </div>
              <p className="text-center mt-3 h4">บริการสินค้าแนะนำ</p>
            </div>
   
        </div>
      </div>
    </div>
  );
}
export default HomeAdmin;
