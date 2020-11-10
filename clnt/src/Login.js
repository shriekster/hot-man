import React from 'react';
import loading from './images/hotel-loading.svg'
import PasswordBox from './PasswordBox'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {

    };
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
              Utilizator
            </label>
            <div className='Form-name'>
              <input 
               type="text" 
               name="user"
               required />
            </div>
          </div>
          <PasswordBox />
          <div className='Form-field'>
            <input 
             className='Form-remember'
             type="checkbox" 
             name="remember" />
            <label htmlFor="remember">
              Ține-mă minte
            </label>
          </div>
          <div className='Form-field'>
            <button>Conectează-te</button>
          </div>
          <div className='Form-field'>
            <img className='pulse loading' src={loading} />
          </div>
        </form>
        <div className='Form-field Form-text centered-text'>
          Nu aveți cont? <span onClick={() => this.onChange('Signup')} className="Form-hint">Creați un cont.</span>
        </div>
      </div>
    );
  }
}

export default Login;
