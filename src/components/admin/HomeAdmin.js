import React from 'react';
// import { Switch,Router } from 'react-router-dom';
// import { Container, Navbar } from 'react-bootstrap';
import NavbarAdmin from '../../navigation/navbar_admins';
// import NavbarIndex from '../navigation/navbar_index';

function HomeAdmin (){
    return(
        <div>
{/* <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/HomeAdmin">
        <img
          alt=""
          src="../../img/logo_kmutnb.png"
          // width="30"
          // height="30"
          className="d-inline-block align-top"
        />{' '}
     HomeAdmin
      </Navbar.Brand>
    </Container>
  </Navbar> */}
  <NavbarAdmin/>

    </div>

    );
}
export default HomeAdmin;