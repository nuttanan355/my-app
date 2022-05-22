import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';
import * as IoIcons from 'react-icons/io5';
export const ApplicationData = [
  {
    title: 'My Profile',
    path: '/user/profile',
    icon: <ImIcons.ImProfile />,
    cName: 'nav-text'
  },
  {
    title: 'Cart',
    path: '/user/carts',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Orders',
    path: '/user/order',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Seller',
    path: '/HomeSeller',
    icon: <IoIcons.IoStorefrontSharp />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <IoIcons.IoLogOut />,
    cName: 'nav-text'
  },

];
