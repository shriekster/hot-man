import React from 'react';
import Tippy from '@tippyjs/react';
class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.eyeRef = React.createRef();
    this.tooltipRef = React.createRef();

    this.onChange = this.onChange.bind(this);
    
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

    this.state = {
      eyeIcon: 'fas fa-eye icon-eye',
    };
  }

  onChange(toRender) {
    this.props.onChange(toRender);
  }

  togglePasswordVisibility() {
    if (this.eyeRef.current.className === 'fas fa-eye icon-eye') {
      //this.eyeRef.current.className = 'fas fa-eye-slash icon-eye'
      this.setState({
        eyeIcon: 'fas fa-eye-slash icon-eye'
      });
      this.eyeRef.current._tippy.props.content.innerText = 'Ascunde parola';
    } else {
      //this.eyeRef.current.className = 'fas fa-eye icon-eye'
      this.setState({
        eyeIcon: 'fas fa-eye icon-eye'
      });
      this.eyeRef.current._tippy.props.content.innerText = 'Arata parola';
    }
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
          <div className='Form-field'>
            <label htmlFor="pass">
              Parola
            </label>
            <div className='Form-password'>
              <input type="password" name="pass" />
              <Tippy content='Arata parola'
              hideOnClick={false}
              placement='right'
              offset={[0,20]}
              ref={this.tooltipRef}>
                <i className={this.state.eyeIcon}
                 onClick={this.togglePasswordVisibility}
                 ref={this.eyeRef}></i>
               </Tippy>
            </div>
          </div>
          <div className='Form-field'>
            <button>Contecteaza-te</button>
          </div>
        </form>
        <div className='Form-field'>
              Nu aveti cont? <span onClick={() => this.onChange('Signup')} className="Form-hint">Creati un cont.</span>
        </div>
      </div>
    );
  }
}

export default Login;
//asdasd
