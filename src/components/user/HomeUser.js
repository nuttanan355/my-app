import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../../server/firebase";
import "../../css/pages.css";
import "../../css/home.css";
import "../../css/style.css";
import NavLink from "../../layout/NavLink";
import ShowDataUser from "../user/ShowDataUser";
import * as AiIcons from "react-icons/ai";
import { GrouprData } from "../../client/GroupData";
import Welcome from "../user/Welcome";
import Search from "../user/Search";
import { NavMenu } from "../../client/NavMenu";
import { NavMenuNoLogin } from "../../client/NavMenuNoLogin";
import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

function HomeUser() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <div className="default-bg">
      
      <div>
        {/* <Search /> */}
        <div className="container" style={{ width: "1500px", textAlign: "center", marginTop: "20px" }}>
          <div style={{ textAlign: "center", border: "2px solid black", boxShadow: "2px 2px 3px gray" }}>
            <Carousel variant="light" style={{ borderRadius: "15px" }} >
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
                  src="../../img/ads2.png"
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
            </Carousel>
          </div>
        </div>
        <br />
        <div className="container" style={{ background: "white", borderRadius: "15px 15px 15px 15px", boxShadow: "0px 0px 2px lightgray" }}>
          <h2 style={{ padding: "3%", color: "orange", fontSize: "25px" }} >
            <AiIcons.AiFillStar style={{ color: "orange", fontSize: "20px" }} />{" "}
            สินค้าที่ได้รับความนิยม 
          </h2>
          <ShowDataUser />
          <br />
        </div>
        <br />
        <div className="container">
          <div className="frame" style={{ marginBottom: "50px" }}>
            <div style={{ background: "white", borderRadius: "15px", width: "1500px", boxShadow: "0px 0px 2px lightgray" }}>
              <h2 style={{  paddingLeft: "50px",paddingTop: "50px", color: "orange", fontSize: "25px" }} >
                หมวดหมู่
              </h2>
              <div className="slide-container" >
                <section className="item-container" id="slider" style={{ paddingTop: "0px", marginBottom: "50px", height: "300px" }}>
                  {GrouprData.map((item, index) => {
                    return (
                      <div className="flexbox" key={index} >
                        <a className="btn"href={item.path}>
                          <button
                            className="btn circle-btn btn-type flex-item"
                            style={{
                              width: "12vw",
                              fontSize: "1vw",
                              background: "white",
                              marginRight: "20px",
                              marginLeft: "20px"
                            }}
                          >
                            {item.icon} <div>{item.title}</div>
                          </button>
                        </a>
                      </div>
                    );
                  })}
                </section >
              </div>
            </div>
          </div>
        </div>
        <div >
        </div>
      </div>
    </div >
  );
}

export default HomeUser;
