import React from 'react';
import './App.css';
import './custom.css';
import logo from './logo.svg';
import CartItems from './pages/user/CartItems';
import { Home } from './pages/user/Home';
import Login from './pages/login';
import { Header } from './components/user/Header';
import { MyOrders } from './pages/user/MyOrders';
import Signup from './pages/Signup';
import PlaceOrder from './pages/PlaceOrder';
import { ProductDetails } from './pages/user/ProductDetails';

function App() {
  return (
    <div >
      <Header />
      <div className=''>
        <div className="main-container">
         {/* <Home /> */}
         {/* <ProductDetails /> */}
         <MyOrders />
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
