import React, {useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { GrouprData } from "../client/GroupData";
// import { IconContext } from "react-icons";
import { ApplicationData } from "../client/ApplicationData";
// import * as FcIcons from "react-icons/fc";
import * as BsIcons from "react-icons/bs";
import { firebaseAuth } from "../server/firebase";
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
    <div className="container-fluid">
      <div className={sidebar ? "nav-menu active" : "nav-menu"}>
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
        </ul>
      </div>

      <div className="navbar">
        <Link
          to="#"
          className="menu-bars"
          style={{ fontSize: "120%", marginLeft: "20px", marginTop: "0px" }}
        >
          <FaIcons.FaBars onClick={showSidebar} />
        </Link>
        <img
          className="btn navbar-logo"
          src="../img/logo.png"
          style={{ width: "100%" }}
          onClick={() => (window.location.href = "/")}
          alt=""
        />

        <div className="nav ">
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="nav">
          {user ? (
            <Dropdown>
              <Dropdown.Toggle className="nav-links" variant="transprent">
                <img
                  src={user.photoURL}
                  style={{
                    borderRadius: "50%",
                    width: "40px",
                    margin: "0px 20px 0px 0px",
                  }}
                  alt=""
                />
                {user.displayName}
              </Dropdown.Toggle>

              <Dropdown.Menu
                className="drop-nav"
                style={{ width: "100%", alignItems: "center" }}
              >
                {ApplicationData.map((item, index) => {
                  return (
                    <Dropdown.Item key={index} className={item.cName} href={item.path}>
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
                <BsIcons.BsPersonBoundingBox style={{ fontSize: "200%" }} />
                <p className="">Sign In</p>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavbarIndex;
