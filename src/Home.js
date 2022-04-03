import React from "react";
import "./css/pages.css";
import "./css/home.css";
import ShowDataUser from "./components/user/ShowDataUser";
// import {firebaseDB} from "./components/firebase";
// import { Link } from "react-router-dom";
// import { useState,useEffect } from "react";

function Home() {
return(
  <div className="container mx-auto">
    
    <ShowDataUser />
    <div>
    <h2>สินค้าที่ได้รับความนิยม</h2>
    <div>
     <h2>หมวดหมู่</h2>
    </div>
    <div>
    <h2>ทำไมต้องเลือกซื้อ-ขายของออนไลน์ที่ \n Tea Marketplace</h2>
    <h1>มั่นใจได้ทุกการขาย</h1>
    <h2>ไม่ต้องกังวลเรื่องเช็คเครดิตปิดการขายง่ายขึ้น</h2>
    </div>
    </div>

  </div>
);
}

export default Home;
