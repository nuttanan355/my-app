import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrouprData } from "./GrouprData";
import "../css/navbar.css";
import { IconContext } from "react-icons";
import { Typography } from "@material-ui/core";

import { ApplicationData } from "./ApplicationData";


function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Typography variant="h5" className="title-bars">
            <div>
              <Link to="/">
                {/* <img src={logo_tea} width="100" height="50" /> */}
                <div>
                  <p>TEA Marketplance</p>
                </div>
              </Link>
            </div>
          </Typography>
        </div>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars />
              </Link>
            </li>

            <p className="title-bars">ประเภทสินค้า </p><hr/>
            {/* <hr className="title-bars"></hr> */}

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

            <p className="title-bars"> Application</p>
            <hr className="title-bars"></hr>

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
            <div>
              <div></div>
              <p>UserName</p>
              <hr />
              <p>Type User</p>
            </div>
          </ul>
        </nav>
      </IconContext.Provider>
      {/* <div>
        <BottomNavBar/>
      </div> */}
    </div>
  );
}

export default Navbar;
