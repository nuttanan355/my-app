import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrouprData } from "../client/GroupData";
import { NavMenu } from "../client/NavMenu";
// import { IconContext } from "react-icons";
import { ApplicationData } from "../client/ApplicationData";
// import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";
import * as RiIcons from "react-icons/ri";
import { firebaseAuth } from "../server/firebase";
import * as GoIcons from "react-icons/go";
import * as IoIcons from "react-icons/io";
import "../css/Navbar.css";

function NavbarIndex() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);




  
  return (
    <div>
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle" style={{ height: "50px" }}>
            <Link
              to="#"
              style={{
                fontSize: "30px",
                color: "black"
              }}
            >
              <RiIcons.RiCloseFill />
            </Link>
          </li>

          

          {NavMenu.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path} style={{ color: "black" }}>
                  {item.icon}
                  <span >{item.title}</span>
                </Link>
              </li>
            );
          })}
          


        </ul>

      </div>

      <div className="navbar">
        <button className="btn nav-bar" style={{ padding: "5px", marginLeft: "30px", border: "1px solid white", color: "white" }} onClick={showSidebar} >
          <FaIcons.FaBars style={{ fontSize: "20px", padding: "0" }} />
        </button>


        <div className="nav" >
          {user ? (
            <Dropdown>
              <Dropdown.Toggle className="nav-links" variant="transprent" style={{ fontSize: "1vh", padding: "0%", marginTop: "5px", color: "white" }}>
                <img
                  src={user.photoURL}
                  style={{
                    borderRadius: "50%",
                    width: "15%",
                    margin: "0px 10px 0px 0px",
                  }}
                />
                {user.displayName}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="drop-nav"
                style={{ width: "100%", alignItems: "center" }}
              >
                {ApplicationData.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} className={item.cName} href={item.path} style={{ paddingLeft: "10px" }}>
                      {/* <Link to={item.path}> */}
                      {item.icon}
                      <span>{item.title}</span>
                      {/* </Link> */}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
          ) : (
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

                  marginRight: "2%",
                  align: "mid",
                }}
                to="../user/sign-in"
              >
                <div style={{ background: "white", width: "50px", padding: "5px", borderRadius: "10px", boxShadow: "0px 2px 3px gray" }}>
                  <BsIcons.BsFillPersonFill style={{ fontSize: "200%" }} />
                  <p style={{ fontSize: "10px" }}>Sign In</p>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarIndex;
