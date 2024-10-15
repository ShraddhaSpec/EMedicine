import React from 'react';
import logo from './logo.svg';
import CartItems from './pages/CartItems';
import './App.css';
import { Home } from './pages/Home';
import Login from './pages/login';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Login />
      <CartItems/>
    </div>

  );
}

export default App;
