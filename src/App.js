// import logo from "./logo.svg";
import "./App.css";
import BottomNavBar from "./components/BottomNavBar";
import ButtonAppBar from "./components/AppBar";

import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <ButtonAppBar />
        {/* <Route exact path="/">
          <AppBer />
        </Route> */}

        {/* <Route exact path="/">
          <BottomNavBar />
        </Route> */}
      </div>
    </Router>
  );
}


export default App;
