import React from "react";
import './css/App.css';
import Navbar from './navigation/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./Home";
import ManClothes from "./pages/ManClothes";
import WomanClothes from "./pages/WomanClothes"
import Bag from "./pages/Bag";
import AddNewProduct from "./seller/AddNewProduct";
import BottomNavBar from './navigation/BottomNavBar'
// import formAddNewProduct from "./components/formAddNewProduct";


function App() {
  return (
    <Router>
        {/* <Navbar /> */}
       
        <Switch>
        <Route path='/' exact component={AddNewProduct} />
          {/* <AddNewProduct /> */}
          {/* <formAddNewProduct /> */}
          {/* <Route path='/' exact component={Home} />
          <Route path='/manClothes' component={ManClothes} />
          <Route path='/womanClothes' component={WomanClothes}/>
          <Route path='/bag' component={Bag} /> */}
        
        </Switch>
        <BottomNavBar />
      </Router>
  );
}


export default App;
