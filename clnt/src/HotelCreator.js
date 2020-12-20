import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner'
//import { runAtThisOrScheduleAtNextAnimationFrame } from 'custom-electron-titlebar/lib/common/dom';

class HotelCreator extends React.Component {
  constructor(props) {
    super(props);

    this.onValueInput = this.onValueInput.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onSelect = this.onSelect.bind(this);

    this.state = {
      token: this.props.token,
      hotel: '',

      fetching: false,

      nextNume: '',
      nextJudet: '',
      nextLocalitate: '',
      nextStrada: '',
      nextNumar: '',
      nextCodPostal: '',
      nextTelefon: '',
      nextFax: '',
      nextEmail: '',

      showNumeWarning: false,
      showJudetWarning: false,
      showLocalitateWarning: false,
      showStradaWarning: false,
      showNumarWarning: false,
      showCodPostalWarning: false,
      showTelefonWarning: false,
      showFaxWarning: false,
      showEmailWarning: false,

      showNumeError: false,
      showJudetError: false,
      showLocalitateError: false,
      showStradaError: false,
      showNumarError: false,
      showCodPostalError: false,
      showTelefonError: false,
      showFaxError: false,
      showEmailError: false,

      showError: false,
    };
  }

  handleSubmit(e) {
    //console.log(e.target.id)
    if (e) {
      e.preventDefault();
    }
  }

