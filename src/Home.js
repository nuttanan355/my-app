import React from "react";
import "./css/pages.css";
import "./css/home.css";
import "./css/style.css";
import ShowDataUser from "./components/user/ShowDataUser";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import { Link } from "react-router-dom";
import { GrouprData } from "././navigation/GrouprData";


// import {firebaseDB} from "./components/firebase";
// import { Link } from "react-router-dom";
// import { useState,useEffect } from "react";

function Home() {
  return (

    <div className="container mx-auto">
      <div className="container">

        <h2 style={{ padding: "3%", color: "orange" }}><AiIcons.AiFillStar style={{ color: "orange", fontSize: "90%" }} /> สินค้าที่ได้รับความนิยม</h2>

        <ShowDataUser />
        <br />

      </div>
      <br /><br /><br />
      <div className="col">

        <h3>หมวดหมู่</h3><hr />
        <div style={{ textAlign: "center", padding: "10px", margin: "0px" }}>
          {GrouprData.map((item, index) => {
            return (




              <a href={item.path}>
                <div className="btn" style={{ textAlign: "center" }}>
                  <button className="btn circle-btn btn-type" style={{ margin: "20px" }} >{item.icon} <div style={{ margin: "10px" }}>{item.title}</div></button>

                </div>
              </a>





            );
          })}
        



        </div>
      </div>




    </div>

  );
}

export default Home;
