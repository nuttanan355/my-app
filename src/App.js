import React from "react";
import './css/App.css';
import BottomNavBar from "./navigation/BottomNavBar";
import Navbar from './navigation/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import Products from "./pages/Products";

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/reports' component={Reports} />
          <Route path='/products' component={Products} />
          {/* <Route path='' component={}/> */}
        </Switch>
        {/* <BottomNavBar /> */}
      </Router>
  );
}


export default App;