  // numeric input only
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && 
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e && e.target.value.length > 24) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && 
        !(charCode >= 37 && charCode <= 40))  {
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  // input max length: 64
  onGenericKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (e && e.target.value.length > 64) {
      if(charCode !== 8 && charCode !== 9 && 
          charCode !== 17 && charCode !== 46 && 
          !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      } 
    } 
    return true;
  }

  onSelect(e, optional) {

    if (optional && optional !== undefined) {

      if (optional.id === 'judet' && optional.action === 'select-option') {
        let judet;

        if (optional.label) {
          judet = optional.label.trim();
        }

        if (judet.includes('București')) {
          this.setState({
            nextJudet: optional.value.trim(),
            nextLocalitate: 'București',

            showNumeWarning: false,
            showJudetWarning: false,
            showLocalitateWarning: false,
            showStradaWarning: false,
            showNumarWarning: false,
            showCodPostalWarning: false,
            showTelefonWarning: false,
            showFaxWarning: false,
            showEmailWarning: false,
      
            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
        } else {
          this.setState({
            nextJudet: optional.value.trim(),
            nextLocalitate: '',

            showNumeWarning: false,
            showJudetWarning: false,
            showLocalitateWarning: false,
            showStradaWarning: false,
            showNumarWarning: false,
            showCodPostalWarning: false,
            showTelefonWarning: false,
            showFaxWarning: false,
            showEmailWarning: false,
      
            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
        }
      }
    }
  }

  onValueInput(e) {
    if (e && e.target && e.target.id) {
      switch (e.target.id) {

        case '--settings-nume': {
          this.setState({
            nextNume: e.target.value.trim(),

            showNumeWarning: false,
            showJudetWarning: false,
            showLocalitateWarning: false,
            showStradaWarning: false,
            showNumarWarning: false,
            showCodPostalWarning: false,
            showTelefonWarning: false,
            showFaxWarning: false,
            showEmailWarning: false,
      
            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          })
          break;
        }

        case '--settings-localitate': {
          this.setState({
            nextLocalitate: e.target.value.trim(),

            showNumeWarning: false,
            showJudetWarning: false,
            showLocalitateWarning: false,
            showStradaWarning: false,
            showNumarWarning: false,
            showCodPostalWarning: false,
            showTelefonWarning: false,
            showFaxWarning: false,
            showEmailWarning: false,
      
            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          })
          break;
        }

        case '--settings-strada': {
          this.setState({
            nextStrada: e.target.value.trim(),

            showNumeWarning: false,
            showJudetWarning: false,
            showLocalitateWarning: false,
            showStradaWarning: false,
            showNumarWarning: false,
            showCodPostalWarning: false,
            showTelefonWarning: false,
            showFaxWarning: false,
            showEmailWarning: false,
      
            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          })
          break;
        }

        case '--settings-numar': {
          if (e.target.value.length > 24) {
            e.preventDefault();
          }
          else {
            this.setState({
              nextNumar: e.target.value.trim(),

              showNumeWarning: false,
              showJudetWarning: false,
              showLocalitateWarning: false,
              showStradaWarning: false,
              showNumarWarning: false,
              showCodPostalWarning: false,
              showTelefonWarning: false,
              showFaxWarning: false,
              showEmailWarning: false,
        
              showNumeError: false,
              showJudetError: false,
              showLocalitateError: false,
              showStradaError: false,
              showNumarError: false,
              showCodPostalError: false,
              showTelefonError: false,
              showFaxError: false,
              showEmailError: false,
            })
          }
          break;
        }

        case '--settings-cod-postal': {
          if (e.target.value.length > 24) {
            e.preventDefault();
          }
          else {
            this.setState({
              nextCodPostal: e.target.value.trim(),

              showNumeWarning: false,
              showJudetWarning: false,
              showLocalitateWarning: false,
              showStradaWarning: false,
              showNumarWarning: false,
              showCodPostalWarning: false,
              showTelefonWarning: false,
              showFaxWarning: false,
              showEmailWarning: false,
        
              showNumeError: false,
              showJudetError: false,
              showLocalitateError: false,
              showStradaError: false,
              showNumarError: false,
              showCodPostalError: false,
              showTelefonError: false,
              showFaxError: false,
              showEmailError: false,
            })
          }
          break;
        }

        case '--settings-telefon': {
          if (e.target.value.length > 24) {
            e.preventDefault();
          }
          else {
            this.setState({
              nextTelefon: e.target.value.trim(),

              showNumeWarning: false,
              showJudetWarning: false,
              showLocalitateWarning: false,
              showStradaWarning: false,
              showNumarWarning: false,
              showCodPostalWarning: false,
              showTelefonWarning: false,
              showFaxWarning: false,
              showEmailWarning: false,
        
              showNumeError: false,
              showJudetError: false,
              showLocalitateError: false,
              showStradaError: false,
              showNumarError: false,
              showCodPostalError: false,
              showTelefonError: false,
              showFaxError: false,
              showEmailError: false,
            })
          }
          break;
        }

        case '--settings-fax': {
          if (e.target.value.length > 24) {
            e.preventDefault();
          }
          else {
            this.setState({
              nextFax: e.target.value.trim(),

              showNumeWarning: false,
              showJudetWarning: false,
              showLocalitateWarning: false,
              showStradaWarning: false,
              showNumarWarning: false,
              showCodPostalWarning: false,
              showTelefonWarning: false,
              showFaxWarning: false,
              showEmailWarning: false,
        
              showNumeError: false,
              showJudetError: false,
              showLocalitateError: false,
              showStradaError: false,
              showNumarError: false,
              showCodPostalError: false,
              showTelefonError: false,
              showFaxError: false,
              showEmailError: false,
            })
          }
          break;
        }

        case '--settings-email': {
          this.setState({
            nextEmail: e.target.value.trim(),

            showNumeWarning: false,
            showJudetWarning: false,
            showLocalitateWarning: false,
            showStradaWarning: false,
            showNumarWarning: false,
            showCodPostalWarning: false,
            showTelefonWarning: false,
            showFaxWarning: false,
            showEmailWarning: false,
      
            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          })
          break;
        }
      }
    }
  }

  componentDidMount() {}

  componentDidUpdate (prevProps, prevState) {}

  render() {
    return (
      <div>
        <form id='create-hotel-form'
          className='create-hotel-form'>
        <div className='create-hotel-container'>Completează datele hotelului pe care îl administrezi:</div>
        <div id='view-hotel-settings' 
          className='view-hotel-settings'>
          <div id='hotel-settings-container'>
          <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Nume invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showNumeError}>
                <div className='--settings-input'>
                  <span>Nume<span className='bold red'> *</span></span>
                  <input id='--settings-nume'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextNume}
                    placeholder='Introdu numele'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Judet invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showJudetError}>
                <div className='--settings-input'>
                <span>Judet<span className='bold red'> *</span></span>
                    <Select
                      id='--settings-judet'
                      onInputChange={(inputValue, action) => this.onSelect(null, {id: 'judet', value: inputValue, action: action.action})}
                      onChange={(inputValue, action) => this.onSelect(null, {id: 'judet', label: inputValue.label, value: inputValue.value, action: action.action})}
                      maxMenuHeight={100}
                      placeholder='Selectează...'
                      noOptionsMessage={(msg) => 'Nu există'}
                      className='selhc-container'
                      classNamePrefix='selhc' 
                      options={this.props.judete} 
                      inputId='--judet-select-input'/> 
                  </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Localitate invalidă
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showLocalitateError}>
                <div className='--settings-input'>
                <span>Localitate<span className='bold red'> *</span></span>
                  <input id='--settings-localitate'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextLocalitate}
                    placeholder='Introdu localitatea'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Stradă invalidă
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showStradaError}>
                <div className='--settings-input'>
                <span>Stradă<span className='bold red'> *</span></span>
                  <input id='--settings-strada'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextStrada}
                    placeholder='Introdu denumirea străzii'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                  content={
                    <>
                      <i className='fas fa-minus-circle'></i> Număr invalid
                    </>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={false}
                  theme='red-material-warning'
                  offset={[0, 10]}
                  visible={this.state.showNumarError}>
                <div className='--settings-input'>
                <span>Număr<span className='bold red'> *</span></span>
                  <input id='--settings-numar'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextNumar}
                    placeholder='Introdu numărul străzii'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Cod poștal invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showCodPostalError}>
                <div className='--settings-input'>
                  <span>
                    Cod poștal
                  </span>
                  <input id='--settings-cod-postal'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextCodPostal}
                    placeholder='Introdu codul poștal'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Telefon invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showTelefonError}>
                <div className='--settings-input'>
                  <span>
                    Telefon
                  </span>
                  <input id='--settings-telefon'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextTelefon}
                    placeholder='Introdu numărul de telefon'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Fax invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showFaxError}>
                <div className='--settings-input'>
                  <span>
                    Fax
                  </span>
                  <input id='--settings-fax'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextFax}
                    placeholder='Introdu numărul de fax'>
                  </input>
                </div>
              </Tippy>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Email invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 10]}
                visible={this.state.showEmailError}>
                <div className='--settings-input'>
                  <span>
                    Email
                  </span>
                  <input id='--settings-email'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className='--settings-value --value-editing--adm -inline'
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextEmail}
                    placeholder='Introdu adresa de email'>
                  </input>
                </div>
              </Tippy>
            </div>
          </div>
          <Tippy
            allowHTML={true}
            content={
              <>
                <i className='fas fa-times-circle'></i> Eroare! Încearcă din nou.
              </>
            }
            placement='bottom'
            arrow={false}
            theme='red-material-warning'
            visible={this.state.showError}>
            <button className='--create-hotel-btn'>
              Creează hotel
            </button>
          </Tippy>
          <Spinner
                className='--settings-loading'
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetching}/>
        </div>
        </form>
      </div>
    );
  }
}

export default HotelCreator;
