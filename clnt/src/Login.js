import React from 'react';
import './App.css';
import CreateAccount from './CreateAccount';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <form className='Login-form'>
        <div className='Login-element'>
          <label for="user">
            Utilizator
          </label>
          <div className='Login-password'>
            <input type="text" name="user" />
          </div>
        </div>
        <div>
          <label for="pass">
            Parola
          </label>
          <input type="password" name="pass" />
        </div>
        <div>
            Nu aveti cont? <span onClick={this.props.onClick} className="Create-account-text">Creati un cont.</span>
        </div>
      </form>
    );
  }
}

export default Login;
//asdasd
