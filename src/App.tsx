import React from 'react';
import logo from './logo.svg';
import CartItems from './pages/user/CartItems';
import './App.css';
import { Home } from './pages/user/Home';
import Login from './pages/login';
import { Header } from './components/user/Header';
import Signup from './pages/Signup';
import { ProductDetails } from './pages/user/ProductDetails';

function App() {
  return (
    <div >
      <Header />
      <div className=''>
        <div className="main-container">
         {/* <Home /> */}
         <ProductDetails />
        </div>
      </div>
      {/* <Login /> */}
      {/* <Signup /> */}
    </div>

  );
}

export default App;
