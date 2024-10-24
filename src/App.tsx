import React from 'react';
import './App.css';
import './custom.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartItems from './pages/user/CartItems';
import { Home } from './pages/user/Home';
import Login from './pages/login';
import { Header } from './components/Header';
import { MyOrders } from './pages/user/MyOrders';
import PrivateRoute from './components/PrivateRoute';
import { ProductDetails } from './pages/user/ProductDetails';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Signup from './pages/Signup';
import { Profile } from './pages/user/Profile';

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
      <div className= {user ? 'main-container' : ''}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute roles={['user','admin']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/cartitem" element={<CartItems />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/productDetails" element={<ProductDetails />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
