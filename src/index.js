import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/footer.css';
import App from './App';
import Footer from "./components/user/footer"

ReactDOM.render(
  <React.StrictMode >
    <App />
    <Footer/>
  </React.StrictMode>,
  document.getElementById('root')
);

