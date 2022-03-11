import React from 'react';
import { Switch,Router } from 'react-router-dom';
import Home from '../Home';
import NavbarIndex from '../navigation/navbar_index';

function HomeUser (){
    return(
    <div>
        <h1>HomeUser</h1>
        <Home />
    </div>
    );
}
export default HomeUser;