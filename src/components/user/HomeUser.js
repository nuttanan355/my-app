import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../server/firebase";
import "../../css/pages.css";
import "../../css/home.css";
import "../../css/style.css";
import NavLink from "../../layout/NavLink";
import ShowDataUserRecom from "../user/ShowDataUserRecom";
import ShowDataUser from "../user/ShowDataUser";
import * as AiIcons from "react-icons/ai";
import { GrouprData } from "../../client/GroupData";
import Welcome from "../user/Welcome";
import Search from "../user/Search";
import { NavMenu } from "../../client/NavMenu";
import { NavMenuNoLogin } from "../../client/NavMenuNoLogin";
import { Link } from "react-router-dom";
import { Carousel, CarouselItem } from "react-bootstrap";

function HomeUser() {
  const [values, setValues] = useState({});
  useEffect(() => {
    firebaseDB.child("ADS").on("value", (snapshot) => {
      if (snapshot.val !== null) {
        setValues({ ...snapshot.val() });
      } else {
        setValues({});
      }
    });
  }, []);

  console.log(values);

  return (
    <div className="default-bg">
      <div>
        <div
          style={{ textAlign: "center", marginTop: "20px" }}
        >
          {/* <div
            style={{
              textAlign: "center",
              border: "2px solid black",
              boxShadow: "2px 2px 3px gray",
            }}> */}

          <Carousel variant="light">
            {Object.keys(values).map((url, i) => (
              <Carousel.Item key={i} >
                <img
                  style={{ width: "100%" }}
                  src={values[url]}
                  alt="1500*500"

                />
              </Carousel.Item>
            ))}
          </Carousel>

        </div>
      </div>
      <br />

      <div

        style={{
          background: "white",
          boxShadow: "0px 0px 2px lightgray",
          paddingLeft: "100px",
          paddingRight: "100px"
        }}
      >
        <h2
          style={{
            position: "absolute",
            paddingTop: "20px",
            color: "orange",
            fontSize: "25px",
          }}
        >
          <AiIcons.AiFillStar style={{ color: "orange", fontSize: "20px" }} />{" "}
          ?????????????????????????????????????????????????????????????????????
        </h2>
        <ShowDataUserRecom />
      </div>

      <div style={{ marginTop: "30px" ,backgroundImage: "linear-gradient(to right, rgb(83, 226, 171), rgb(78, 208, 248))", paddingTop:"50px", paddingBottom:"50px"}}>
        <div>
          <div
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              background: "white",
              borderRadius: "15px",
              boxShadow: "0px 0px 2px lightgray",
            }}
          >
            <h2
              style={{
                paddingLeft: "50px",
                paddingTop: "50px",
                color: "orange",
                fontSize: "25px",
              }}
            >
              ????????????????????????
            </h2>
            <div className="slide-container" style={{height:"280px"}}>
              <section
                id="slider"
                style={{
                  paddingTop: "0px",
                  marginBottom: "50px",
                  height: "200px",
                  
                }}
              >
                {GrouprData.map((item, index) => {
                  return (
                    <div key={index}>
                      <a className="btn" href={item.path}>
                        <button
                          className="btn circle-btn btn-type flex-item"
                          style={{
                            width: "12vw",
                            fontSize: "1vw",
                            background: "white",
                            height: "120px",
                            marginBottom:"0px",
                          }}
                        >
                          {item.icon} <div>{item.title}</div>
                        </button>
                      </a>
                    </div>
                  );
                })}
              </section>
            </div>
          </div>
          <div
            className="mt-3 p-5"
            style={{
              marginLeft: "50px",
              marginRight: "50px",
              background: "white",
              borderRadius: "15px",
              boxShadow: "0px 0px 2px lightgray",
            }}
          >
            <h2>????????????????????????????????????</h2>
            <ShowDataUser />
          </div>
        </div>
      </div>
      {/* <div style={{height:"200px"}}></div> */}
    </div>
  );
}

export default HomeUser;
