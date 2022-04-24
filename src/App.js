import React from "react";
// import './css/App.css';
import "./css/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./Home";
// import ManClothes from "./pages/ManClothes";
// import WomanClothes from "./pages/WomanClothes"
// import Bag from "./pages/Bag";
// import AddNewProduct from "./seller/AddNewProduct";
// import EditNewProduct from "./seller/EditNewProduct";
// import ViewNewProduct from "./seller/ViewNewProduct"
// import NavbarSeller from './navigation/navbar_seller';
// <------------------------Pages GATHER------------------------>
import Navs from "./navigation/navsTest";
import NotFound from "./error_404";

// <------------------------Pages ADMIM------------------------->
import HomeAdmin from "./components/admin/HomeAdmin";
import NewProductsAdmin from "./components/admin/NewProductsAdmin";
import EditProductsAdmin from "./components/admin/EditProductsAdmin";
import OrdersAdmin from "./components/admin/OrdersAdmin";
import RecomAdmin from "./components/admin/RecomAdmin";

// <------------------------Pages SELLER------------------------>
import HomeSeller from "./components/seller/HomeSeller";
import AddNewProduct from "./components/seller/AddNewProduct";

// <------------------------Pages USER-------------------------->
import HomeUser from "./components/user/HomeUser";

import Home from "./components/Login/Home";
import Dashboard from "./components/Login/Dashboard";
import LogIn from "./components/Login/LogIn";
import SignUp from "./components/Login/SignUp";
import { AuthProvider } from "./components/Login/Auth";
import NavbarIndex from './navigation/navbar_index'
const chkUserType = (user) => {
  if (user == "User") {
    return <Switch>

    </Switch>;
  } else if (user == "Seller") {
    return <Switch>

    </Switch>;
  } else if (user == "Admin") {
    return <Switch>

    </Switch>;
  } else {
    return (
      <Switch>
        <Route path={"*"} component={NotFound} />
      </Switch>
    );
  }
};

function App() {
  return (

    <Router >
      {/* <Navs /> */}
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
    <NavbarIndex/>
      <Switch>
        {/* <------------------------Pages USER--------------------------> */}
        {/* < Route path='/' exact component={AddNewProduct} /> */}
        {/* <Route path={"/EditData/:id"} component={EditNewProduct} /> */}
        {/* <Route path={"/ViewData/:id"} component={ViewNewProduct} /> */}
        {/* <AddNewProduct /> */}
        {/* <formAddNewProduct /> */}
        <Route path={"/"} exact component={HomeUser} />

        {/* <------------------------Pages SELLER------------------------> */}
        <Route path={"/HomeSeller"} component={HomeSeller} />
        <Route path={"/AddNewProduct"} component={AddNewProduct} />

        {/* <------------------------Pages ADMIN-------------------------> */}
        <Route path={"/HomeAdmin"} component={HomeAdmin} />
        <Route path={"/NewProductsAdmin"} component={NewProductsAdmin} />
        <Route path={"/OrdersAdmin"} component={OrdersAdmin} />
        <Route path={"/EditProductAdmin"} component={EditProductsAdmin} />
        <Route path={"/RecomAdmin"} component={RecomAdmin} />

        {/* <------------------------Pages GATHER------------------------> */}
        <Route path={"*"} component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
