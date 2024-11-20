import React, { useEffect, useState } from 'react';
import './App.css';
import './custom.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { AuthWrapper } from './AuthWrapper';

function App() {
  const storedRole = localStorage.getItem("role");
  const validRole: 'user' | 'admin' | null = 
    storedRole === 'user' || storedRole === 'admin' ? storedRole : null;
  const [user, setUser] = useState<string | null>(localStorage.getItem("username"));
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(validRole);

  const onLoginSuccess = (username: string,role:string) => {
    if (role === 'user' || role === 'admin') {
   
      setUser(username);
      setUserRole(role);
  
   
    } else {
      console.error("Invalid role received:", role);
    }
  };
  
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <CartProvider>
        <AuthWrapper user={user} userRole= {userRole} onLogin={onLoginSuccess} onLogOut={handleLogout} />
      </CartProvider>
    </Router>
  );
}

export default App;
