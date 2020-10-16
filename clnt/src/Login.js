import React from 'react';
import './App.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return (
      <form>
        <label for="user">
          Utilizator:
        <label>
          <input type="text" name="user" />
        </label>
        
          Parola:
          <input type="password" name="pass" />
        </label>
        <label>
          Nu aveti cont?
        <button>
          Creare cont
        </button>
        </label>
      </form>
    );
  }
}

export default Login;
