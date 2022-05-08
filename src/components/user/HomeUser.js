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
import { Carousel } from "react-bootstrap";
function HomeUser() {
  return (
    <div className="container mx-auto">
      <Search />

      <div className="container" style={{ maxWidth: "1500px", textAlign: "center"}}>
        <div style={{ textAlign: "center", border: "2px solid black", boxShadow:"2px 2px 3px gray"  }}>
          <Carousel variant="light" style={{ borderRadius: "15px" }} >
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../../img/ads1.png"
                alt="1500*500"
                style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../../img/ads2.png"
                alt="1500*500"
                style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
              />

            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="../../img/ads3.jpg"
                alt="1500*500"
                style={{ minHeight: "200px", maxHeight: "500px", width: "1000px" }}
              />
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
      <br />
      <div className="container" style={{ background: "white", borderRadius: "15px 15px 15px 15px", border: "2px solid black", boxShadow: "4px 4px 3px #454545" }}>
        <h2 style={{ padding: "3%", color: "orange", fontSize: "25px" }} >
          <AiIcons.AiFillStar style={{ color: "orange", fontSize: "20px" }} />{" "}
          สินค้าที่ได้รับความนิยม <h2><hr /></h2>
        </h2>
        <ShowDataUser />
        <br />
      </div>
      <br />

      <br />
      <br />

      <div className="col">
        <h3 style={{ color: "white" }}>หมวดหมู่</h3>
        <hr style={{ border: "2px solid white" }} />
        <div className="frame">
          {GrouprData.map((item, index) => {
            return (
              <a key={index} href={item.path}>
                <div className="btn" style={{ textAlign: "center" }}>
                  <button
                    className="btn circle-btn btn-type"
                    style={{
                      width: "20vw",
                      fontSize: "1vw",
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
