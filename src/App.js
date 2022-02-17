import React from "react";
import './css/App.css';
import Navbar from './navigation/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import ManClothes from "./groupr/ManClothes";
import WomanClothes from "./groupr/WomanClothes"
import Bag from "./groupr/Bag";



function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/manClothes' component={ManClothes} />
          <Route path='/womanClothes' component={WomanClothes}/>
          <Route path='/bag' component={Bag} />
        
        </Switch>
        {/* <BottomNavBar /> */}
      </Router>
  );
}


export default App;
