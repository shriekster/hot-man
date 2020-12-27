import React, { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input'
import PasswordInput from './PasswordInput'
import Countdown from './Countdown'

function User(props) {
  return (
    <>
    <div className='Form-field --zoom-in'>
      <label htmlFor='user'>
        Utilizator
      </label>
      <div className='Form-name '>
        <Tippy
          content={
            <>
              <i className='fas fa-exclamation-circle'></i> Introdu numele de utilizator
            </>
          }
          allowHTML={true}
          placement='right'
          arrow={false}
          theme='red-material-warning'
          visible={props.showUserWarning}>
          <span className='legacy' tabIndex='0'>
            <Input
            onKeyDown={props.onGenericKeyDown}
            className='fixed-height'
            type='text' 
            name='user'
            id='user'
            placeholder='Introdu numele de utilizator'
            onInput={props.onInput}
            autoFocus={true}/>
          </span>
        </Tippy>
      </div>
    </div>
    </>
  );
}

function PlaceOfBirth(props) {
  return (
    <>
    <div className='Form-field --zoom-in'>
      <label htmlFor='pob'>
        Locul nașterii
      </label>
      <div className='Form-name'>
        <Tippy
          content={
            <>
              <i className='fas fa-exclamation-circle'></i> Introdu locul nașterii
            </>
          }
          allowHTML={true}
          placement='right'
          arrow={false}
          theme='red-material-warning'
          visible={props.showPobWarning}>
          <span className='legacy' tabIndex='0'>
            <Input
            onKeyDown={props.onGenericKeyDown}
            className='fixed-height'
            type='text' 
            name='pob'
            id='pob'
            placeholder='Introdu locul nașterii'
            onInput={props.onInput}
            autoFocus={true}/>
          </span>
        </Tippy>
      </div>
    </div>
    </>
  );
}


function Secret(props) {
  return (
    <>
    <div className='Form-field --zoom-in'>
    <Countdown 
      timeout={props.timeout}
      updateTimeout={props.updateTimeout}/>
    <PasswordInput
      onInput={props.onInput}
      onKeyDown={props.onGenericKeyDown}
      
      asterisk={false}
      displayWarning={props.showNewPassWarning}
      displayInfo={props.showNewPassInfo}
      displayError={false}
      eyeOffset={[0 + 25 * props.showNewPassWarning, 20]}
      eyePlacement={props.showNewPassWarning ? 'right-start' : 'right'}
      eyeArrow={true}
      autoFocus={true}
      label={props.passLabel}
      placeholder={props.passPlaceholder}/>
    </div>
    </>
  );
}

function Message(props) {
  return (
    <>
    <div className='Form-field --zoom-in'>
      <div className='--reset-message'>
        <div className='--message-content --succeeded'>
          <span>Parola ta a fost resetată, </span>
          <span className='--reset-user'>{props.user}</span>
          <span>.</span>
        </div>
      </div>
      <button onClick={() => { props.onChange('Login') }}>
        Conectează-te
      </button>
    </div>
    </>
  );
}

function Expired(props) {
  return (
    <div className='Form-field --zoom-in'>
      <div className='--reset-message'>
        <div className='--message-content --failed'>
          Timpul a expirat, te rugăm să încerci din nou.
        </div>
      </div>
      <button className='cancel-button' onClick={() => {props.onChange('Login')}}>
        OK
      </button>
    </div>
  );
}

class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.updateTimeout = this.updateTimeout.bind(this);

    this.state = {
      user: '',
      pob: '',
      newPass: '',

      validUser: false,
      validPob: false,
      validNewPass: false,


      showError: false,
      showUserWarning: false,
      showPobWarning: false,
      showNewPassWarning: false,

      showNewPassInfo: true,

      defaultComponent: User,

      time: 0,
      timeout: 120,

      buttonsHidden: false,
    };

    this.userRef = React.createRef();
    this.pobRef = React.createRef();
    this.newPassRef = React.createRef();
  }

  onInput(e) {
    switch(e.target.id) {

      case 'user': {
        this.setState({
          showError: false,
          showUserWarning: false,
          showPobWarning: false,
          showNewPassWarning: false,
          showNewPassInfo: true,

          user: e.target.value.trim()
        });
        break;
      }

      case 'pob': {
        this.setState({
          showError: false,
          showUserWarning: false,
          showPobWarning: false,
          showNewPassWarning: false,
          showNewPassInfo: true,

          pob: e.target.value.trim()
        });
        break;
      }

      case 'pass': {
        this.setState({
          showError: false,
          showUserWarning: false,
          showPobWarning: false,
          showNewPassWarning: false,
          showNewPassInfo: true,

          newPass: e.target.value.trim()
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
    let pob = this.state.pob;
    let newPass = this.state.newPass;


    if (!this.state.validUser) {
      if (user !== '') {
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user: user,
          })
        };

        fetch('http://localhost:3001/forgot/user', requestOptions)
        .then(response => response.json())
        .then(user => {
  
          if (user.status === 'allowed') {
            this.setState({
              validUser: true,
              defaultComponent: PlaceOfBirth,
            });
          } else {
            this.setState({
              showError: true
            })
          }
        });
      } else {
        this.setState({
          showError: false,

          showUserWarning: true,

          showPobWarning: false,
          showNewPassWarning: false,
          showNewPassInfo: true,
        });
      }
    } else
    if (!this.state.validPob) {
      if (pob !== '') {
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            loc: pob,
          })
        };

        fetch('http://localhost:3001/forgot/loc', requestOptions)
        .then(response => response.json())
        .then(pob => {
  
          if (pob.status === 'allowed') {
            this.setState({
              validPob: true,
              time: Math.floor(Date.now() / 1000),
              defaultComponent: Secret,
            });
          } else {
            this.setState({
              showError: true
            })
          }
        });
      } else {
        this.setState({
          showError: false,

          showUserWarning: false,
          
          showPobWarning: true,
          showNewPassWarning: false,
          showNewPassInfo: true,
        });
      }
    } else
    if (!this.state.validNewPass) {
      if (newPass !== '') {
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            newPass: newPass,
            time: Math.floor(Date.now() / 1000),
          })
        };

        fetch('http://localhost:3001/forgot/pass', requestOptions)
        .then(response => response.json())
        .then(pass => {
  
          if (pass.status === 'valid') {
            this.setState({
              validPass: true,
              buttonsHidden: true,
              defaultComponent: Message,
            });
          } else
          if (pass.status === 'invalid') {
            this.setState({
              showError: true,
            });
          } else
          if (pass.status === 'expired') {
            this.setState({
              validUser: false,
              validPob: false,
              validNewPass: false,

              defaultComponent: Expired,
            });
          } else {
            this.setState({
              showError: true
            })
          }
        });
      } else {
        this.setState({
          showError: false,

          showUserWarning: false,
          
          showPobWarning: false,
          showNewPassWarning: true,
          showNewPassInfo: true,
        });
      }
    }

   else {

    }
  }

  updateTimeout(updated) {
    if (updated > 0) {
      this.setState({
        timeout: updated,
      });
    } else 
    if (0 === updated) {
      this.setState({
        buttonsHidden: true,
        defaultComponent: Expired,
      })
    }
  }

  componentDidUpdate() {
  }

  render() {
    let Component = this.state.defaultComponent;

    return (
      <div className='Form-forgot'>
        <form 
          onSubmit={this.handleSubmit}
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}>
          <Component
            showUserWarning={this.state.showUserWarning}
            showPobWarning={this.state.showPobWarning}
            showNewPassWarning={this.state.showNewPassWarning}
            showNewPassInfo={this.state.showNewPassInfo}
            passLabel='Noua parolă'
            passPlaceholder='Introdu noua parolă'

            user={this.state.user}
            onChange={this.props.onChange}

            timeout={this.state.timeout}
            updateTimeout={this.updateTimeout}

            onKeyDown={this.onGenericKeyDown}
            onInput={this.onInput}/>
          {
            !this.state.buttonsHidden &&
          <div>
            <div className='Form-field'>
              <button type='submit' 
                className='continue-button'>Continuă</button>
            </div>
            <Tippy
              allowHTML={true}
              content={
                <>
                <i className='fas fa-minus-circle'></i> Textul introdus este invalid
                </>
              }
              placement='bottom'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showError}>
              <div className='Form-field'>
                <button onClick={() => {this.props.onChange('Login')}}
                    className='cancel-button'>Renunță</button>
              </div>
            </Tippy>
          </div>
          }
        </form>
      </div>
    );
  }
}

export default Forgot;
