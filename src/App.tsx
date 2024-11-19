import React, { useEffect, useState } from 'react';
import './App.css';
import './custom.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
import { AuthWrapper } from './AuthWrapper';

function App() {
  const [user, setUser] = useState<string | null>(localStorage.getItem("username"));

  const onLoginSuccess = (username: string) => {
    setUser(username);
  };
  
  const handleLogout = () => setUser(null);

  return (
    <Router>
      <CartProvider>
        <AuthWrapper user={user} onLogin={onLoginSuccess} onLogOut={handleLogout} />
      </CartProvider>
    </Router>
  );
}

export default App;
