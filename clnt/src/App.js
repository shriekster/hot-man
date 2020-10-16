import React from 'react';
import logo from './logo.svg';
import Login from './Login';
import './App.css';

function App(props) {
  return (
    <div className="Main">
      <div className="Intro">
        <button className="Auth-button">Autentificare</button>
        <button className="Create-button">Creare cont</button>
      </div>
    </div>
  );
}

export default App;
