import React from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input'
import PasswordInput from './PasswordInput'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/red-material.css'
import 'tippy.js/themes/blue-material.css'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.onInput = this.onInput.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: '',
      pass: '',
      remember: 'no',
      errorMessage: ''
    };
  }

  onInput(e) {
    switch(e.target.id) {

      case 'user': {
        this.setState({
          user: e.target.value
        });
        break;
      }

      case 'pass': {
        this.setState({
          pass: e.target.value
        });
        break;
      }

      case 'remember': {
        this.setState({
          remember: e.target.checked ? 'yes' : 'no'
        });
        break;
      }
    }
  }

  onChange(toRender) {
    this.props.onChange(toRender);
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    };

    fetch('http://localhost:3001/login', requestOptions)
        .then(response => response.json())
        .then(login => {
          console.log(login.status)
          if (login.status === 'allowed') {
            this.onChange('Main')
          } else {
            this.setState({
              errorMessage: 'Utilizatorul / parola greșit(ă)!'
            })
          }
        });
  }

  render() {
    return (
      <div className='Form'>
        <form onSubmit={this.handleSubmit}>
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
            </label>
            <div className='Form-name'>
              <Input 
               type='text' 
               name='user'
               id='user'
               placeholder='Introdu numele de utilizator'
               onInput={this.onInput}
              />
            </div>
          </div>
          <PasswordInput
            onInput={this.onInput} />
          <div className='Form-field'>
            <Input 
              className='Form-remember'
              type='checkbox' 
              name='remember'
              id='remember'
              value='yes'
              onInput={this.onInput}
             />
            <label htmlFor='remember'>
              Ține-mă minte
            </label>
          </div>
          <div className='Form-field'>
            <button>Conectează-te</button>
          </div>
          <div className='Form-field'>
            {this.state.errorMessage}
          </div>
        </form>
        <div className='Form-field Form-text centered-text'>
          Nu ai cont? <span onClick={() => this.onChange('Signup')} className='Form-hint'>Creează un cont</span>.
        </div>
      </div>
    );
  }
}

export default Login;
