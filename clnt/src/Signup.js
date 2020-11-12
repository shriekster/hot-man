import React from 'react';
import PasswordBox from './PasswordBox';


class Signup extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {};
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
        <form onSubmit={this.handleSubmit}>
          <div className='Form-field'>
            <label htmlFor="cnp">
              Cod numeric personal
            </label>
            <div className='Form-name'>
              <input 
               type="text" 
               name="cnp"
               required={true} />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="grad">
              Grad
            </label>
            <div className='Form-name'>
              <input 
               type="text" 
               name="grad"
               required={true} />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="nume">
              Nume
            </label>
            <div className='Form-name'>
              <input 
               type="text" 
               name="nume"
               required={true} />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="prenume">
              Prenume
            </label>
            <div className='Form-name'>
              <input 
               type="text" 
               name="prenume"
               required={true} />
            </div>
          </div>
          <div className='Form-field'>
            <label htmlFor="user">
              Utilizator
            </label>
            <div className='Form-name'>
              <input 
               type="text" 
               name="user"
               required={true} />
            </div>
          </div>
          <PasswordBox visibility='visible'/>
          <div className='Form-field'>
            <button>Creează cont</button>
          </div>
        </form>
        <div className='Form-field Form-text centered-text'>
              Aveți deja un cont? <span onClick={() => this.onChange('Login')} className="Form-hint">Autentificați-vă.</span>
        </div>
      </div>
    );
  }
}

export default Signup;
