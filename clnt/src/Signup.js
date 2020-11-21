import React from 'react';
import Tippy from '@tippyjs/react';
import Input from './Input';
import PasswordInput from './PasswordInput';
import RequiredTippy from './RequiredTippy';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      elements: {
        cnp: '',
        grad: '',
        nume: '',
        prenume: '',
        user: '',
        pass: '',
        showPassWarning: false
      }
    };
  }

  onChange(toRender) {
    this.props.onChange(toRender);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {  
    return (
      <div className='Form'>
        <form 
          onSubmit={this.handleSubmit}
          autoComplete='off'>
          <div className='Form-field'>
            <label htmlFor='cnp'>
              Cod numeric personal
              <RequiredTippy />
            </label>
            <div className='Form-name'>
              <Input 
               type='text' 
               name='cnp'
               placeholder='Introdu CNP-ul'
              />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='grad'>
              Grad
              <RequiredTippy />
            </label>
            <div className='Form-name'>
              <Input 
               type='text' 
               name='grad'
               placeholder='Introdu gradul'
               />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='nume'>
              Nume
              <RequiredTippy />
            </label>
            <div className='Form-name'>
              <Input 
               type='text' 
               name='nume'
               placeholder='Introdu numele'
               />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='prenume'>
              Prenume
              <RequiredTippy /> 
            </label>
            <div className='Form-name'>
              <Input 
               type='text' 
               name='prenume'
               placeholder='Introdu prenumele'
               />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor='user'>
              Utilizator
              <RequiredTippy /> 
            </label>
            <div className='Form-name'>
              <Input 
               type='text' 
               name='user'
               placeholder='Alege un nume de utilizator'
               />
            </div>
          </div>
          <div className='Form-field'>
            <PasswordInput 
              visibility='visible' 
              asterisk={true}
              displayWarning={this.state.showPassWarning}/>
          </div>
          <div className='Form-field'>
            <button>Creează cont</button>
          </div>
        </form>
        <div className='Form-field Form-text centered-text'>
              Ai deja un cont? <span onClick={() => this.onChange('Login')} className='Form-hint bold'>Conectează-te</span>.
        </div>
      </div>
    );
  }
}

export default Signup;
