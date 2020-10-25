import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';

ReactDOM.render(
  <React.StrictMode>
    <App logIn={false}/>
  </React.StrictMode>,
  document.getElementById('root')
);

