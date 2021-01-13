import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner'

class HotelUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onValueInput = this.onValueInput.bind(this);

    this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onSelect = this.onSelect.bind(this);

    this.onViewSettingsClick = this.onViewSettingsClick.bind(this);

    this.submitOnMenuClose = this.submitOnMenuClose.bind(this);

    this.focusInput = this.focusInput.bind(this);

    /** Update user attributes (fetch - POST) */
    this.update = this.update.bind(this);

    this.state = {

      fetchingNume: false,
      fetchingJudet: false,
      fetchingLocalitate: false,
      fetchingStrada: false,
      fetchingNumar: false,
      fetchingCodPostal: false,
      fetchingTelefon: false,
      fetchingFax: false,
      fetchingEmail: false,

      editNume: false,
      editJudet: false,
      editLocalitate: false,
      editStrada: false,
      editNumar: false,
      editCodPostal: false,
      editTelefon: false,
      editFax: false,
      editEmail: false,

      nextNume: this.props.hotel.nume,
      nextJudet: this.props.hotel.judet,
      nextLocalitate: this.props.hotel.localitate,
      nextStrada: this.props.hotel.strada,
      nextNumar: this.props.hotel.numar,
      nextCodPostal: this.props.hotel.codPostal,
      nextTelefon: this.props.hotel.telefon,
      nextFax: this.props.hotel.fax,
      nextEmail: this.props.hotel.email,
      
      showNumeError: false,
      showJudetError: false,
      showLocalitateError: false,
      showStradaError: false,
      showNumarError: false,
      showCodPostalError: false,
      showTelefonError: false,
      showFaxError: false,
      showEmailError: false,

      editNumeClass: 'fas fa-edit --settings-edit',
      editJudetClass: 'fas fa-edit --settings-edit',
      editLocalitateClass: 'fas fa-edit --settings-edit',
      editStradaClass: 'fas fa-edit --settings-edit',
      editNumarClass: 'fas fa-edit --settings-edit',
      editCodPostalClass: 'fas fa-edit --settings-edit',
      editTelefonClass: 'fas fa-edit --settings-edit',
      editFaxClass: 'fas fa-edit --settings-edit',
      editEmailClass: 'fas fa-edit --settings-edit',

      valueNumeClass: '--settings-value -inline',
      valueJudetClass: '--settings-value -inline',
      valueLocalitateClass: '--settings-value -inline',
      valueStradaClass: '--settings-value -inline',
      valueNumarClass: '--settings-value -inline',
      valueCodPostalClass: '--settings-value -inline',
      valueTelefonClass: '--settings-value -inline',
      valueFaxClass: '--settings-value -inline',
      valueEmailClass: '--settings-value -inline',

      iconClassNames: {
        edit: 'fas fa-edit --settings-edit',
        editing: 'fas fa-save --settings-edit --editing',
      },

      valueClassNames: {
        edit: '--settings-value -inline',
        editing: '--settings-value --value-editing -inline'
      },
    };

    // Focus inputs when they are enabled
    this.numeInput = React.createRef(); 
    this.judetInput = React.createRef(); 
    this.localitateInput = React.createRef();
    this.stradaInput = React.createRef();
    this.numarInput = React.createRef();
    this.codPostalInput = React.createRef();
    this.telefonInput = React.createRef();
    this.faxInput = React.createRef();
    this.emailInput = React.createRef();

    // React Select use case: blur input on select, then click on the save icon
    this.saveJudet = React.createRef();
  }

  focusInput(prevState) {
    if (this.state.editNume) {
      this.numeInput.current.focus();
    } else

    /** Important! Check the previous state, 
     * otherwise the select menu will stay 
     * open when it's not supposed to */
    if (this.state.editJudet) {
      if(!prevState.editJudet) {
        this.judetInput.current.select.focus()
      }
    } else

    if (this.state.editLocalitate) {
      this.localitateInput.current.focus();
    } else

    if (this.state.editStrada) {
      this.stradaInput.current.focus();
    } else

    if (this.state.editNumar) {
      this.numarInput.current.focus();
    } else

    if (this.state.editCodPostal) {
      this.codPostalInput.current.focus();
    } else

    if (this.state.editTelefon) {
      this.telefonInput.current.focus();
    } else

    if (this.state.editFax) {
      this.faxInput.current.focus();
    } else

    if (this.state.editEmail) {
      this.emailInput.current.focus();
    }
  }

  update (key, value) {
  /* Simple POST request 
  ** with a JSON body using fetch */
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      token: this.props.token,
      task: 'update',
      name: this.props.hotel.nume,
      key: key,
      value: value.trim(),
    })
  };

  let fNume = false;
  let fJudet = false;
  let fLocalitate = false;
  let fStrada = false;
  let fNumar = false;
  let fCodPostal = false;
  let fTelefon = false;
  let fFax = false;
  let fEmail = false;

  switch(key) {
    case 'nume': {
      if (this.props.hotel.nume !== this.state.nextNume){
        fNume = true;
      }
      break;
    }

    case 'judet': {
      if(this.props.hotel.judet !== this.state.nextJudet) {
        fJudet = true;
      }
      break;
    }

    case 'localitate': {
      if (this.props.hotel.localitate !== this.state.nextLocalitate) {
        fLocalitate = true;
      }
      break;
    }

    case 'strada': {
      if (this.props.hotel.strada !== this.state.nextStrada) {
        fStrada = true;
      }
      break;
    }

    case 'numar': {
      if (this.props.hotel.numar !== this.state.nextNumar) {
        fNumar = true;
      }
      break;
    }

    case 'codPostal': {
      if (this.props.hotel.codPostal !== this.state.nextCodPostal) {
        fCodPostal = true;
      }
      break;
    }

    case 'telefon': {
      if (this.props.hotel.telefon !== this.state.nextTelefon) {
        fTelefon = true;
      }
      break;
    }

    case 'fax': {
      if (this.props.hotel.fax !== this.state.nextFax) {
        fFax = true;
      }
      break;
    }

    case 'email': {
      if (this.props.hotel.email !== this.state.nextEmail) {
        fEmail = true;
      }
      break;
    }
  }

  this.setState(
    {
      fetchingNume: fNume,
      fetchingJudet: fJudet,
      fetchingLocalitate: fLocalitate,
      fetchingStrada: fStrada,
      fetchingNumar: fNumar,
      fetchingCodPostal: fCodPostal,
      fetchingTelefon: fTelefon,
      fetchingFax: fFax,
      fetchingEmail: fEmail,
    }, 

    () => 
    {
      let fetchApproved = (
        fNume || fJudet || fLocalitate || fStrada || fNumar || fCodPostal || fTelefon || fFax || fEmail
      );

      if (fetchApproved) {
        fetch('http://localhost:3001/main/administrare', requestOptions)
        .then(response => response.json())
        .then(updated => {

          if ('denied' === updated.status) {
            this.props.onChange('Login'); 
            /* Go to Login when something is wrong with authorization (!) */
          } else {
            if ('invalid' === updated.status || 'error' === updated.status) {
              switch(key) {
                case 'nume': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,              

                    editNume: true,
                    valueNumeClass: this.state.valueClassNames.editing,
                    editNumeClass: this.state.iconClassNames.editing,

                    showNumeError: true,
                  });
                  break;
                }
            
                case 'judet': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,    
                    
                    editJudet: true,
                    valueJudetClass: this.state.valueClassNames.editing,
                    editJudetClass: this.state.iconClassNames.editing,

                    showJudetError: true,
                  });
                  break;
                }
            
                case 'localitate': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,

                    editLocalitate: true,
                    valueLocalitateClass: this.state.valueClassNames.editing,
                    editLocalitateClass: this.state.iconClassNames.editing,
              
                    showLocalitateError: true,
                  });
                  break;
                }
            
                case 'strada': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,

                    editStrada: true,
                    valueStradaClass: this.state.valueClassNames.editing,
                    editStradaClass: this.state.iconClassNames.editing,
              
                    showStradaError: true,
                  });
                  break;
                }
            
                case 'numar': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,   
                    
                    editNumar: true,
                    valueNumarClass: this.state.valueClassNames.editing,
                    editNumarClass: this.state.iconClassNames.editing,

                    showNumarError: true,
                  });
                  break;
                }
            
                case 'codPostal': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,

                    editCodPostal: true,
                    valueCodPostalClass: this.state.valueClassNames.editing,
                    editCodPostalClass: this.state.iconClassNames.editing,
              
                    showCodPostalError: true,
                  });
                  break;
                }

                case 'telefon': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,

                    editTelefon: true,
                    valueTelefonClass: this.state.valueClassNames.editing,
                    editTelefonClass: this.state.iconClassNames.editing,
              
                    showTelefonError: true,
                  });
                  break;
                }

                case 'fax': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,

                    editFax: true,
                    valueFaxClass: this.state.valueClassNames.editing,
                    editFaxClass: this.state.iconClassNames.editing,
              
                    showFaxError: true,
                  });
                  break;
                }

                case 'email': {
                  this.setState({
                    fetchingNume: false,
                    fetchingJudet: false,
                    fetchingLocalitate: false,
                    fetchingStrada: false,
                    fetchingNumar: false,
                    fetchingCodPostal: false,
                    fetchingTelefon: false,
                    fetchingFax: false,
                    fetchingEmail: false,

                    editEmail: true,
                    valueEmailClass: this.state.valueClassNames.editing,
                    editEmailClass: this.state.iconClassNames.editing,
              
                    showEmailError: true,
                  });
                  break;
                }
              }
            } else

            if ('valid' === updated.status) {
              let hotel = {
                nume: this.state.nextNume,
                judet: this.state.nextJudet,
                localitate: this.state.nextLocalitate,
                strada: this.state.nextStrada,
                numar: this.state.nextNumar,
                codPostal: this.state.nextCodPostal,
                telefon: this.state.nextTelefon,
                fax: this.state.nextFax,
                email: this.state.nextEmail
              };

              this.setState({
                fetchingNume: false,
                fetchingJudet: false,
                fetchingLocalitate: false,
                fetchingStrada: false,
                fetchingNumar: false,
                fetchingCodPostal: false,
                fetchingTelefon: false,
                fetchingFax: false,
                fetchingEmail: false,

                showNumeError: false,
                showJudetError: false,
                showLocalitateError: false,
                showStradaError: false,
                showNumarError: false,
                showCodPostalError: false,
                showTelefonError: false,
                showFaxError: false,
                showEmailError: false,
              }, 

              () => {
                this.props.onHotelUpdate(hotel)
              });

            } else { /** Any other case */
              this.setState({
                fetchingNume: false,
                fetchingJudet: false,
                fetchingLocalitate: false,
                fetchingStrada: false,
                fetchingNumar: false,
                fetchingCodPostal: false,
                fetchingTelefon: false,
                fetchingFax: false,
                fetchingEmail: false,
              });
            }
          }
        })
        .catch(error => {
        console.log(error); // dev mode only!

        this.setState({
          fetchingNume: false,
          fetchingJudet: false,
          fetchingLocalitate: false,
          fetchingStrada: false,
          fetchingNumar: false,
          fetchingCodPostal: false,
          fetchingTelefon: false,
          fetchingFax: false,
          fetchingEmail: false,
          //showError: true,
        });
      });
      }
    });
  }

  handleSettingsSubmit(e) {
    if (e && '--settings-form' === e.target.className) {
      e.preventDefault();
    }

    if (e && e.target && e.target.id) {

      switch (e.target.id) {

        case '--settings-nume-form':
        case '--settings-edit-nume': {
          let className = this.state.editNumeClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueNumeClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editNume) {
            this.update( 'nume', this.state.nextNume);
          }

          this.setState({
            editNume: !this.state.editNume,
            editNumeClass: className,
            valueNumeClass: valueClassName,

            editJudet: false,
            editLocalitate: false,
            editStrada: false,
            editNumar: false,
            editCodPostal: false,
            editTelefon: false,
            editFax: false,
            editEmail: false,

            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-judet-form':
        case '--settings-edit-judet': {
          let className = this.state.editJudetClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueJudetClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editJudet) {
            this.submitOnMenuClose(e);
            //this.gradInput.current.select.blur();
            //this.update( 'grad', this.state.nextGrad);
          }

          else
          this.setState({
            editJudet: !this.state.editJudet,
            editJudetClass: className,
            valueJudetClass: valueClassName,

            editNume: false,
            editLocalitate: false,
            editStrada: false,
            editNumar: false,
            editCodPostal: false,
            editTelefon: false,
            editFax: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
          
          break;
        }

        case '--settings-localitate-form':
        case '--settings-edit-localitate': {
          let className = this.state.editLocalitateClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueLocalitateClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editLocalitate) {
            this.update( 'localitate', this.state.nextLocalitate);
          }

          this.setState({
            editLocalitate: !this.state.editLocalitate,
            editLocalitateClass: className,
            valueLocalitateClass: valueClassName,

            editNume: false,
            editJudet: false,
            editStrada: false,
            editNumar: false,
            editCodPostal: false,
            editTelefon: false,
            editFax: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showJudetError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-strada-form':
        case '--settings-edit-strada': {
          let className = this.state.editStradaClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueStradaClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editStrada) {
            this.update( 'strada', this.state.nextStrada);
          }

          this.setState({
            editStrada: !this.state.editStrada,
            editStradaClass: className,
            valueStradaClass: valueClassName,

            editNume: false,
            editJudet: false,
            editLocalitate: false,
            editNumar: false,
            editCodPostal: false,
            editTelefon: false,
            editFax: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-numar-form':
        case '--settings-edit-numar': {
          let className = this.state.editNumarClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueNumarClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editNumar) {
            this.update( 'numar', this.state.nextNumar);
          }

          this.setState({
            editNumar: !this.state.editNumar,
            editNumarClass: className,
            valueNumarClass: valueClassName,

            editNume: false,
            editJudet: false,
            editLocalitate: false,
            editStrada: false,
            editCodPostal: false,
            editTelefon: false,
            editFax: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-codPostal-form':
        case '--settings-edit-codPostal': {
          let className = this.state.editCodPostalClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueCodPostalClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editCodPostal) {
            this.update( 'codPostal', this.state.nextCodPostal);
          }

          this.setState({
            editCodPostal: !this.state.editCodPostal,
            editCodPostalClass: className,
            valueCodPostalClass: valueClassName,

            editNume: false,
            editJudet: false,
            editLocalitate: false,
            editStrada: false,
            editNumar: false,
            editTelefon: false,
            editFax: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showTelefonError: false,
            showFaxError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-telefon-form':
        case '--settings-edit-telefon': {
          let className = this.state.editTelefonClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueTelefonClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editTelefon) {
            this.update( 'telefon', this.state.nextTelefon);
          }

          this.setState({
            editTelefon: !this.state.editTelefon,
            editTelefonClass: className,
            valueTelefonClass: valueClassName,

            editNume: false,
            editJudet: false,
            editLocalitate: false,
            editStrada: false,
            editNumar: false,
            editCodPostal: false,
            editFax: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextFax: this.props.hotel.fax,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showFaxError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-fax-form':
        case '--settings-edit-fax': {
          let className = this.state.editFaxClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueFaxClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editFax) {
            this.update( 'fax', this.state.nextFax);
          }

          this.setState({
            editFax: !this.state.editFax,
            editFaxClass: className,
            valueFaxClass: valueClassName,

            editNume: false,
            editJudet: false,
            editLocalitate: false,
            editStrada: false,
            editNumar: false,
            editCodPostal: false,
            editTelefon: false,
            editEmail: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editEmailClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextEmail: this.props.hotel.email,

            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showEmailError: false,
          });
          break;
        }

        case '--settings-email-form':
        case '--settings-edit-email': {
          let className = this.state.editEmailClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueEmailClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editEmail) {
            this.update( 'email', this.state.nextEmail);
          }

          this.setState({
            editEmail: !this.state.editEmail,
            editEmailClass: className,
            valueEmailClass: valueClassName,

            editNume: false,
            editJudet: false,
            editLocalitate: false,
            editStrada: false,
            editNumar: false,
            editCodPostal: false,
            editTelefon: false,
            editFax: false,

            editNumeClass: this.state.iconClassNames.edit,
            editJudetClass: this.state.iconClassNames.edit,
            editLocalitateClass: this.state.iconClassNames.edit,
            editStradaClass: this.state.iconClassNames.edit,
            editNumarClass: this.state.iconClassNames.edit,
            editCodPostalClass: this.state.iconClassNames.edit,
            editTelefonClass: this.state.iconClassNames.edit,
            editFaxClass: this.state.iconClassNames.edit,

            valueNumeClass: this.state.valueClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,

            nextNume: this.props.hotel.nume,
            nextJudet: this.props.hotel.judet,
            nextLocalitate: this.props.hotel.localitate,
            nextStrada: this.props.hotel.strada,
            nextNumar: this.props.hotel.numar,
            nextCodPostal: this.props.hotel.codPostal,
            nextTelefon: this.props.hotel.telefon,
            nextFax: this.props.hotel.fax,

            showNumeError: false,
            showJudetError: false,
            showLocalitateError: false,
            showStradaError: false,
            showNumarError: false,
            showCodPostalError: false,
            showTelefonError: false,
            showFaxError: false,
          });
          break;
        } 
      }
    }
  }

  submitOnMenuClose(e) {

    let className = this.state.editJudetClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
    let valueClassName = this.state.valueJudetClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

    if (this.state.editJudet) {
      this.judetInput.current.select.blur();

      this.setState({
        editJudet: !this.state.editJudet,
        editJudetClass: className,
        valueJudetClass: valueClassName,

        editNume: false,
        editLocalitate: false,
        editStrada: false,
        editNumar: false,
        editCodPostal: false,
        editTelefon: false,
        editFax: false,
        editEmail: false,

        editNumeClass: this.state.iconClassNames.edit,
        editLocalitateClass: this.state.iconClassNames.edit,
        editStradaClass: this.state.iconClassNames.edit,
        editNumarClass: this.state.iconClassNames.edit,
        editCodPostalClass: this.state.iconClassNames.edit,
        editTelefonClass: this.state.iconClassNames.edit,
        editFaxClass: this.state.iconClassNames.edit,
        editEmailClass: this.state.iconClassNames.edit,

        valueNumeClass: this.state.valueClassNames.edit,
        valueLocalitateClass: this.state.valueClassNames.edit,
        valueStradaClass: this.state.valueClassNames.edit,
        valueNumarClass: this.state.valueClassNames.edit,
        valueCodPostalClass: this.state.valueClassNames.edit,
        valueTelefonClass: this.state.valueClassNames.edit,
        valueFaxClass: this.state.valueClassNames.edit,
        valueEmailClass: this.state.valueClassNames.edit,
      },
      () => 
      {
        this.update( 'judet', this.state.nextJudet);
      });
    }
  }

  // Cancel editing when the Escape key is pressed
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    // Escape was pressed
    if (27 === charCode) {
      this.onViewSettingsClick({target: {id: 'view-user-settings'}})
    }

    return true;
  }

  onSelect(e, optional) {

    if (optional && optional !== undefined) {

      if (optional.id === 'judet' && optional.action === 'select-option') {

        this.setState({
          nextJudet: optional.value,

          showNumeError: false,
          showJudetError: false,
          showLocalitateError: false,
          showStradaError: false,
          showNumarError: false,
          showCodPostalError: false,
          showTelefonError: false,
          showFaxError: false,
          showEmailError: false,
        },
        () => {
          this.submitOnMenuClose(e);
        });

      }
    }
  }

  onValueInput(e) {
    if (e && e.target && e.target.id) {
      switch (e.target.id) {
        case '--settings-nume': {
          this.setState({
            nextNume: e.target.value,

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
            nextLocalitate: e.target.value,

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
            nextStrada: e.target.value,

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
          this.setState({
            nextNumar: e.target.value,

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

        case '--settings-codPostal': {
          this.setState({
            nextCodPostal: e.target.value,

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

        case '--settings-telefon': {
          this.setState({
            nextTelefon: e.target.value,

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

        case '--settings-fax': {
          this.setState({
            nextFax: e.target.value,

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

        case '--settings-email': {
          this.setState({
            nextEmail: e.target.value,

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

  onViewSettingsClick(e) {
    if (e && e.target) {
      if ('view-user-settings' === e.target.id || 'hotel-settings-update' === e.target.id) {

        if (this.state.editNume) {
          this.setState({
            editNume: false,
            nextNume: this.props.hotel.nume,
            editNumeClass: this.state.iconClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showNumeError: false,
          })
        }

        if (this.state.editJudet) {
          this.setState({
            editJudet: false,
            nextJudet: this.props.hotel.judet,
            editJudetClass: this.state.iconClassNames.edit,
            valueJudetClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showJudetError: false,
          })
        }

        if (this.state.editLocalitate) {
          this.setState({
            editLocalitate: false,
            nextLocalitate: this.props.hotel.localitate,
            editLocalitateClass: this.state.iconClassNames.edit,
            valueLocalitateClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showLocalitateError: false,
          })
        }

        if (this.state.editStrada) {
          this.setState({
            editStrada: false,
            nextStrada: this.props.hotel.strada,
            editStradaClass: this.state.iconClassNames.edit,
            valueStradaClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showStradaError: false,
          })
        }

        if (this.state.editNumar) {
          this.setState({
            editNumar: false,
            nextNumar: this.props.hotel.numar,
            editNumarClass: this.state.iconClassNames.edit,
            valueNumarClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showNumarError: false,
          })
        }

        if (this.state.editCodPostal) {
          this.setState({
            editCodPostal: false,
            nextCodPostal: this.props.hotel.codPostal,
            editCodPostalClass: this.state.iconClassNames.edit,
            valueCodPostalClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showCodPostalError: false,
          })
        }

        if (this.state.editTelefon) {
          this.setState({
            editTelefon: false,
            nextTelefon: this.props.hotel.telefon,
            editTelefonClass: this.state.iconClassNames.edit,
            valueTelefonClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showTelefonError: false,
          })
        }

        if (this.state.editFax) {
          this.setState({
            editFax: false,
            nextFax: this.props.hotel.fax,
            editFaxClass: this.state.iconClassNames.edit,
            valueFaxClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showFaxError: false,
          })
        }

        if (this.state.editEmail) {
          this.setState({
            editEmail: false,
            nextEmail: this.props.hotel.email,
            editEmailClass: this.state.iconClassNames.edit,
            valueEmailClass: this.state.valueClassNames.edit,

            fetchingNume: false,
            fetchingJudet: false,
            fetchingLocalitate: false,
            fetchingStrada: false,
            fetchingNumar: false,
            fetchingCodPostal: false,
            fetchingTelefon: false,
            fetchingFax: false,
            fetchingEmail: false,

            showEmailError: false,
          })
        }
      }
    }
  }

  componentDidMount() {
  }

  componentDidUpdate (prevProps, prevState) {
    // Focus input elements when they are enabled
    //console.log(this.state.editGrad, this.state.nextGrad)
    this.focusInput(prevState);
  }

  render() {
    return (
      <div>
        <div id='view-user-settings' 
          className='view-user-settings'
          onClick={this.onViewSettingsClick}>
          <div id='hotel-settings-update' 
          className='hotel-settings-update'>
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
                offset={[0, 65]}
                visible={this.state.showNumeError}>
                <form id='--settings-nume-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Nume
                  </span>
                  <input
                    maxLength={64}
                    id='--settings-nume'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueNumeClass}
                    disabled={!this.state.editNume}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextNume}
                    ref={this.numeInput}>
                  </input>
                  <i id='--settings-edit-nume' 
                    className={this.state.editNumeClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingNume}/>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Județ invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 65]}
                visible={this.state.showJudetError}>
                <form id='--settings-judet-form'
                    className='--settings-form'
                    onSubmit={this.handleSettingsSubmit}>
                    <span>
                      Județ
                    </span>
                    <Select
                      id='--settings-judet'
                      isDisabled={!this.state.editJudet}
                      defaultValue={this.props.judete.find(option => option.value === this.state.nextJudet)}
                      onInputChange={(inputValue, action) => this.onSelect(null, {id: 'judet', value: inputValue, action: action.action})}
                      onChange={(inputValue,action) => this.onSelect(null, {id: 'judet', value: inputValue.value, action: action.action})}
                      maxMenuHeight={100}
                      placeholder='Selectează...'
                      noOptionsMessage={(msg) => 'Nu există'}
                      className='sel-container'
                      classNamePrefix='sel' 
                      options={this.props.judete} 
                      onKeyDown={this.onGenericKeyDown}
                      ref={this.judetInput}
                      openMenuOnFocus={true}
                      closeMenuOnSelect={true}
                      blurInputOnSelect={true}
                      inputId='--judet-select-input'/> 
                    <i id='--settings-edit-judet'  
                      className={this.state.editJudetClass}
                      onClick={this.handleSettingsSubmit}
                      ref={this.saveJudet}></i>
                  </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingJudet}/>
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
                offset={[0, 65]}
                visible={this.state.showLocalitateError}>
                <form id='--settings-localitate-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Localitate
                  </span>
                  <input
                    maxLength={64}
                    id='--settings-localitate'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueLocalitateClass}
                    disabled={!this.state.editLocalitate}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextLocalitate}
                    ref={this.localitateInput}>
                  </input>
                  <i id='--settings-edit-localitate' 
                    className={this.state.editLocalitateClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingLocalitate}/>
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
                offset={[0, 65]}
                visible={this.state.showStradaError}>
                <form id='--settings-strada-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Stradă
                  </span>
                  <input
                    maxLength={64}
                    id='--settings-strada'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueStradaClass}
                    disabled={!this.state.editStrada}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextStrada}
                    ref={this.stradaInput}>
                  </input>
                  <i id='--settings-edit-strada'
                    className={this.state.editStradaClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingStrada}/>
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
                  offset={[0, 65]}
                  visible={this.state.showNumarError}>
                <form id='--settings-numar-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Număr
                  </span>
                  <input
                    maxLength={10}
                    id='--settings-numar'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueNumarClass}
                    disabled={!this.state.editNumar}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextNumar}
                    ref={this.numarInput}>
                  </input>
                  <i id='--settings-edit-numar' 
                    className={this.state.editNumarClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingNumar}/>
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
                  offset={[0, 65]}
                  visible={this.state.showCodPostalError}>
                <form id='--settings-codPostal-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Cod poștal
                  </span>
                  <input
                    maxLength={10}
                    id='--settings-codPostal'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueCodPostalClass}
                    disabled={!this.state.editCodPostal}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextCodPostal}
                    ref={this.codPostalInput}>
                  </input>
                  <i id='--settings-edit-codPostal' 
                    className={this.state.editCodPostalClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingCodPostal}/>
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
                  offset={[0, 65]}
                  visible={this.state.showTelefonError}>
                <form id='--settings-telefon-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Telefon
                  </span>
                  <input
                    maxLength={10}
                    id='--settings-telefon'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueTelefonClass}
                    disabled={!this.state.editTelefon}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextTelefon}
                    ref={this.telefonInput}>
                  </input>
                  <i id='--settings-edit-telefon' 
                    className={this.state.editTelefonClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingTelefon}/>
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
                  offset={[0, 65]}
                  visible={this.state.showFaxError}>
                <form id='--settings-fax-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Fax
                  </span>
                  <input
                    maxLength={10}
                    id='--settings-fax'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueFaxClass}
                    disabled={!this.state.editFax}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextFax}
                    ref={this.faxInput}>
                  </input>
                  <i id='--settings-edit-fax' 
                    className={this.state.editFaxClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingFax}/>
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
                  offset={[0, 65]}
                  visible={this.state.showEmailError}>
                <form id='--settings-email-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Email
                  </span>
                  <input
                    maxLength={64}
                    id='--settings-email'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueEmailClass}
                    disabled={!this.state.editEmail}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextEmail}
                    ref={this.emailInput}>
                  </input>
                  <i id='--settings-edit-email' 
                    className={this.state.editEmailClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                status='loading'
                visibility={this.state.fetchingEmail}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelUpdater;
