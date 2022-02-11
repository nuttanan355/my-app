import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const GrouprData = [

  {
    title: 'เสื้อผ้าผู้ชาย',
    path: '/manClothes',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'เสื้อผ้าผู้หญิง',
    path: '/womanClothes',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'กระเป๋า',
    path: '/bag',
    icon: <FaIcons.FaCartPlus />,
    cName: 'nav-text'
  },
  {
    title: 'รองเท้า',
    path: '/shoe',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'เครื่องใช้ไฟฟ้า',
    path: '/electrical',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'มือถือและอุปกรณ์',
    path: '/mobile',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  
];
