import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrouprData } from "./GrouprData";
import { IconContext } from "react-icons";
import { ApplicationData } from "./ApplicationData";
import * as FcIcons from "react-icons/fc";
import "../css/Navbar.css";

function NavbarIndex() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#ffffff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars" style={{ fontSize: "120%", margin: "20px" }}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div variant="h5" className="title-bars" style={{ textAlign: "left" }}>

            <Link className="btn" to="/" style={{ fontWeight: "bold", fontSize: "140%", color: "white", margin: "1%" }}>TEA Marketplance
              {/* <Link to="/"> */}
              {/* <img src={logo_tea} width="100" height="50" /> */}
              {/* </Link> */}
            </Link>


          </div>
          <div variant="h5" className="title-bars" style={{ textAlign: "right" }}>


            <Link className="btn " style={{ color: "gray", fontSize: "100%", background: "#fefefe", margin: "10px", align: "mid" }} to="../components/LoginandRegister/Home.js">
              <FcIcons.FcGoogle style={{ fontSize: "150%" }} /> &nbsp; <a style={{ color: "lightgray" }}>|</a> &nbsp;
              Sign In With Google
            </Link>

          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar} >
            <li className="navbar-toggle">
              <Link to="#" className="btn menu-bars" style={{ fontSize: "120%", textAlign: "right", color: "Lightgray" }} >
                <FaIcons.FaBars />
              </Link>
            </li>

            <p className="title-bars">ประเภทสินค้า </p>
            {/* <hr className="title-bars"></hr> */}
            <hr className="title-bars"/>
            {GrouprData.map((item, index) => {
              return (
                // <li title='test'> </li>,
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <br /><br />
            <p className="title-bars"> Application</p>
            <hr className="title-bars" />

            {ApplicationData.map((item, index) => {
              return (
                // <li title='test'> </li>,
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
