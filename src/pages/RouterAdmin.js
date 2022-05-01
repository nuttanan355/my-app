import React from 'react';

import NotFound from "../error_404";
import HomeAdmin from "../components/admin/HomeAdmin";
import Logout from "../components/login/Logout"
import NewProductsAdmin from "../components/admin/NewProductsAdmin";
import EditProductsAdmin from "../components/admin/EditProductsAdmin";
import OrdersAdmin from "../components/admin/OrdersAdmin";
import RecomAdmin from "../components/admin/RecomAdmin";


export const RouteAdmin = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <HomeAdmin />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/admin/new-products",
    element: <NewProductsAdmin />,
  },
  {
    path: "/admin/oders",
    element: <OrdersAdmin />,
  },
  {
    path: "/admin/edit-product",
    element: <EditProductsAdmin />,
  },
  {
    path: "/admin/recom",
    element: <RecomAdmin />,
  },
];
