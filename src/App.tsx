import React from 'react';
import './App.css';
import './custom.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import CartItems from './pages/user/CartItems';
import { Home } from './pages/user/Home';
import Login from './pages/login';
import { Header } from './components/user/Header';
import { MyOrders } from './pages/user/MyOrders';
import PlaceOrder from './pages/PlaceOrder';
import PrivateRoute from './components/PrivateRoute';
import { ProductDetails } from './pages/user/ProductDetails';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Signup from './pages/Signup';

function App() {
  return (
    <div >
      <AuthProvider >

      <Router>
        <AuthWrapper />
      </Router>
    
     
      </AuthProvider>
    </div>
   
  );
}
const AuthWrapper: React.FC = () => {
  const { user } = useAuth();

  console.log("user=>",user)

  return (
    <div>
      {user && <Header />}
      <div className='main-container'>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute roles={['user','admin']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/cartitem" element={<CartItems />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
