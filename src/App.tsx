import React from 'react';
import logo from './logo.svg';
import CartItems from './pages/CartItems';
import './App.css';
import { Home } from './pages/Home';
import Login from './pages/login';
import { Header } from './components/user/Header';

function App() {
  return (
    <div >
      <Header />
      <div className='App'>
        <div className="main-container">
         <Home />
        </div>
      </div>
      {/* <Login /> */}
    </div>

  );
}

export default App;
