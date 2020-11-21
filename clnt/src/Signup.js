import React from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input';
import PasswordInput from './PasswordInput';
import RequiredTippy from './RequiredTippy';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.onInput = this.onInput.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      cnp: '',
      grad: '',
      nume: '',
      prenume: '',
      user: '',
      pass: '',
      rol: '0',
      showCnpError: false,
      showUserError: false,
      showPassError: false,
      showCnpWarning: false,
      showGradWarning: false,
      showNumeWarning: false,
      showPrenumeWarning: false,
      showUserWarning: false,
      showPassWarning: false,
      showRolWarning: false,
      rolInfo: {
        '0': 'Selectează rolul pentru a vedea informațiile despre acesta',
        operator: 'Operator',
        manager: 'Manager'
      },
      rolIndex: '0',
      rolOffsetX: 10
    };
  }

  onInput(e) {

    this.setState({
      showCnpError: false,
      showUserError: false,
      showPassError: false,
      showCnpWarning: false,
      showGradWarning: false,
      showNumeWarning: false,
      showPrenumeWarning: false,
      showUserWarning: false,
      showPassWarning: false,
      showRolWarning: false,
      showRolInfo: false,
      rolOffsetX: 10
    });

    switch(e.target.id) {
      case 'cnp': {
        this.setState({
          cnp: e.target.value.trim()
        });
        break;
      }

      case 'grad': {
        this.setState({
          grad: e.target.value.trim()
        });
        break;
      }

      case 'nume': {
        this.setState({
          nume: e.target.value.trim()
        });
        break;
      }

      case 'prenume': {
        this.setState({
          prenume: e.target.value.trim()
        });
        break;
      }

      case 'user': {
        this.setState({
          user: e.target.value.trim()
        });
        break;
      }

      case 'pass': {
        this.setState({
          pass: e.target.value.trim()
        });
        break;
      }

      case 'rol': {
        this.setState({
          rol: e.target.value,
          rolIndex: e.target.value,
        });
        break;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let cnp = this.state.cnp;
    let grad = this.state.grad;
    let nume = this.state.nume;
    let prenume = this.state.prenume;
    let user = this.state.user;
    let pass = this.state.pass;
    let rol = this.state.rol;

    let valid = (cnp !== '' && 
                 grad !== '' &&
                 nume !== '' &&
                 prenume !== '' &&
                 user !== '' &&
                 pass !== '' &&
                 rol !== '0');

    if (valid) {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cnp: cnp,
          grad: grad,
          nume: nume,
          prenume: prenume,
          user: user,
          pass: pass,
          rol: rol
        })
      };

      fetch('http://localhost:3001/signup', requestOptions)
      .then(response => response.json())
      .then(signup => {
        console.log(signup)
      });
    } else {
      if (cnp === '') {
        this.setState({
          showCnpWarning: true
        });
      }

      if (grad === '') {
        this.setState({
          showGradWarning: true
        });
      }

      if (nume === '') {
        this.setState({
          showNumeWarning: true
        });
      }

      if (prenume === '') {
        this.setState({
          showPrenumeWarning: true
        });
      }

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

      if (rol === '0') {
        this.setState({
          rolOffsetX: 150,
          showRolWarning: true
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
            <label htmlFor='cnp'>
              Cod numeric personal
              <RequiredTippy />
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-exclamation-circle'></i> Introdu CNP
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showCnpWarning}>
              <span className='legacy' tabIndex='0'>
                <Input
                type='text' 
                name='cnp'
                id='cnp'
                placeholder='Introdu CNP'
                onInput={this.onInput}/>
              </span>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='grad'>
              Grad
              <RequiredTippy />
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-exclamation-circle'></i> Introdu gradul
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showGradWarning}>
              <span className='legacy' tabIndex='0'>
                <Input 
                type='text' 
                name='grad'
                id='grad'
                placeholder='Introdu gradul'
                onInput={this.onInput}/>
              </span>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='nume'>
              Nume
              <RequiredTippy />
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-exclamation-circle'></i> Introdu numele
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showNumeWarning}>
              <span className='legacy' tabIndex='0'>
                <Input 
                type='text' 
                name='nume'
                id='nume'
                placeholder='Introdu numele'
                onInput={this.onInput}/>
              </span>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='prenume'>
              Prenume
              <RequiredTippy /> 
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-exclamation-circle'></i> Introdu prenumele
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showPrenumeWarning}>
              <span className='legacy' tabIndex='0'>
                <Input 
                type='text' 
                name='prenume'
                id='prenume'
                placeholder='Introdu prenumele'
                onInput={this.onInput}/>
              </span>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
              <RequiredTippy 
                content='Câmp obligatoriu - minim 3 caractere'/> 
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
                type='text' 
                name='user'
                id='user'
                placeholder='Alege un nume de utilizator'
                onInput={this.onInput}/>
              </span>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <PasswordInput
              onInput={this.onInput}
              visibility='visible' 
              asterisk={true}
              displayWarning={this.state.showPassWarning}/>
          </div>
          <div className='Form-field'>
            <label htmlFor='rol'>
              Rol
              <RequiredTippy /> 
            </label>
            <div className='Form-name'>
            <Tippy
              content={
                <>
                  <i className='fas fa-exclamation-circle'></i> Selectează rolul
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              visible={this.state.showRolWarning}>
              <Tippy
                hideOnClick={false}
                //visible={true}
                allowHTML={true}
                interactive={true}
                maxWidth={200}
                offset={[0, this.state.rolOffsetX]}
                content={
                  <>
                  <div
                    id='style-1'
                    style={{
                      height: 'auto',
                      maxHeight: '15vh',
                      overflowY: 'auto'
                      }}>
                    {this.state.rolInfo[this.state.rolIndex]}
                  </div>
                  </>
                }
                placement='right'
                theme='blue-material'>
                <select
                  name='rol' 
                  id='rol'
                  onChange={this.onInput}>
                  <option value='0'>(Selectează...)</option>
                  <option value='operator'>Operator</option>
                  <option value='manager'>Manager</option>
                </select>
              </Tippy>
            </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <button>Creează cont</button>
          </div>
        </form>
        <div className='Form-field Form-text centered-text'>
              Ai deja un cont? <span onClick={() => this.props.onChange('Login')} className='Form-hint bold glow'>Conectează-te</span>.
        </div>
      </div>
    );
  }
}

export default Signup;
