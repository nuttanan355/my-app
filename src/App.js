import React from "react";
import './css/App.css';
import NavbarIndex from './navigation/navbar_index';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ManClothes from "./pages/ManClothes";
import WomanClothes from "./pages/WomanClothes"
import Bag from "./pages/Bag";
import AddNewProduct from "./seller/AddNewProduct";
import EditNewProduct from "./seller/EditNewProduct";
import ViewNewProduct from "./seller/ViewNewProduct"
import NavbarSeller from './navigation/navbar_seller'
// import formAddNewProduct from "./components/formAddNewProduct";


function App() {
  return (
    <Router>
        <NavbarIndex />
        {/* <NavbarSeller /> */}
        <AddNewProduct />
        <Home />
        <Switch>
         <Route path={"/EditData/:id"} component={EditNewProduct} />
         <Route path={"/ViewData/:id"} component={ViewNewProduct} />
        {/* <Route path='/' exact component={AddNewProduct} /> */}
          {/* <AddNewProduct /> */}
          {/* <formAddNewProduct /> */}
          {/* <Route path='/' exact component={Home} />
          <Route path='/manClothes' component={ManClothes} />
          <Route path='/womanClothes' component={WomanClothes}/>
          <Route path='/bag' component={Bag} /> */}
        
        </Switch>
      
      </Router>
  );
}


export default App;
