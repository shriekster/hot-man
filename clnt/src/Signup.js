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
          <div className='Form-field'>
            <label htmlFor="pass">
              Parola
            </label>
            <div className='Form-password'>
              <input type="password" name="pass" />
            </div>
          </div>
          <div className='Form-field'>
            <button>Creeaza cont</button>
          </div>
        </form>
        <div className='Form-field'>
              Aveti deja un cont? <span onClick={() => this.onChange('Login')} className="Form-hint">Autentificati-va.</span>
        </div>
      </div>
    );
  }
}

export default Signup;
