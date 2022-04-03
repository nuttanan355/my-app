import React from "react";
import { Container, Navbar } from "react-bootstrap";

function NavbarSeller() {
  return (
    <div>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/HomeAdmin">
          <img
            alt=""
            src="../../img/logo_kmutnb.png"
            // width="30"
            // height="30"
            className="d-inline-block align-top"
          />{" "}
          HomeSeller
        </Navbar.Brand>
      </Container>
    </Navbar>
  </div>
  );
}
export default NavbarSeller;
