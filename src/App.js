import React, { useState, useEffect } from "react";
import "./css/App.css";
import { Routes, Route } from "react-router-dom";
// <------------------------Layout------------------------>
import NavbarAdmin from "./layout/NavbarAdmins";
import NavbarIndex from "./layout/NavbarIndex";
import Footer from "./layout/footer";

// ---------------------------------------------------------------------------------------------------------------------------------

// <------------------------Pages ------------------------->
import { RouteAdmin } from "./pages/RouterAdmin";
import { RouteUser } from "./pages/RouterUser";
import { firebaseAuth, firebaseDB } from "./server/firebase";
import Spinner from 'react-bootstrap/Spinner'
import { RouteNoLogin } from "./pages/RouterNoLogin";
// import { BrowserRouter } from "react-router-dom";


// -------------------------------------------------------END IMPORT-----------------------------------------------------------------

function App() {
  const [admin, setAdmmin] = useState()
  useEffect(() => {
    firebaseAuth.onAuthStateChanged((users) => {
      if (users !== null) {
        firebaseDB
          .child("Users")
          .child(users.uid.toString())
          .child("type")
          .on("value", (snapshot) => {
            if (snapshot.val() !== null) {
              return setAdmmin(snapshot.val());
            } else {
              return setAdmmin("NoLogin");
            }
          });
      } else {
        setAdmmin("NoLogin");
      }
    });
  }, [admin]);

  return (
    <div>
      {admin === "Admin" ? (
        <div>
          <NavbarAdmin />
          <Routes>
            {RouteAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
        </div>
      ) : admin === "User" ? (
        <div>
          <NavbarIndex />
          <Routes>
            {RouteUser.map(({ path, element }, keys) => {
              return <Route index path={path} element={element} key={keys} />;
            })}
          </Routes>
          <Footer />
        </div>
      ) :admin === "NoLogin" ?(
        <div>
            <NavbarIndex />
          <Routes>
            {RouteNoLogin.map(({ path, element }, keys) => {
              return <Route index path={path} element={element} key={keys} />;
            })}
          </Routes>
          <Footer />
        </div>
      ): (
        <div className="wait-spinner" >
      <Spinner  animation="border"  />
    </div>
  )
}
    </div >
  );


}

export default App;
