import React, { useState, useEffect } from "react";
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
// <------------------------Layout------------------------>
import NavbarAdmin from "./layout/NavbarAdmins";
import NavbarIndex from "./layout/NavbarIndex";
import Footer from "./layout/footer";

// ---------------------------------------------------------------------------------------------------------------------------------

import NotFound from "./error_404";

// <------------------------Pages ADMIM------------------------->

// import HomeAdmin from "./components/admin/HomeAdmin";
// import NewProductsAdmin from "./components/admin/NewProductsAdmin";
// import EditProductsAdmin from "./components/admin/EditProductsAdmin";
// import OrdersAdmin from "./components/admin/OrdersAdmin";
// import RecomAdmin from "./components/admin/RecomAdmin";
import { RouteAdmin } from "./pages/RouterAdmin";

// ---------------------------------------------------------------------------------------------------------------------------------

// // <------------------------Pages USER-------------------------->

// import HomeUser from "./components/user/HomeUser";
// import SignIn from "./components/login/SignIn";
// import SignUp from "./components/login/SignUp";
// import Logout from "./components/login/Logout";

// // <------------------------Pages SELLER------------------------>
// import HomeSeller from "./components/seller/HomeSeller";
// import AddNewProduct from "./components/seller/AddNewProduct";
import { RouteUser } from "./pages/RouterUser";
import { firebaseAuth, firebaseDB } from "./server/firebase";

// -------------------------------------------------------END IMPORT-----------------------------------------------------------------
// const chjkAdnin = firebaseDB.child("Users").orderByChild('type').equalTo('Admin');

function App() {
  const [admin, setAdmmin] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((users) => {
      if (users !== null) {
        firebaseDB
          .child("Users")
          .child(users.uid.toString())
          .child("type")
          .on("value", (snapshot) => {
            if (snapshot.val() === "Admin") {
              setAdmmin(true);
            } else {
              setAdmmin(false);
            }
          });
      } else {
        setAdmmin(false);
        console.log("Error");
      }
    });
  }, []);

  return (
    <div>
      {admin ? (
        <div>
          <NavbarAdmin />
          <Routes>
            {RouteAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>

          <Footer />
        </div>
      ) : (
        <div>
          <NavbarIndex />
          <Routes>
            {RouteUser.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
