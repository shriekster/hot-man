import React from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input'
import PasswordInput from './PasswordInput'


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: '',
      pass: '',
      showError: false,
      showUserWarning: false,
      showPassWarning: false
    };
  }

  onInput(e) {
    this.setState({
      showError: false,
      showUserWarning: false,
      showPassWarning: false
    });

    switch(e.target.id) {

      case 'user': {
        this.setState({
          user: e.target.value.trim()
        });
        break;
      }

      case 'pass': {
        this.setState({
          pass: e.target.value
        });
        break;
      }
    }
  }

  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (e.target.value.length > 63) {
      if(charCode !== 8 && charCode !== 9 && 
         charCode !== 17 && charCode !== 46 && charCode !== 13 &&
         !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = this.state.user;
    let pass = this.state.pass;

    let credentials = {
      user: user,
      pass: pass,
    };

    let valid = (user !== '' && pass !== '');

    if (valid) {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      };

      fetch('http://localhost:3001/login', requestOptions)
      .then(response => response.json())
      .then(login => {

        if (login.status === 'allowed') {
          this.props.onChange('Main', login.token, login.user);
        } else {
          this.setState({
            showError: true
          })
        }
      });
    } else {
      if (user === '') {
        this.setState({
          showUserWarning: true
        });
      }

      if (pass === '') {
        this.setState({
          showPassWarning: true
        });
      }
    }
  }

  render() {
    return (
      <div className='Form-login'>
        <form 
          onSubmit={this.handleSubmit}
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}>
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
            </label>
            <div className='Form-name'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-exclamation-circle'></i> Introdu utilizatorul
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                visible={this.state.showUserWarning}>
                <span className='legacy' tabIndex='0'>
                  <Input
                  tabIndex='1'
                  onKeyDown={this.onGenericKeyDown}
                  className='fixed-height'
                  type='text' 
                  name='user'
                  id='user'
                  placeholder='Introdu numele de utilizator'
                  onInput={this.onInput}
                  autoFocus={true}/>
                </span>
              </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <PasswordInput
              tabIndex='2'
              onKeyDown={this.onGenericKeyDown}
              onInput={this.onInput} 
              displayWarning={this.state.showPassWarning}
              displayError={false}
              eyeOffset={[0 + 25 * this.state.showPassWarning, 20]}
              eyePlacement={this.state.showPassWarning ? 'right-start' : 'right'}
              eyeArrow={true}
              displayRolWarning={false}/>
          </div>
          <div className='Form-field'>
            <span onClick={() => this.props.onChange('Forgot')} className='Form-hint-forgot bold glow'>Ai uitat parola?</span>
          </div>
          <div className='Form-field'>
          <Tippy
            allowHTML={true}
            content={
              <>
              <i className='fas fa-minus-circle'></i> Ai introdus greșit utilizatorul sau parola
              </>
            }
            placement='bottom'
            arrow={false}
            theme='red-material-warning'
            visible={this.state.showError}>
              <button>Conectează-te</button>
            </Tippy>
          </div>
        </form>
        <div className='Form-field Form-text centered-text'>
          <div className='Form-inner-text'>Nu ai cont?</div>
          <Tippy
            content='Creează cont'
            placement='right'
            offset={[0, 20]}
            theme='material-signup-hints'>
            <div onClick={() => this.props.onChange('Signup')} className='Form-hint-signup bold glow-green'>
              <i className='fas fa-user-plus -user-icon-signup'></i>
            </div>
          </Tippy>
        </div>
      </div>
    );
  }
}

export default Login;
