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
            if (snapshot.val() === "Admin") {
              return setAdmmin(true);
            } else {
              return setAdmmin(false);
            }
          });
      } else {
        setAdmmin(false);
      }
    });
  }, [admin]);

  return (
    <div>
      {admin === true ? (
        <div>
          <NavbarAdmin />
          <Routes>
            {RouteAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>
        </div>
      ) : admin === false ? (
        <div>
          <NavbarIndex />
          <Routes>
            {RouteUser.map(({ path, element }, keys) => {
              return <Route index path={path} element={element} key={keys} />;
            })}
          </Routes>
          <Footer />
        </div>
      ) : (
        <div className="wait-spinner" >
      <Spinner  animation="border"  />
    </div>
  )
}
    </div >
  );


}

export default App;
