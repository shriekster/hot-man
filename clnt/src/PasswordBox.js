import React from 'react';
import Tippy from '@tippyjs/react';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css'


class PasswordBox extends React.Component {
  constructor(props) {
    super(props);
    
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

    this.state = {
      /*
      displays: {
        0: 'hidden',
        1: 'visible'
      },
      */
      //display: 0,
      passwordVisibilityStates: {
        hidden: {
          iconClass: 'fas fa-eye icon-eye',
          tippyContent: 'Arată parola',
          inputType: 'password'
        },

        visible: {
          iconClass: 'fas fa-eye-slash icon-eye crimson',
          tippyContent: 'Ascunde parola',
          inputType: 'text'
        }
      },

      passwordVisibility: this.props.visibility || 'hidden'
    }
  }

  togglePasswordVisibility() {

    //let displayKey = this.state.display ^ 1;
    //let displayValue = this.state.displays[displayKey];
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

    return (
      <div className='Form-field'>
        <label htmlFor="pass">
          Parola
        </label>
        <div className='Form-password'>
          <input type={display.inputType} name="pass" />
          <Tippy content={display.tippyContent}
          theme='material'
          hideOnClick={false}
          placement='right'
          offset={[0,20]}>
            <i className={display.iconClass}
            onClick={this.togglePasswordVisibility}>
            </i>
          </Tippy>
        </div>
      </div>
    );
  }
}

export default PasswordBox;
