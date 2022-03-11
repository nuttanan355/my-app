import React from 'react';
import { Switch,Router } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
// import NavbarIndex from '../navigation/navbar_index';

function HomeAdmin (){
    return(
        <div>
        <h1>HomeAdmin</h1>
     
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="/public/logo_kmutnb.png"
              width="50"
              height="50"
              className="d-inline-block align-top"
            />{' '}
          React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>

    </div>

    );
}
export default HomeAdmin;