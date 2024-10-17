import React from 'react';
import logo from './logo.svg';
import CartItems from './pages/CartItems';
import './App.css';
import { Home } from './pages/Home';
import Login from './pages/login';
import Signup from './pages/Signup';


function App() {
  return (
    <div className="App">
      
      {/* <Login /> */}
      <Signup />
      {/* <CartItems/> */}
    </div>

  );
}

export default App;
