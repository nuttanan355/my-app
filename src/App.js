import React ,{useState,useEffect}from "react";
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

// ---------------------------------------------------------------------------------------------------------------------------------


// <------------------------Pages USER-------------------------->
import NavbarIndex from "./layout/NavbarIndex";
import HomeUser from "./components/user/HomeUser";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import Logout from "./components/Login/Logout";

// <------------------------Pages SELLER------------------------>
import HomeSeller from "./components/seller/HomeSeller";
import AddNewProduct from "./components/seller/AddNewProduct";
import { firebaseAuth, firebaseDB } from "./server/firebase";

// -------------------------------------------------------END IMPORT-----------------------------------------------------------------



function App() {


  const [admin, setAdmmin] = useState({});

 
  console.log("Chak"+admin);


  useEffect(() => {
   
        firebaseDB
          .child("Users")
          .orderByChild("type")
          .equalTo("Admin")
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              setAdmmin({...snapshot.val()});
            } else {
              setAdmmin({});
            }
          });
   
 
  }, []);






  return (
    <div>
      <NavbarIndex />
      <Routes>
        {/* <------------------------Pages USER--------------------------> */}
        {/* < Route path='/' exact component={AddNewProduct} /> */}
        {/* <Route path={"/EditData/:id"} component={EditNewProduct} /> */}
        {/* <Route path={"/ViewData/:id"} component={ViewNewProduct} /> */}
        {/* <AddNewProduct /> */}
        {/* <formAddNewProduct /> */}
        <Route path={"/"} index element={<HomeUser />} />
        <Route path={"/user/sign-in"} index element={<SignIn />} />
        <Route path={"/user/sign-up"} index element={<SignUp />} />
        <Route path={"/logout"} index element={<Logout />} />

        {/* <Route path={"profi"} */}

        {/* <------------------------Pages SELLER------------------------> */}
        <Route path={"/HomeSeller"} element={<HomeSeller />} />
        <Route path={"/AddNewProduct"} element={<AddNewProduct />} />

        {/* <------------------------Pages ADMIN-------------------------> */}
        <Route path={"/HomeAdmin"} element={<HomeAdmin />} />
        <Route path={"/NewProductsAdmin"} element={<NewProductsAdmin />} />
        <Route path={"/OrdersAdmin"} element={<OrdersAdmin />} />
        <Route path={"/EditProductAdmin"} element={<EditProductsAdmin />} />
        <Route path={"/RecomAdmin"} element={<RecomAdmin />} />

        {/* <------------------------Pages GATHER------------------------> */}
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
