import React from 'react';
import { Nav, NavLink,NavItem } from "react-bootstrap";

function NewProductsAdmin () {
return(
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
    <div className="container">
        
    </div>
    
</div>
);
}
export default NewProductsAdmin;