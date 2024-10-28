import React, { useEffect, useState } from 'react';
import './App.css';
import './custom.css';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import { Medicines } from './pages/admin/Medicines';
import { Customers } from './pages/admin/Customers';
import { Orders } from './pages/admin/Orders';

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
  const { user, setUser } = useAuth();
  // const [isAuthenticated, setIsAuthenticated] = useState(false);


  // useEffect(() => {
  //   const token = localStorage.getItem('token');

  //   if (token) {

  //     const role = localStorage.getItem('role') || '';
  //     // console.log("role =>",role)
  //     setUser({ role: role });
  //   }
  // }, [setUser]);


  return (
    <div>
      {user && user.role && user.role !== null && <Header />}
      <div className={user && user.role && user.role !== null ? 'main-container' : ''}>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute roles={['user', 'admin']} />}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartItems />} />
            <Route path="/cartitem" element={<CartItems />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/productDetails" element={<ProductDetails />} />


            <Route path="/medicines" element={<Medicines />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
          {/* <Route path="*" element={<Navigate to="/" />} /> */}

        </Routes>

      </div>
    </div>
  );
}
export default App;
