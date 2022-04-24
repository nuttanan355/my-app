import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as GiIcons from 'react-icons/gi';
export const GrouprData = [

  {
    title: 'เสื้อผ้า',
    path: '/manClothes',
    icon: <FaIcons.FaTshirt />,
    cName: 'nav-text',
    color: 'red'
  },
  {
    title: 'เครื่องประดับ',
    path: '/womanClothes',
    icon: <GiIcons.GiLargeDress />,
    cName: 'nav-text',
    color: 'blue'
  },
  {
    title: 'กระเป๋า',
    path: '/bag',
    icon: <GiIcons.GiSchoolBag />,
    cName: 'nav-text',
    color: 'yellow'
  },
  {
    title: 'รองเท้า',
    path: '/shoe',
    icon: <GiIcons.GiConverseShoe />,
    cName: 'nav-text',
    color: 'purple'
  },
  {
    title: 'เครื่องใช้ไฟฟ้า',
    path: '/electrical',
    icon: <GiIcons.GiElectric />,
    cName: 'nav-text',
    color: 'cyan'
  },
  {
    title: 'มือถือและอุปกรณ์',
    path: '/mobile',
    icon: <AiIcons.AiFillMobile />,
    cName: 'nav-text',
    color: 'green'
  },

];
