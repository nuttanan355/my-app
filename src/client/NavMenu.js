import React from 'react';
import * as BsIcons from 'react-icons/bs';
import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io';
// import * as BsIcons from 'react-icons/bs';
import * as BiIcons from 'react-icons/bi';
// import * as ImIcons from 'react-icons/im';
import * as VscIcons from 'react-icons/vsc';
// import * as WiIcons from 'react-icons/wi';
// import * as GoIcons from 'react-icons/go';
// import * as GrIcons from 'react-icons/gr';
// import * as HiIcons from 'react-icons/hi';
// import * as RiIcons from 'react-icons/ri';
// import * as SiIcons from 'react-icons/si';
// import * as TiIcons from 'react-icons/ti';


export const NavMenu = [

  {
    title: 'หน้าแรก',
    path: '/',
    icon: <AiIcons.AiOutlineHome />,
    cName: 'nav-text',
    
  },
  {
    title: 'ข้อมูลส่วนตัว',
    path: '/user/profile',
    icon: <AiIcons.AiOutlineShop />,
    cName: 'nav-text',
  
  },
  // {
  //   title: 'สินค้า',
  //   path: '/product',
  //   icon: <AiIcons.AiOutlineShop />,
  //   cName: 'nav-text',
  
  // },
  {
    title: 'สินค้า',
    path: '/category',
    icon: <AiIcons.AiOutlineAppstore />,
    cName: 'nav-text',
  
  },
  {
    title: 'ตะกร้าสินค้า',
    path: '/user/carts',
    icon: <AiIcons.AiOutlineShoppingCart />,
    cName: 'nav-text',
    
  },
  // {
  //   title: 'รายงานปัญหา',
  //   path: '/report',
  //   icon: <VscIcons.VscReport />,
  //   cName: 'nav-text',
  
  // },
  
  // ------------------------------------
  

];
