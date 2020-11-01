import React from 'react';
import PasswordBox from './PasswordBox';


class Signup extends React.Component {
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
      <div className='Form'>
        <form>
          <div className='Form-field'>
            <label htmlFor="user">
              Cod numeric personal
            </label>
            <div className='Form-name'>
              <input type="text" name="user" />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="user">
              Grad
            </label>
            <div className='Form-name'>
              <input type="text" name="user" />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="user">
              Nume
            </label>
            <div className='Form-name'>
              <input type="text" name="user" />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="user">
              Prenume
            </label>
            <div className='Form-name'>
              <input type="text" name="user" />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="user">
              Utilizator
            </label>
            <div className='Form-name'>
              <input type="text" name="user" />
            </div>
          </div>
          <PasswordBox visibility='visible'/>
          <div className='Form-field'>
            <button>Creează cont</button>
          </div>
        </form>
        <div className='Form-field'>
              Aveți deja un cont? <span onClick={() => this.onChange('Login')} className="Form-hint">Autentificați-vă.</span>
        </div>
      </div>
    );
  }
}

export default Signup;
