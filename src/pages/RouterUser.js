import React from 'react';

import NotFound from "../error_404";
// <------------------------Pages USER-------------------------->

import HomeUser from "../components/user/HomeUser";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import Logout from "../components/login/Logout";


// <------------------------Pages SELLER------------------------>
import HomeSeller from "../components/seller/HomeSeller";
import AddNewProduct from "../components/seller/AddNewProduct";
import EditNewProduct from "../components/seller/EditNewProduct";
import ViewNewProduct from "../components/seller/ViewNewProduct"





export const RouteUser = [
    // ------------------------------------------------------------- User -------------------------------------------------
    {
        path: "*",
        element: <NotFound />,
      },
    {
      path: "/",
      element: <HomeUser />,
    },
    {
      path: "/user/sign-in",
      element: <SignIn />,
    },
    {
      path: "/user/sign-up",
      element: <SignUp />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
        path: "/ViewData/:id",
        element: <ViewNewProduct />,
      },

   
    // ------------------------------------------------------------- Seller -------------------------------------------------
 
    {
        path: "/HomeSeller",
        element: <HomeSeller />,
      },
      {
        path: "/seller/add-new-product",
        element: <AddNewProduct />,
      },
      {
        path: "/EditData/:id",
        element: <EditNewProduct />,
      },
      {
        path:"/user/seller-product",
        element:<HomeSeller />
      }

];