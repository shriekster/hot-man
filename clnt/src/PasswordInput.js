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
          inputClass: 'right-padded blue fixed-height',
          tippyContent: 'Arată parola',
          inputType: 'password',
          theme: 'blue-material',
        },

        visible: {
          iconClass: 'fas fa-eye-slash icon-eye red',
          inputClass: 'right-padded red bold glow fixed-height',
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
      <div className='Form-name'>
        <label htmlFor='pass'>
          {
            //!this.props.text &&
            this.props.label ||
            <>
              Parola 
            </>
          }
          {
            asterisk &&
            <RequiredTippy />
          }
        </label>
        <div className='Form-password'>
        <Tippy
          hideOnClick={false}
          content=
          {
            <>
              <div><i className='fas fa-info-circle'></i> Minim 8 caractere:
                <ul>
                  <li>&#x02713; minim o literă mică</li>
                  <li>&#x02713; minim o literă mare</li>
                  <li>&#x02713; minim o cifră</li>
                  <li>&#x02713; minim un simbol (ex. @ ] #)</li>
                </ul>
              </div>
            </>
          }
          allowHTML={true}
          placement='right'
          arrow={true}
          theme='blue-material-light'
          offset={[0, 20 + 130 * (this.props.displayWarning || this.props.displayError)]}
          disabled={!(this.props.displayInfo)}>
          <Tippy
            content=
            {
              <>
                <i className='fas fa-minus-circle'></i> Parolă invalidă
              </>
            }
            allowHTML={true}
            placement='right'
            arrow={false}
            theme='red-material-warning'
            visible={this.props.displayError}>
              <Tippy
                content=
                {
                  <>
                    <i className='fas fa-exclamation-circle'></i> Introdu parola
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                visible={this.props.displayWarning}>
                <span className='legacy' tabIndex='0'>
                  <Input
                    onKeyDown={this.props.onKeyDown}
                    className={display.inputClass}
                    type={display.inputType} 
                    name='pass'
                    id='pass'
                    placeholder={this.props.placeholder || 'Introdu parola'}
                    onInput={this.props.onInput} 
                    autoFocus={this.props.autoFocus}/>
                </span>
              </Tippy>
          </Tippy>
        </Tippy>
        <Tippy content={display.tippyContent}
          theme={display.theme}
          hideOnClick={false}
          placement={this.props.eyePlacement}
          offset={this.props.eyeOffset}
          arrow={this.props.eyeArrow}>
          <i className={display.iconClass}
            onClick={this.togglePasswordVisibility}>
          </i>
        </Tippy>
        </div>
        <div>
          {/*<span>{this.state.errorMessage}</span>*/}
        </div>
      </div>
    );
  }
}

export default PasswordInput;
