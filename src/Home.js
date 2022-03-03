import { Link } from "@material-ui/core";
import React from "react";
import { GrouprData } from "./navigation/GrouprData";
import "./css/pages.css";
import "./css/home.css";


function Home() {
  return (
    <div GrouprData="div-main">
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
  );
}

export default Home;
