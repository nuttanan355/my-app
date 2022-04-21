import React from "react";
import "./css/pages.css";
import "./css/home.css";
import "./css/style.css";
import ShowDataUser from "./components/user/ShowDataUser";

// import {firebaseDB} from "./components/firebase";
// import { Link } from "react-router-dom";
// import { useState,useEffect } from "react";

function Home() {
  return (
    <div className="container mx-auto">
      <div className="container">
        <h2 style={{ margin: "2%" }}>สินค้าที่ได้รับความนิยม</h2>

        <ShowDataUser />

      </div>
      {/* <img
                    id="imgShow"
                    className="card-img-top"
                    // style="height:200px;"
                    style={{height:"350px"}}
                    alt="not bg"
                    src={require('./img/bg.jpg')}
                  /> */}
      {/* <img alt="not bg" /> */}
      
        <div>
          <img src='./img/bg.jpg'
            id="imgShow"
            style={{ height: "350px", width: '720px' }}
            alt="not bg" />

          <div>
            <h2>หมวดหมู่</h2>
          </div>
          <div>
            <h2>ทำไมต้องเลือกซื้อ-ขายของออนไลน์ที่</h2>
            <h1> Tea Marketplace</h1>
            <h1>มั่นใจได้ทุกการขาย</h1>
            <h2>ไม่ต้องกังวลเรื่องเช็คเครดิตปิดการขายง่ายขึ้น</h2>
          </div>
        </div>
        
    </div>
  );
}

export default Home;
