import React from 'react';
import Input from './Input';
import RequiredTippy from './RequiredTippy';
import Tippy from '@tippyjs/react';


class PasswordInput extends React.Component {
  constructor(props) {
    super(props);
    
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

    this.state = {
      passwordVisibilityStates: {
        hidden: {
          iconClass: 'fas fa-eye icon-eye',
          inputClass: 'right-padded blue',
          tippyContent: 'Arată parola',
          inputType: 'password',
          theme: 'blue-material',
        },

        visible: {
          iconClass: 'fas fa-eye-slash icon-eye red',
          inputClass: 'right-padded red bold glow',
          tippyContent: 'Ascunde parola',
          inputType: 'text',
          theme: 'red-material',
        }
      },

      passwordVisibility: this.props.visibility || 'hidden',
    }
  }

  togglePasswordVisibility() {

    let visibility = this.state.passwordVisibility;

    if ('hidden' === visibility) {
      visibility = 'visible';
    } else {
      visibility = 'hidden';
    }

    this.setState({
      passwordVisibility: visibility
    });
  }

  render() {
    let display = this.state.passwordVisibilityStates[this.state.passwordVisibility];
    let asterisk = this.props.asterisk;
    return (
      <div className='Form-field'>
        <label htmlFor='pass'>
          Parola
          {
            asterisk &&
            <RequiredTippy />
          }
        </label>
        <div className='Form-password'>
        <Input
          className={display.inputClass}
          type={display.inputType} 
          name='pass'
          placeholder='Introdu parola'
          onInput={this.props.onInput}
        />
          <Tippy content={display.tippyContent}
            theme={display.theme}
            hideOnClick={false}
            placement='right'
            offset={[0,20]}>
            <i className={display.iconClass}
              onClick={this.togglePasswordVisibility}>
            </i>
          </Tippy>
        </div>
        <div>
          <span>{this.state.errorMessage}</span>
        </div>
      </div>
    );
  }
}

export default PasswordInput;
