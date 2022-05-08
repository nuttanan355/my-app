import React from "react";
import "../../css/pages.css";
import "../../css/home.css";
import "../../css/style.css";
import ShowDataUser from "../user/ShowDataUser";
import * as AiIcons from "react-icons/ai";
import { GrouprData } from "../../client/GroupData";
import Welcome from "../user/Welcome";
import Search from "../user/Search";
// import {firebaseDB} from "./components/firebase";
// import { Link } from "react-router-dom";
// import { useState,useEffect } from "react";

function HomeUser() {
  return (
    <div className="container mx-auto">
      <Search />

      <div className="container" style={{ background: "white", borderRadius: "15px 15px 15px 15px", border: "2px solid black", boxShadow: "4px 4px 3px #454545" }}>
        <h2 style={{ padding: "3%", color: "orange" }}>
          <AiIcons.AiFillStar style={{ color: "orange", fontSize: "90%" }} />{" "}
          สินค้าที่ได้รับความนิยม
        </h2>
        <ShowDataUser />
        <br />
      </div>
      <br />
      <br />
      <br />
      <div className="col">
        <h3>หมวดหมู่</h3>
        <hr />
        <div className="frame">
          {GrouprData.map((item, index) => {
            return (
              <a key={index} href={item.path}>
                <div className="btn" style={{ textAlign: "center" }}>
                  <button
                    className="btn circle-btn btn-type"
                    style={{
                      width: "300px",
                      background: "white",
                      marginBottom: "7px",
                      marginTop: "7px",
                    }}
                  >
                    {item.icon} <div>{item.title}</div>
                  </button>
                </div>
              </a>
            );
          })}
        </div>
      </div>
      <div >
     
      </div>


    </div>
  );
}

export default HomeUser;
