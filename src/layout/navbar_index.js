import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrouprData } from "../client/GroupData";
import { IconContext } from "react-icons";
import { ApplicationData } from "../client/ApplicationData";
import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";
import "../css/Navbar.css";

function NavbarIndex() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#ffffff" }}>
        <div className="navbar">
          <Link
            to="#"
            className="menu-bars"
            style={{ fontSize: "120%", marginLeft: "20px", marginTop: "0", background: "red" }}
          >
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div
            variant="h5"
            className="title-bars"
            style={{ marginLeft: "0px" }}
          >
           
              <img className="btn navbar-logo" src="../img/logo.png" style={{ background: "red", marginTop: "0" }} onClick={()=>
                (window.location.href = `/`)
              }/>
          
           
          </div>
          <div
            variant="h5"
            className="title-bars"
            style={{ textAlign: "right" }}
          >
            <Link
              className="btn "
              style={{
                color: "gray",
                fontSize: "100%",
                background: "#fefefe",
                margin: "10px",
                align: "mid",
              }}
              to="../components/LoginandRegister/Home.js"
            >
              <FcIcons.FcGoogle style={{ fontSize: "150%" }} />
              &nbsp; | &nbsp; Sign In With Google
            </Link>
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link
                to="#"
                className="btn menu-bars"
                style={{
                  fontSize: "120%",
                  textAlign: "right",
                  color: "Lightgray",
                }}
              >
                <FaIcons.FaBars />
              </Link>
            </li>

            <p className="title-bars">ประเภทสินค้า </p>
            {/* <hr className="title-bars"></hr> */}
            <hr className="title-bars" />
            {GrouprData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <br />
            <br />
            <p className="title-bars"> Application</p>
            <hr className="title-bars" />

            {ApplicationData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
      {/* <div>
        <BottomNavBar/>
      </div> */}
    </div>
  );
}

export default NavbarIndex;
