import React from "react";
import { Nav, NavLink,NavItem } from "react-bootstrap";
import  chkUserType from '../App';

function Navs() {
  return (
    <div>
      <Nav fill variant="tabs">
        <NavItem>
          <NavLink eventKey="link-0" href="/" >User</NavLink>
          <chkUserType {...'user'}/>
        </NavItem>
        <NavItem>
          <NavLink eventKey="link-1" href="HomeSeller">
            Seller
          </NavLink>
          <chkUserType {...'seller'}/>
        </NavItem>
        <NavItem>
          <NavLink eventKey="link-2" href="HomeAdmin">
            Admin
          </NavLink>
          <chkUserType {...'admin'}/>
        </NavItem>
      </Nav>
      {/* <Nav justify variant="tabs" defaultActiveKey="/home">
        <NavItem>
          <nav>
            <Link to={"/"}>
                User 
            </Link>
          </nav>
        </NavItem>
        <NavItem>
          <NavItem>
            <Link to={"/HomeSeller"}>
                Seller 
            </Link>
          </NavItem>
        </NavItem>
        <NavItem>
          <nav>
            <Link to={"/HomeAdmin"}>
                Admin 
            </Link>
          </nav>
        </NavItem>
      </Nav> */}
    </div>
  );
}
export default Navs;
