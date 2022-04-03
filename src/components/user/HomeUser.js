import React from 'react';
// import { Route } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Switch,Router } from 'react-router-dom';
import Home from '../../Home';
import NavbarIndex from '../../navigation/navbar_index';

function HomeUser (){
    return(
    <div>
            <NavbarIndex />
            <Home />
    </div>
    );
}
export default HomeUser;