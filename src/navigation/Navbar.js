import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { GrouprData } from "./GrouprData";
import "../css/Navbar.css";
import { IconContext } from "react-icons";
import { Typography } from "@material-ui/core";
import BottomNavBar from "./BottomNavBar";
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
            <div>TEA Market</div>
          </Typography>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>

            <text className="title-bars">ประเภทสินค้า</text>
            <hr className="title-bars"></hr>

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
            <text className="title-bars"> Application</text>
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
