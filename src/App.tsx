import React from 'react';
import logo from './logo.svg';
import CartItems from './pages/CartItems';
import './App.css';
import { Home } from './pages/Home';
import Login from './pages/login';
import { Header } from './components/user/Header';
import Signup from './pages/signup';
import { ProductDetails } from './components/user/ProductDetails';
import PlaceOrder from './pages/PlaceOrder';

function App() {
  return (
    <div >
      <Header />
      <div className=''>
        <div className="main-container">
         {/* <Home /> */}
         {/* <ProductDetails /> */}
         {/* <CartItems/> */}
        </div>
      </div>
      {/* <Login /> */}
      {/* <Signup /> */}

      <PlaceOrder/>
    </div>

  );
}

export default App;
