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
// import { BrowserRouter } from "react-router-dom";


// -------------------------------------------------------END IMPORT-----------------------------------------------------------------

function App() {
  const [admin, setAdmmin] = useState(false)
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async(users) => {
      try{         firebaseDB
        .child("Users")
        .child(users.uid.toString())
        .child("type")
        .on("value", (snapshot) => {
          if (snapshot.val() === "Admin") {
            setAdmmin(true);
          } else {
          }
        }); }catch(error){
        console.error(error);
      }
    });
  }, []);

  return (
    <div>
      
      {admin ? (
        <div>
          <NavbarAdmin />
          <Routes>
            {RouteAdmin.map(({ path, element }, key) => {
              return <Route index path={path} element={element} key={key} />;
            })}
          </Routes>

        </div>
      ) : (
        <div>
          <NavbarIndex />
          <Routes>
            {RouteUser.map(({ path, element }, keys) => {
              return <Route index path={path} element={element} key={keys} />;
            })}
          </Routes>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
