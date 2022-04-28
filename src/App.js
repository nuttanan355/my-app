import React from "react";
// import './css/App.css';
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
// import Home from "./Home";
// import ManClothes from "./pages/ManClothes";
// import WomanClothes from "./pages/WomanClothes"
// import Bag from "./pages/Bag";
// import AddNewProduct from "./seller/AddNewProduct";
// import EditNewProduct from "./seller/EditNewProduct";
// import ViewNewProduct from "./seller/ViewNewProduct"
// import NavbarSeller from './navigation/navbar_seller';
// <------------------------Pages GATHER------------------------>
// import Navs from "./layout/navsTest";
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
import LogIn from "./components/login/LogIn";
import Mobile from "./components/user/mobile";

import NavbarIndex from './layout/navbar_index'

function App() {
  return (

    <div>

    <NavbarIndex/>
      <Routes>
        {/* <------------------------Pages USER--------------------------> */}
        {/* < Route path='/' exact component={AddNewProduct} /> */}
        {/* <Route path={"/EditData/:id"} component={EditNewProduct} /> */}
        {/* <Route path={"/ViewData/:id"} component={ViewNewProduct} /> */}
        {/* <AddNewProduct /> */}
        {/* <formAddNewProduct /> */}
        <Route path={"/"} index element={<HomeUser/>} />
        <Route path={"/user/login"} index element={<LogIn/>} />
        <Route path={"/mobile"} element={<Mobile/>} />
        {/* <------------------------Pages SELLER------------------------> */}
        <Route path={"/HomeSeller"} element={<HomeSeller/>} />
        <Route path={"/AddNewProduct"} element={<AddNewProduct/>} />
       

        {/* <------------------------Pages ADMIN-------------------------> */}
        <Route path={"/HomeAdmin"} element={<HomeAdmin/>} />
        <Route path={"/NewProductsAdmin"} element={<NewProductsAdmin/>} />
        <Route path={"/OrdersAdmin"} element={<OrdersAdmin/>} />
        <Route path={"/EditProductAdmin"} element={<EditProductsAdmin/>} />
        <Route path={"/RecomAdmin"} element={<RecomAdmin/>} />

        {/* <------------------------Pages GATHER------------------------> */}
        <Route path={"*"} element={NotFound} />
      </Routes>
  </div>
  );
}

export default App;
