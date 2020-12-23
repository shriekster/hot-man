import React from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input'
import PasswordInput from './PasswordInput'

function User(props) {
  return (
    <>
    <div className='Form-field'>
      <label htmlFor='user'>
        Utilizator
      </label>
      <div className='Form-name'>
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
            />
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
    <div className='Form-field --fade-in-left'>
      <label htmlFor='user'>
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
          visible={props.showPOBWarning}>
          <span className='legacy' tabIndex='0'>
            <Input
            onKeyDown={props.onGenericKeyDown}
            className='fixed-height'
            type='text' 
            name='user'
            id='user'
            placeholder='Introdu locul nașterii'
            onInput={props.onInput}
            />
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
    <div className='Form-field --fade-in-left'>
      <label htmlFor='user'>
        Secret
      </label>
      <div className='Form-name'>
        <Tippy
          content={
            <>
              <i className='fas fa-exclamation-circle'></i> Introdu secretul
            </>
          }
          allowHTML={true}
          placement='right'
          arrow={false}
          theme='red-material-warning'
          visible={false}>
          <span className='legacy' tabIndex='0'>
            <Input
            onKeyDown={props.onGenericKeyDown}
            className='fixed-height'
            type='text' 
            name='user'
            id='user'
            placeholder='Introdu secretul'
            onInput={props.onInput}
            />
          </span>
        </Tippy>
      </div>
    </div>
    </>
  );
}

class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      user: '',
      pob: '',
      newPass: '',



      showError: false,
      showUserWarning: false,
      showPOBWarning: false,

      defaultComponent: User,
    };
  }

  onInput(e) {
    this.setState({
      showError: false,
      showUserWarning: false,
      showPOBWarning: false
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
    let pob = this.state.pob;

    let credentials = {
      user: user,
      pob: pob,
    };

    let valid = (user !== '');

    if (valid) {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      };

      fetch('http://localhost:3001/forgot/test', requestOptions)
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
      /* TESTING */
      switch (this.state.defaultComponent) {
        case User: {
          this.setState({
            defaultComponent: PlaceOfBirth
          });
          break;
        }

        case PlaceOfBirth: {
          this.setState({
            defaultComponent: Secret
          });
          break;
        }
      }

      /* END OF TESTING */
      if (user === '') {
        this.setState({
          showUserWarning: true
        });
      }

      if (pob === '') {
        this.setState({
          showPobWarning: true
        });
      }
    }
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
          {/*
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
            </label>
            <div className='Form-name'>
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
          */}
          <Component
            showUserWarning={this.state.showUserWarning}
            onKeyDown={this.onGenericKeyDown}
            onInput={this.onInput}/>
          <div className='Form-field'>
            <button type='submit' 
              className='continue-button'>Continuă</button>
          </div>
          <Tippy
            allowHTML={true}
            content={
              <>
              <i className='fas fa-minus-circle'></i> Ai introdus greșit numele de utilizator
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
        </form>
      </div>
    );
  }
}

export default Forgot;
