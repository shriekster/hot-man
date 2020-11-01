import React from 'react';

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
              <input type="text" name="user" />
            </div>
          </div>
          <PasswordBox />
          <div className='Form-field'>
            <button>Conectează-te</button>
          </div>
        </form>
        <div className='Form-field'>
              Nu aveți cont? <span onClick={() => this.onChange('Signup')} className="Form-hint">Creați un cont.</span>
        </div>
      </div>
    );
  }
}

export default Login;
