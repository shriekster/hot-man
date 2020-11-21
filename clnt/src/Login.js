import React from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input'
import PasswordInput from './PasswordInput'


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

    let user = this.state.user;
    let pass = this.state.pass;

    if (user !== '' && pass !== '') {
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
        <form onSubmit={this.handleSubmit}>
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
            </label>
            <div className='Form-name'>
              <Tippy
                hideOnClick={false}
                content={
                  <>
                    <i className='fas fa-exclamation-circle'></i> Introdu utilizatorul
                  </>
                }
                allowHTML={true}
                placement='bottom-start'
                arrow={false}
                theme='red-material-warning'
                visible={this.state.showUserWarning}>
                <span className='legacy' tabIndex='0'>
                  <Input 
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
              onInput={this.onInput} 
              displayWarning={this.state.showPassWarning}/>
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
            hideOnClick={false}
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
          Nu ai cont? <span onClick={() => this.onChange('Signup')} className='Form-hint bold'>Creează un cont</span>.
        </div>
      </div>
    );
  }
}

export default Login;
