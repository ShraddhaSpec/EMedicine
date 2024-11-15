import React from 'react'
import {  Routes, Route, Navigate } from 'react-router-dom';
import CartItems from './pages/user/CartItems';
import { Home } from './pages/user/Home';
import Login from './pages/login';
import { Header } from './components/Header';
import { MyOrders } from './pages/user/MyOrders';
import PrivateRoute from './components/PrivateRoute';
import { ProductDetails } from './pages/user/ProductDetails';
import Signup from './pages/Signup';
import { Profile } from './pages/Profile';
import { Medicines } from './pages/admin/Medicines';
import { Customers } from './pages/admin/Customers';
import { Orders } from './pages/admin/Orders';
import PlaceOrder from './pages/user/PlaceOrder';

interface AuthWrapperProps {
    user: string | null;
    onLogin: (username: string) => void;
    onLogOut: () => void; // Add this
  }

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ user, onLogin, onLogOut }) => {
    return (
      <div>
        {user && <Header onLogOut={onLogOut} />}
        <div className={user ? 'main-container' : ''}>
          <Routes>
            {user ? (
              <Route element={<PrivateRoute roles={['user', 'admin']} />}>
                <Route path="/" index element={<Home />} />
                <Route path="/cart" element={<CartItems />} />
                <Route path="/cartitem" element={<CartItems />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/productDetails/:id" element={<ProductDetails />} />
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} /> 
                <Route path="/placeorder" element={<PlaceOrder />} />
              </Route>
            ) : (
              <>
                <Route path="/login"  element={<Login onLogin={onLogin} />} />
                <Route path="/signup" element={<Signup />} />
              </>
            )}
            <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
          </Routes>
  
        </div>
      </div >
    );
  }
