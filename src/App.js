import React from "react";
import './css/App.css';
import NavbarIndex from './navigation/navbar_index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ManClothes from "./pages/ManClothes";
import WomanClothes from "./pages/WomanClothes"
import Bag from "./pages/Bag";
import AddNewProduct from "./seller/AddNewProduct";
import EditNewProduct from "./seller/EditNewProduct";
import ViewNewProduct from "./seller/ViewNewProduct"
import NavbarSeller from './navigation/navbar_seller';
import Navs from './navigation/navs';
import HomeUser from './user/HomeUser';
import HomeSeller from "./seller/HomeSeller";
import HomeAdmin from './admin/HomeAdmin';
import AddImage from "./seller/AddImage";
// import formAddNewProduct from "./components/formAddNewProduct";

const chkUserType=()=>{

}

function App() {
  return (
    <Router>

      {/* <Navs /> */}
      {/* <Switch> */}
        {/* <Route path={'/'} component={HomeUser} /> */}
        {/* <Route path={'/HomeSeller'}  component={HomeSeller} /> */}
        {/* <Route path={'/HomeAdmin'}  component={HomeAdmin}/> */}
        {/* <Home /> */}
      {/* </Switch> */}
        <NavbarIndex />
        <AddImage />
        {/* <NavbarSeller /> */}
        {/* <AddNewProduct /> */}
        <Home />

        <Switch>
       {/* < Route path='/' exact component={AddNewProduct} /> */}
         <Route path={"/EditData/:id"} component={EditNewProduct} />
         <Route path={"/ViewData/:id"} component={ViewNewProduct} />

          {/* <AddNewProduct /> */}
          {/* <formAddNewProduct /> */}
          {/* <Route path='/' exact component={Home} />
          <Route path='/manClothes' component={ManClothes} />
          <Route path='/womanClothes' component={WomanClothes}/>
          <Route path='/bag' component={Bag} /> */}
        
        </Switch>
      
      </Router>
  );
}


export default App;
