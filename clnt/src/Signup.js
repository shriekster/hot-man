import React from 'react';


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
      <div className='Signup'>
        <form className='Login-form'>
          <div className='Login-element'>
            <label htmlFor="user">
              Utilizator
            </label>
            <div className='Login-password'>
              <input type="text" name="user" />
            </div>
          </div>
          <div>
            <label htmlFor="pass">
              Parola
            </label>
            <input type="password" name="pass" />
          </div>
        </form>
        <div>
              Aveti deja un cont? <span onClick={() => this.onChange('Login')} className="Create-account-text">Autentificati-va.</span>
        </div>
      </div>
    );
  }
}

export default Signup;
