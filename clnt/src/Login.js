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
      remember: 'no',
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

      case 'remember': {
        this.setState({
          remember: e.target.checked ? 'yes' : 'no'
        });
        break;
      }
    }
  }

  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (e.target.value.length > 64) {
      if(charCode !== 8 && charCode !== 9 && 
         charCode !== 17 && charCode !== 46 && 
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
    let remember = this.state.remember;

    let credentials = {
      user: user,
      pass: pass,
      remember: remember,
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
        console.log(login.status)

        if (login.status === 'allowed') {
          this.props.onChange('Main')
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
      <div className='Form'>
        <form 
          onSubmit={this.handleSubmit}
          autoComplete='off'
          autoCorrect='off'>
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
                  onKeyDown={this.onGenericKeyDown}
                  className='fixed-height'
                  type='text' 
                  name='user'
                  id='user'
                  placeholder='Introdu numele de utilizator'
                  onInput={this.onInput}
                  />
                </span>
              </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <PasswordInput
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
          Nu ai cont? <span onClick={() => this.props.onChange('Signup')} className='Form-hint bold glow'>Creează un cont</span>.
        </div>
      </div>
    );
  }
}

export default Login;
