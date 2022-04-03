import React from "react";
import { Nav } from "react-bootstrap";

function Navs() {
  return (
    <div>
      <Nav fill variant="tabs">
        <Nav.Item>
          <Nav.Link href="/">User</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-1" href="HomeSeller">
            Seller
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2" href="HomeAdmin">
            Admin
          </Nav.Link>
        </Nav.Item>
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
