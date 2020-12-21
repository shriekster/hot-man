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

      completed: false,

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

    this.localitateInput = React.createRef();
  }

  handleSubmit(e) {
    //console.log(e.target.id)
    if (e) {
      e.preventDefault();

      let wnume = false;
      let wjudet = false;
      let wlocalitate = false;
      let wstrada = false;
      let wnumar = false;
      let wtelefon = false;

      if (!this.state.nextNume) wnume = true;
      if (!this.state.nextJudet) wjudet = true;
      if (!this.state.nextLocalitate) wlocalitate = true;
      if (!this.state.nextStrada) wstrada = true;
      if (!this.state.nextNumar) wnumar = true;
      if (!this.state.nextTelefon) wtelefon = true;

      let fetchAllowed = !(wnume || wjudet || wlocalitate || wstrada || wnumar || wtelefon);

      this.setState({
        showNumeWarning: wnume,
        showJudetWarning: wjudet,
        showLocalitateWarning: wlocalitate,
        showStradaWarning: wstrada,
        showNumarWarning: wnumar,
        showTelefonWarning: wtelefon,
      }, () => {

        if (fetchAllowed) {
          let hotel = {
            nume: this.state.nextNume,
            judet: this.state.nextJudet,
            localitate: this.state.nextLocalitate,
            strada: this.state.nextStrada,
            numar: this.state.nextNumar,
            codPostal: this.state.nextCodPostal,
            telefon: this.state.nextTelefon,
            fax: this.state.nextFax,
            email: this.state.nextEmail,
          };
        
          const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              token: this.props.token,
              task: 'create',
              hotel: hotel,
            })
          };
  
          this.setState({fetching: true}, () => {
            fetch('http://localhost:3001/main/administrare', requestOptions)
            .then(response => response.json())
            .then(registered => {
              this.setState({fetching: false}, () => {
                console.log(registered);
  
                if (registered) {
                  switch (registered.status) {
                    case 'valid' : {
                      this.props.hotelUpdate(hotel)
                      break;
                    }

                    case 'invalid': {
                      this.setState({
                        showNumeError: registered.hotel.nume,
                        showJudetError: registered.hotel.judet,
                        showLocalitateError: registered.hotel.localitate,
                        showStradaError: registered.hotel.strada,
                        showNumarError: registered.hotel.numar,
                        showCodPostalError: registered.hotel.codPostal,
                        showTelefonError: registered.hotel.telefon,
                        showFaxError: registered.hotel.fax,
                        showEmailError: registered.hotel.email,
                      });
                      break;
                    }

                    case 'error': {
                      this.setState({
                        showError: false,
                      });
                    } 
                    case 'full':
                    case 'denied': {
                      this.props.onChange('Login');
                      break;
                    }
                  }
                }
              });
            })
            .catch(error => {
              console.log(error); // dev mode only!
  
              this.setState({
                fetching: false,
                showError: true,
              });
            });
          });
        }
      });
    }
  }

  // numeric input only
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && charCode !== 13 &&
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e && e.target.value.length > 9) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && charCode !== 13 &&
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

    if (e && e.target.value.length > 63) {
      if(charCode !== 8 && charCode !== 9 && charCode !== 13 &&
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
          this.localitateInput.current.value = 'București';

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

            showError: false,
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

            showError: false,
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

            showError: false,
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

            showError: false,
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

            showError: false,
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

              showError: false,
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

              showError: false,
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

              showError: false,
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

              showError: false,
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

            showError: false,
          })
          break;
        }
      }
    }
  }

  componentDidMount() {}

  componentDidUpdate (prevProps, prevState) {
    let nextCompleted = 
    this.state.nextNume && this.state.nextJudet && this.state.nextLocalitate && 
    this.state.nextStrada && this.state.nextNumar && this.state.nextTelefon;

    if (this.state.completed !== nextCompleted) {
      this.setState({
        completed: nextCompleted,
      });
    }
  }

  render() {
    return (
      <div className='create-hotel'>
          <form id='create-hotel-form'
            className='create-hotel-form'
            autoComplete='off'
            autoCorrect='off'
            spellCheck={false}
            onSubmit={this.handleSubmit}>
          <div id='hotel-form-container' 
            className='hotel-form-container'>
            <div id='hotel-attributes-container'
              className='hotel-attributes-container'>
              <Tippy
                allowHTML={true}
                content={
                  <div className='create-hotel-info'>
                    <i className='fas fa-clipboard-list --todo-icon'></i>
                    <hr className='view--separator'/>
                    <div>Completează datele hotelului pe care îl administrezi</div>
                  </div>
                }
                placement='right'
                arrow={false}
                theme='blue-material-thin'
                visible={!this.state.completed}
                offset={[0, 350]}>
                <div id='--required-attributes'>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-exclamation-circle --hotel-icon'></i> Introdu numele hotelului
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    visible={this.state.showNumeWarning}>
                    <Tippy
                      content={
                        <div className='hotel-tippy-content'>
                          <i className='fas fa-minus-circle'></i> Nume invalid
                        </div>
                      }
                      allowHTML={true}
                      placement='right'
                      arrow={false}
                      theme='red-material-warning'
                      visible={this.state.showNumeError}>
                      <div className='--hotel-item'>
                        <div className='--hotel-input'>
                          <span>Nume<span className='bold red'> *</span></span>
                            <input id='--settings-nume'
                              autoComplete='off'
                              autoCorrect='off'
                              spellCheck={false}
                              className='--settings-value --value-editing--adm -inline'
                              onInput={this.onValueInput}
                              onKeyDown={this.onGenericKeyDown}
                              placeholder='Introdu numele'>
                            </input>
                        </div>
                      </div>
                    </Tippy>
                  </Tippy>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-exclamation-circle --hotel-icon'></i> Selectează județul
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    visible={this.state.showJudetWarning}>
                    <Tippy
                      content={
                        <div className='hotel-tippy-content'>
                          <i className='fas fa-minus-circle --hotel-icon'></i> Judet invalid
                        </div>
                      }
                      allowHTML={true}
                      placement='right'
                      arrow={false}
                      theme='red-material-warning'
                      offset={[0, 10]}
                      visible={this.state.showJudetError}>
                      <div className='--hotel-item'>
                        <div className='--hotel-input'>
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
                      </div>
                    </Tippy>
                  </Tippy>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-exclamation-circle --hotel-icon'></i> Introdu localitatea
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    visible={this.state.showLocalitateWarning}>
                    <Tippy
                      content={
                        <div className='hotel-tippy-content'>
                          <i className='fas fa-minus-circle --hotel-icon'></i> Localitate invalidă
                        </div>
                      }
                      allowHTML={true}
                      placement='right'
                      arrow={false}
                      theme='red-material-warning'
                      offset={[0, 10]}
                      visible={this.state.showLocalitateError}>
                      <div className='--hotel-item'>
                        <div className='--hotel-input'>
                          <span>Localitate<span className='bold red'> *</span></span>
                          <input id='--settings-localitate'
                            autoComplete='off'
                            autoCorrect='off'
                            spellCheck={false}
                            className='--settings-value --value-editing--adm -inline'
                            onInput={this.onValueInput}
                            onKeyDown={this.onGenericKeyDown}
                            placeholder='Introdu localitatea'
                            ref={this.localitateInput}>
                          </input>
                        </div>
                      </div>
                    </Tippy>
                  </Tippy>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-exclamation-circle --hotel-icon'></i> Introdu denumirea străzii
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    visible={this.state.showStradaWarning}>
                    <Tippy
                      content={
                        <div className='hotel-tippy-content'>
                          <i className='fas fa-minus-circle --hotel-icon'></i> Stradă invalidă
                        </div>
                      }
                      allowHTML={true}
                      placement='right'
                      arrow={false}
                      theme='red-material-warning'
                      offset={[0, 10]}
                      visible={this.state.showStradaError}>
                      <div className='--hotel-item'>
                        <div className='--hotel-input'>
                          <span>Stradă<span className='bold red'> *</span></span>
                          <input id='--settings-strada'
                            autoComplete='off'
                            autoCorrect='off'
                            spellCheck={false}
                            className='--settings-value --value-editing--adm -inline'
                            onInput={this.onValueInput}
                            onKeyDown={this.onGenericKeyDown}
                            placeholder='Introdu denumirea străzii'>
                          </input>
                        </div>
                      </div>
                    </Tippy>
                  </Tippy>
                  <Tippy
                  content={
                    <div className='hotel-tippy-content'>
                      <i className='fas fa-exclamation-circle --hotel-icon'></i> Introdu numărul străzii
                    </div>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={false}
                  theme='red-material-warning'
                  visible={this.state.showNumarWarning}>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-minus-circle --hotel-icon'></i> Număr invalid
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    offset={[0, 10]}
                    visible={this.state.showNumarError}>
                    <div className='--hotel-item'>
                      <div className='--hotel-input'>
                        <span>Număr<span className='bold red'> *</span></span>
                        <input id='--settings-numar'
                          autoComplete='off'
                          autoCorrect='off'
                          spellCheck={false}
                          className='--settings-value --value-editing--adm -inline'
                          onInput={this.onValueInput}
                          onKeyDown={this.onKeyDown}
                          placeholder='Introdu numărul străzii'>
                        </input>
                      </div>
                    </div>
                  </Tippy>
                </Tippy>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-exclamation-circle --hotel-icon'></i> Introdu numărul de telefon
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    visible={this.state.showTelefonWarning}>
                    <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-minus-circle --hotel-icon'></i> Telefon invalid
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    offset={[0, 10]}
                    visible={this.state.showTelefonError}>
                    <div className='--hotel-item'>
                      <div className='--hotel-input'>
                        <span>Telefon<span className='bold red'> *</span></span>
                        <input id='--settings-telefon'
                          autoComplete='off'
                          autoCorrect='off'
                          spellCheck={false}
                          className='--settings-value --value-editing--adm -inline'
                          onInput={this.onValueInput}
                          onKeyDown={this.onKeyDown}
                          placeholder='Introdu numărul de telefon'>
                        </input>
                      </div>
                    </div>
                    </Tippy>
                  </Tippy>
                </div>
              </Tippy>
              <Tippy
                allowHTML={true}
                content={
                  <div className='create-hotel-info'>
                    <i className='fas fa-clipboard-check --info-icon'></i>
                    <hr className='view--separator'/>
                    <div>Poți completa câmpurile rămase (opțional) sau poți face click pe butonul</div>
                    <div className='--mock'>
                    <i className='fas fa-caret-left --mock-icon'></i>
                      <span>Creează hotel</span>
                      <i className='fas fa-caret-right --mock-icon'></i>
                    </div>
                  </div>
                }
                placement='right'
                arrow={false}
                theme='blue-material-thin'
                visible={this.state.completed}
                offset={[0, 350]}>
                <div id='--optional-attributes'>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-minus-circle --hotel-icon'></i> Cod poștal invalid
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    offset={[0, 10]}
                    visible={this.state.showCodPostalError}>
                    <div className='--hotel-item'>
                      <div className='--hotel-input'>
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
                          placeholder='Introdu codul poștal'>
                        </input>
                      </div>
                    </div>
                  </Tippy>
                  <Tippy
                    content={
                      <div className='hotel-tippy-content'>
                        <i className='fas fa-minus-circle --hotel-icon'></i> Fax invalid
                      </div>
                    }
                    allowHTML={true}
                    placement='right'
                    arrow={false}
                    theme='red-material-warning'
                    offset={[0, 10]}
                    visible={this.state.showFaxError}>
                    <div className='--hotel-item'>
                      <div className='--hotel-input'>
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
                          placeholder='Introdu numărul de fax'>
                        </input>
                      </div>
                    </div>
                  </Tippy>
                  <Tippy
                  content={
                    <div className='hotel-tippy-content'>
                      <i className='fas fa-minus-circle --hotel-icon'></i> Email invalid
                    </div>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={false}
                  theme='red-material-warning'
                  offset={[0, 10]}
                  visible={this.state.showEmailError}>
                  <div className='--hotel-item'>
                    <div className='--hotel-input'>
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
                        placeholder='Introdu adresa de email'>
                      </input>
                    </div>
                  </div>
                </Tippy>
                </div>
              </Tippy>
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
              visible={this.state.showError}
              offset={[0, 40]}>
              <button className='--create-hotel-btn'>
                Creează hotel
              </button>
            </Tippy>
            <Spinner
              className='--hotel-loading'
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
