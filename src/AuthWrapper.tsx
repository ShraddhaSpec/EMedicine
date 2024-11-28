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
import { Customers } from './pages/admin/Customers';
import { Orders } from './pages/admin/Orders';
import PlaceOrder from './pages/user/PlaceOrder';
import AdminHome from './pages/admin/AdminHome';
import MedicineManage from './pages/admin/MedicineManage';

interface AuthWrapperProps {
    user: string | null;
    userRole: 'user' | 'admin' | null;
    onLogin: (username: string,role:string) => void;
    onLogOut: () => void; // Add this
  }

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ user,userRole, onLogin, onLogOut }) => {
  // console.log("acnakcnjcj",user)
    return (
      <div>
        {user && <Header onLogOut={onLogOut} />}
        <div className={user ? 'main-container' : ''}>
          <Routes>
            {user ? (
              <Route element={<PrivateRoute roles={['user', 'admin']} />}>
                <Route path="/" index element={userRole === 'admin' ? <AdminHome /> : <Home />} />
                <Route path="/home" index element={<AdminHome />} />
                <Route path="/cart" element={<CartItems />} />
                <Route path="/cartitem" element={<CartItems />} />
                <Route path="/myorders" element={<MyOrders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/productDetails/:id" element={<ProductDetails />} />
                <Route path="/placeorder" element={<PlaceOrder />} />
                {userRole === 'admin' && (
                <>
                <Route path="/medicines" element={<MedicineManage />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/orders" element={<Orders />} /> 
                </>
                )}
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
