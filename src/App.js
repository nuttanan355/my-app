import React from "react";
import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Home from "./Home";
// import ManClothes from "./pages/ManClothes";
// import WomanClothes from "./pages/WomanClothes"
// import Bag from "./pages/Bag";
// import AddNewProduct from "./seller/AddNewProduct";
// import EditNewProduct from "./seller/EditNewProduct";
// import ViewNewProduct from "./seller/ViewNewProduct"
// import NavbarSeller from './navigation/navbar_seller';
import Navs from './navigation/navsTest';
import HomeUser from './components/user/HomeUser';
import HomeSeller from "./components/seller/HomeSeller";
import HomeAdmin from './components/admin/HomeAdmin';
import AddNewProduct from './components/seller/AddNewProduct';
// import AddImage from "./seller/AddImage";
// import formAddNewProduct from "./components/formAddNewProduct";

// const chkUserType=()=>{
// return(
  
// );
// }


function App() {
  return (
    <Router>

      <Navs />
      {/* <Switch> */}
        {/* <Route path={'/'} component={HomeUser} /> */}
        {/* <Route path={'/HomeSeller'}  component={HomeSeller} /> */}
        {/* <Route path={'/HomeAdmin'}  component={HomeAdmin}/> */}
        {/* <Home /> */}
      {/* </Switch> */}
        {/* <NavbarIndex /> */}
        {/* <AddImage /> */}
        {/* <NavbarSeller /> */}
        {/* <AddNewProduct /> */}
        {/* <Home /> */}
    
        {/* <Switch>

        </Switch> */}

        <Switch>
       {/* < Route path='/' exact component={AddNewProduct} /> */}
         {/* <Route path={"/EditData/:id"} component={EditNewProduct} /> */}
         {/* <Route path={"/ViewData/:id"} component={ViewNewProduct} /> */}

          {/* <AddNewProduct /> */}
          {/* <formAddNewProduct /> */}
          <Route path='/' exact component={HomeUser} />
          <Route path='/HomeSeller' component={HomeSeller} />
          <Route path='/HomeAdmin' component={HomeAdmin}/>
          <Route path='/AddNewProduct' component={AddNewProduct} />
        
        </Switch>
      
      </Router>
  );
}


export default App;
