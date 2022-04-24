import React from 'react';
// import { Route } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
// import { Switch,Router } from 'react-router-dom';
import Home from '../../Home';
import Ads from '../user/ads';
import NavbarIndex from '../../navigation/navbar_index';

function HomeUser (){
    return(
    <div>
            <Home />
            <Ads/>
    </div>
    );
}
export default HomeUser;