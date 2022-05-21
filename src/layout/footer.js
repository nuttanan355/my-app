import React, { useEffect, useState } from "react";
import { firebaseAuth } from "../server/firebase";
import "../css/pages.css";
import "../css/home.css";
import "../css/style.css";
import "../css/footer.css";
import { NavMenu } from "../client/NavMenu";
import { NavMenuNoLogin } from "../client/NavMenuNoLogin";
import { Link } from "react-router-dom";

function Footer() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  return (
    <footer className="site-footer" >
      <div className="container" >
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <hr />
            <p className="text-justify" >
              มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ
              1518 ถนนประชาราษฎร์ 1 แขวงวงศ์สว่าง เขตบางซื่อ
              กรุงเทพมหานคร 10800
            </p>
            <br />
            <h6>Contact</h6>
            <hr />
            <p className="text-justify">
              โทรศัพท์ : 0-2555-2000
            </p>
            <p className="text-justify">
              แฟกซ์ : 0-2587-4350
            </p>
            <p className="text-justify">
              อีเมลติดต่อ : contact@op.kmutnb.ac.th
            </p>
          </div>

          <div className="col-xs-6 col-md-3">
            {/* <h6>Services</h6>
            <ul className="footer-links">
              <li><button className='footer-nav' onClick={() => window.location.href = '/product'} style={{ fontFamily: "Gill Sans, sans-serif" }}>Payment</button></li>
              <li><button className='footer-nav' onClick={() => window.location.href = '/category'} style={{ fontFamily: "Gill Sans, sans-serif" }}>Category</button></li>
              <li><button className='footer-nav' onClick={() => window.location.href = '/cart'} style={{ fontFamily: "Gill Sans, sans-serif" }}>Cart</button></li>
              <li><button className='footer-nav' onClick={() => window.location.href = '/report'} style={{ fontFamily: "Gill Sans, sans-serif" }}>Report</button></li>
              <li><button
               className='footer-nav' onClick={() => window.location.href = '/contact'} style={{ fontFamily: "Gill Sans, sans-serif" }}>Contact</button></li>
            </ul> */}
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Page</h6>
            {user ? (
              <ul className="footer-links" >
                {NavMenu.map((item, index) => {
                  return (
                    <li key={index}><button className='footer-nav' onClick={() => window.location.href = (item.path)} style={{ fontFamily: "Gill Sans, sans-serif" }}>{item.title}</button></li>
                  );
                })}


              </ul>
            ) : (


              <ul className="footer-links" >


                {NavMenuNoLogin.map((item, index) => {
                  return (
                    <li key={index} ><button className='footer-nav' onClick={() => window.location.href = (item.path)} style={{ fontFamily: "Gill Sans, sans-serif" }}>{item.title}</button></li>
                  );
                })}


              </ul>


            )}
          </div>

        </div>
        <hr />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text" style={{ fontSize: "18px", fontFamily: "Gill Sans, sans-serif" }}>Copyright &copy; 2022 King Mongkut's University of Technology North Bangkok
            </p>
          </div>
          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">

              <img className="btn" style={{ height: "50px", marginLeft: "20px" }} src="../img/logo.png" onClick={() => { window.location.href = '/' }} />

            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;