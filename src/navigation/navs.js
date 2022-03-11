import React from "react";
import { Nav, NavLink, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";


function Navs() {

  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <NavItem>
          <nav>
            <Link to={"/"}>
                User 
            </Link>
          </nav>
        </NavItem>
        <NavItem>
          <nav>
            <Link to={"/HomeSeller"}>
                Seller 
            </Link>
          </nav>
        </NavItem>
        <NavItem>
          <nav>
            <Link to={"/HomeAdmin"}>
                Admin 
            </Link>
          </nav>
        </NavItem>
      </Nav>
    </div>
  );
}
export default Navs;
