import React from 'react';
import './App.css';
import CreateAccount from './CreateAccount';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {};
  }

  onChange(toRender) {
    this.props.onChange(toRender);
  }

  render() {
    return (
      <div className='Login'>
        <form className='Login-form'>
          <div className='Login-element'>
            <label htmlFor="user">
              Utilizator
            </label>
            <div className='Login-password'>
              <input type="text" name="user" />
            </div>
          </div>
          <div>
            <label htmlFor="pass">
              Parola
            </label>
            <input type="password" name="pass" />
          </div>
        </form>
        <div>
              Nu aveti cont? <span onClick={() => this.onChange('Signup')} className="Create-account-text">Creati un cont.</span>
        </div>
      </div>
    );
  }
}

export default Login;
//asdasd
