import React from 'react';
import logo from './logo.svg';
import CartItems from './pages/CartItems';
import './App.css';
import { Home } from './pages/Home';
import Login from './pages/login';


function App() {
  return (
    <div className="App">
      
      <Login />
      <CartItems/>
    </div>

  );
}

export default App;
