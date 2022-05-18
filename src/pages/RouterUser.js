import React from 'react';

import NotFound from "../error_404";
// <------------------------Pages USER-------------------------->

import HomeUser from "../components/user/HomeUser";
import Product from "../components/user/Product";
import Category from "../components/user/Category";
import SignIn from "../components/login/SignIn";
import SignUp from "../components/login/SignUp";
import CartUser from '../components/user/CartUser';
import Logout from "../components/login/Logout";
import ViewProduct from "../components/user/ViewProduct"
import ProfileUser from '../components/user/ProfileUser';



// <------------------------Pages SELLER------------------------>
import HomeSeller from "../components/seller/HomeSeller";
import SellerProduct from "../components/seller/SellerProduct"
import AddNewProduct from "../components/seller/AddNewProduct";
import EditNewProduct from "../components/seller/EditNewProduct";
import RecomProduct from "../components/seller/RecomProduct";
import PayRecomProduct from "../components/seller/PayRecomProduct";
import ProfileSeller from "../components/seller/ProfileSeller";
import PaymentProduct from '../components/user/PaymentProduct';





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
      path: "/category",
      element: <Category />,
  },
    {
        path: "/view-product/:id",
        element: <ViewProduct />,
    },
    {
        path: "/user/carts",
        element: <CartUser />,
    },
    {
      path: "/user/payments/:id",
      element: <PaymentProduct />,
  },
    {
      path: "/product",
      element: <Product />,
  },
  {
    path: "/user/profile",
    element: <ProfileUser />,
},

   
    // ------------------------------------------------------------- Seller -------------------------------------------------
 
    {
        path: "/HomeSeller",
        element: <HomeSeller />,
      },
      {
        path:"/seller/seller-product",
        element:<SellerProduct />
      },
      {
        path: "/seller/seller-product/add-product",
        element: <AddNewProduct />,
      },

          {
        path: "/seller/edit-data/:id",
        element: <EditNewProduct />,
      },
      {
        path: "/seller/seller-profile",
        element: <ProfileSeller />,
      },
      {
        path: "/seller/seller-recom",
        element: <RecomProduct />,
      },
      {
        path: "/seller/seller-recom/pay/:id",
        element: <PayRecomProduct />,
      },


];
