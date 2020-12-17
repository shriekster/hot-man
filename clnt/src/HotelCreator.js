import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner'
//import { runAtThisOrScheduleAtNextAnimationFrame } from 'custom-electron-titlebar/lib/common/dom';

class HotelCreator extends React.Component {
  constructor(props) {
    super(props);

    this.onValueInput = this.onValueInput.bind(this);

    this.handleSettingsSubmit = this.handleSettingsSubmit.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onSelect = this.onSelect.bind(this);

    this.onViewSettingsClick = this.onViewSettingsClick.bind(this);

    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);

    this.onPasswordFocus = this.onPasswordFocus.bind(this);

    this.onPasswordBlur = this.onPasswordBlur.bind(this);

    this.submitOnMenuClose = this.submitOnMenuClose.bind(this);

    /** Update user attributes (fetch - POST) */
    this.update = this.update.bind(this);

    this.state = {
      token: this.props.token,
      hotel: '',

      fetchingCnp: false,
      fetchingGrad: false,
      fetchingNume: false,
      fetchingPrenume: false,
      fetchingUtilizator: false,
      fetchingParola: false,

      editCnp: false,
      editGrad: false,
      editNume: false,
      editPrenume: false,
      editUtilizator: false,
      editParola: false,

      passwordVisible: false,
      passwordFocused: false,

      /*
      cnp: this.props.user.cnp,
      grad: this.props.user.grad,
      nume: this.props.user.nume,
      prenume: this.props.user.prenume,
      utilizator: this.props.user.utilizator,
      rol: this.props.user.rol,
      parola: '',
      */
      nextCnp: '',
      nextGrad: '',
      nextNume: '',
      nextPrenume: '',
      nextUtilizator: '',
      nextParola: '',

      showCnpError: false,
      showGradError: false,
      showNumeError: false,
      showPrenumeError: false,
      showUtilizatorError: false,
      showParolaError: false,

      editCnpClass: 'fas fa-edit --settings-edit',
      editGradClass: 'fas fa-edit --settings-edit',
      editNumeClass: 'fas fa-edit --settings-edit',
      editPrenumeClass: 'fas fa-edit --settings-edit',
      editUtilizatorClass: 'fas fa-edit --settings-edit',
      editParolaClass: 'fas fa-edit --settings-edit',

      valueCnpClass: '--settings-value -inline',
      valueGradClass: '--settings-value -inline',
      valueNumeClass: '--settings-value -inline',
      valuePrenumeClass: '--settings-value -inline',
      valueUtilizatorClass: '--settings-value -inline',
      valueParolaClass: '--settings-value -inline',

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
    this.cnpInput = React.createRef(); 
    this.gradInput = React.createRef(); 
    this.numeInput = React.createRef();
    this.prenumeInput = React.createRef();
    this.utilizatorInput = React.createRef();
    this.parolaInput = React.createRef();

    // React Select use case: blur input on select, then click on the save icon
    this.saveGrad = React.createRef();
    
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput(prevState) {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    if (this.state.editCnp) {
      this.cnpInput.current.focus();
    } else

    /** Important! Check the previous state, 
     * otherwise the select menu will stay 
     * open when it's not supposed to */
    if (this.state.editGrad) {
      if(!prevState.editGrad) {
        this.gradInput.current.select.focus()
      }
    } else

    if (this.state.editNume) {
      this.numeInput.current.focus();
    } else

    if (this.state.editPrenume) {
      this.prenumeInput.current.focus();
    } else

    if (this.state.editUtilizator) {
      this.utilizatorInput.current.focus();
    } else

    if (this.state.editParola) {
      this.parolaInput.current.focus();
    }
  }

  update (attributeName, attributeValue) {
  /* Simple POST request 
  ** with a JSON body using fetch */
  const requestOptions = {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attributeName: attributeName,
      attributeValue: attributeValue,
      token: this.state.token,
      username: this.state.utilizator,
    })
  };

  let fCnp = false;
  let fGrad = false;
  let fNume = false;
  let fPrenume = false;
  let fUtilizator = false;
  let fParola = false;

  

  switch(attributeName) {
    case 'cnp': {
      if (this.state.cnp !== this.state.nextCnp){
        fCnp = true;
      }
      break;
    }

    case 'grad': {
      if(this.state.grad !== this.state.nextGrad) {
        fGrad = true;
      }
      break;
    }

    case 'nume': {
      if (this.state.nume !== this.state.nextNume) {
        fNume = true;
      }
      break;
    }

    case 'prenume': {
      if (this.state.prenume !== this.state.nextPrenume) {
        fPrenume = true;
      }
      break;
    }

    case 'utilizator': {
      if (this.state.utilizator !== this.state.nextUtilizator) {
        fUtilizator = true;
      }
      break;
    }

    case 'parola': {
      if (this.state.parola !== this.state.nextParola) {
        fParola = true;
      }
      break;
    }
  }

  this.setState(
    {
      fetchingCnp: fCnp,
      fetchingGrad: fGrad,
      fetchingNume: fNume,
      fetchingPrenume: fPrenume,
      fetchingUtilizator: fUtilizator,
      fetchingParola: fParola,
    }, 

    () => 
    {
      let fetchApproved = (
        fCnp || fGrad || fNume || fPrenume || fUtilizator || fParola
      );

      if (fetchApproved) {
        fetch('http://localhost:3001/main/setari', requestOptions)
        .then(response => response.json())
        .then(updated => {

          if ('denied' === updated.status) {
            this.props.onChange('Login'); /* render login component when something is wrong with authorization (!) */
          } else {
            if ('invalid' === updated.status) {
              switch(attributeName) {
                case 'cnp': {
                  this.setState({
                    fetchingCnp: false,
                    fetchingGrad: false,
                    fetchingNume: false,
                    fetchingPrenume: false,
                    fetchingUtilizator: false,
                    fetchingParola: false,

                    showCnpError: true,
                  });
                  break;
                }
            
                case 'grad': {
                  this.setState({
                    fetchingCnp: false,
                    fetchingGrad: false,
                    fetchingNume: false,
                    fetchingPrenume: false,
                    fetchingUtilizator: false,
                    fetchingParola: false,

                    showGradError: true,
                  });
                  break;
                }
            
                case 'nume': {
                  this.setState({
                    fetchingCnp: false,
                    fetchingGrad: false,
                    fetchingNume: false,
                    fetchingPrenume: false,
                    fetchingUtilizator: false,
                    fetchingParola: false,

                    showNumeError: true,
                  });
                  break;
                }
            
                case 'prenume': {
                  this.setState({
                    fetchingCnp: false,
                    fetchingGrad: false,
                    fetchingNume: false,
                    fetchingPrenume: false,
                    fetchingUtilizator: false,
                    fetchingParola: false,

                    showPrenumeError: true,
                  });
                  break;
                }
            
                case 'utilizator': {
                  this.setState({
                    fetchingCnp: false,
                    fetchingGrad: false,
                    fetchingNume: false,
                    fetchingPrenume: false,
                    fetchingUtilizator: false,
                    fetchingParola: false,

                    showUtilizatorError: true,
                  });
                  break;
                }
            
                case 'parola': {
                  this.setState({
                    fetchingCnp: false,
                    fetchingGrad: false,
                    fetchingNume: false,
                    fetchingPrenume: false,
                    fetchingUtilizator: false,
                    fetchingParola: false,

                    showParolaError: true,
                  });
                  break;
                }
              }
            } else

            if ('valid' === updated.status) {
              let usr = {
                cnp: this.state.nextCnp,
                grad: this.state.nextGrad,
                nume: this.state.nextNume,
                prenume: this.state.nextPrenume,
                utilizator: this.state.nextUtilizator,
                rol: this.props.user.rol,
              };

              let tok = updated.token;

              this.setState({
                token: tok,

                fetchingCnp: false,
                fetchingGrad: false,
                fetchingNume: false,
                fetchingPrenume: false,
                fetchingUtilizator: false,
                fetchingParola: false,

                cnp: usr.cnp,
                grad: usr.grad,
                nume: usr.nume,
                prenume: usr.prenume,
                utilizator: usr.utilizator,
                rol: usr.rol,
                parola: '',
                nextParola: '',

                //??
                showCnpError: false,
                showGradError: false,
                showNumeError: false,
                showPrenumeError: false,
                showUtilizatorError: false,
                showParolaError: false,
              }, 
              () => {this.props.onUserUpdate(tok, usr)});

            } else { /** Any other case */
              this.setState({
                fetchingCnp: false,
                fetchingGrad: false,
                fetchingNume: false,
                fetchingPrenume: false,
                fetchingUtilizator: false,
                fetchingParola: false,
              });
            }
          }
        })
        .catch(error => {
        console.log(error); // dev mode only!

        this.setState({
          fetchingCnp: false,
          fetchingGrad: false,
          fetchingNume: false,
          fetchingPrenume: false,
          fetchingUtilizator: false,
          fetchingParola: false,
          //showError: true,
        });
      });
      }
    });
  }

  handleSettingsSubmit(e) {
    //console.log(e.target.id)
    if (e && '--settings-form' === e.target.className) {
      e.preventDefault();
    }

    if (e && e.target && e.target.id) {

      switch (e.target.id) {

        case '--settings-cnp-form':
        case '--settings-edit-cnp': {
          let className = this.state.editCnpClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueCnpClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editCnp) {
            this.update( 'cnp', this.state.nextCnp);
          }

          this.setState({
            editCnp: !this.state.editCnp,
            editCnpClass: className,
            valueCnpClass: valueClassName,

            editGrad: false,
            editNume: false,
            editPrenume: false,
            editUtilizator: false,
            editParola: false,

            editGradClass: this.state.iconClassNames.edit,
            editNumeClass: this.state.iconClassNames.edit,
            editPrenumeClass: this.state.iconClassNames.edit,
            editUtilizatorClass: this.state.iconClassNames.edit,
            editParolaClass: this.state.iconClassNames.edit,

            valueGradClass: this.state.valueClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,
            valuePrenumeClass: this.state.valueClassNames.edit,
            valueUtilizatorClass: this.state.valueClassNames.edit,
            valueParolaClass: this.state.valueClassNames.edit,

          });
          break;
        }

        case '--settings-grad-form':
        case '--settings-edit-grad': {
          let className = this.state.editGradClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueGradClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editGrad) {
            this.submitOnMenuClose(e);
            //this.gradInput.current.select.blur();
            //this.update( 'grad', this.state.nextGrad);
          }

          else
          this.setState({
            editGrad: !this.state.editGrad,
            editGradClass: className,
            valueGradClass: valueClassName,

            editCnp: false,
            editNume: false,
            editPrenume: false,
            editUtilizator: false,
            editParola: false,

            editCnpClass: this.state.iconClassNames.edit,
            editNumeClass: this.state.iconClassNames.edit,
            editPrenumeClass: this.state.iconClassNames.edit,
            editUtilizatorClass: this.state.iconClassNames.edit,
            editParolaClass: this.state.iconClassNames.edit,

            valueCnpClass: this.state.valueClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,
            valuePrenumeClass: this.state.valueClassNames.edit,
            valueUtilizatorClass: this.state.valueClassNames.edit,
            valueParolaClass: this.state.valueClassNames.edit,
          });
          
          break;
        }

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

            editCnp: false,
            editGrad: false,
            editPrenume: false,
            editUtilizator: false,
            editParola: false,

            editCnpClass: this.state.iconClassNames.edit,
            editGradClass: this.state.iconClassNames.edit,
            editPrenumeClass: this.state.iconClassNames.edit,
            editUtilizatorClass: this.state.iconClassNames.edit,
            editParolaClass: this.state.iconClassNames.edit,

            valueCnpClass: this.state.valueClassNames.edit,
            valueGradClass: this.state.valueClassNames.edit,
            valuePrenumeClass: this.state.valueClassNames.edit,
            valueUtilizatorClass: this.state.valueClassNames.edit,
            valueParolaClass: this.state.valueClassNames.edit,
          });
          break;
        }

        case '--settings-prenume-form':
        case '--settings-edit-prenume': {
          let className = this.state.editPrenumeClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valuePrenumeClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editPrenume) {
            this.update( 'prenume', this.state.nextPrenume);
          }

          this.setState({
            editPrenume: !this.state.editPrenume,
            editPrenumeClass: className,
            valuePrenumeClass: valueClassName,

            editCnp: false,
            editGrad: false,
            editNume: false,
            editUtilizator: false,
            editParola: false,

            editCnpClass: this.state.iconClassNames.edit,
            editGradClass: this.state.iconClassNames.edit,
            editNumeClass: this.state.iconClassNames.edit,
            editUtilizatorClass: this.state.iconClassNames.edit,
            editParolaClass: this.state.iconClassNames.edit,

            valueCnpClass: this.state.valueClassNames.edit,
            valueGradClass: this.state.valueClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,
            valueUtilizatorClass: this.state.valueClassNames.edit,
            valueParolaClass: this.state.valueClassNames.edit,
          });
          break;
        }

        case '--settings-utilizator-form':
        case '--settings-edit-utilizator': {
          let className = this.state.editUtilizatorClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueUtilizatorClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editUtilizator) {
            this.update( 'utilizator', this.state.nextUtilizator);
          }

          this.setState({
            editUtilizator: !this.state.editUtilizator,
            editUtilizatorClass: className,
            valueUtilizatorClass: valueClassName,

            editCnp: false,
            editGrad: false,
            editNume: false,
            editPrenume: false,
            editParola: false,

            editCnpClass: this.state.iconClassNames.edit,
            editGradClass: this.state.iconClassNames.edit,
            editNumeClass: this.state.iconClassNames.edit,
            editPrenumeClass: this.state.iconClassNames.edit,
            editParolaClass: this.state.iconClassNames.edit,

            valueCnpClass: this.state.valueClassNames.edit,
            valueGradClass: this.state.valueClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,
            valuePrenumeClass: this.state.valueClassNames.edit,
            valueParolaClass: this.state.valueClassNames.edit,
          });
          break;
        }

        case '--settings-parola-form':
        case '--settings-edit-parola': {
          let className = this.state.editParolaClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueParolaClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          let passwordVisible = false;

          if (className === this.state.iconClassNames.edit &&
              valueClassName == this.state.valueClassNames.edit) {
                passwordVisible = false;
          }

          if (this.state.editParola) {
            this.update( 'parola', this.state.nextParola);
          }

          this.setState({
            editParola: !this.state.editParola,
            editParolaClass: className,
            valueParolaClass: valueClassName,

            passwordVisible: passwordVisible,

            editCnp: false,
            editGrad: false,
            editNume: false,
            editPrenume: false,
            editUtilizator: false,

            editCnpClass: this.state.iconClassNames.edit,
            editGradClass: this.state.iconClassNames.edit,
            editNumeClass: this.state.iconClassNames.edit,
            editPrenumeClass: this.state.iconClassNames.edit,
            editUtilizatorClass: this.state.iconClassNames.edit,

            valueCnpClass: this.state.valueClassNames.edit,
            valueGradClass: this.state.valueClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,
            valuePrenumeClass: this.state.valueClassNames.edit,
            valueUtilizatorClass: this.state.valueClassNames.edit,
          });
          break;
        }
      }
    }
  }

  submitOnMenuClose(e) {

    let className = this.state.editGradClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
    let valueClassName = this.state.valueGradClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

    if (this.state.editGrad) {
      this.gradInput.current.select.blur();

      this.setState({
        editGrad: !this.state.editGrad,
        editGradClass: className,
        valueGradClass: valueClassName,

        editCnp: false,
        editNume: false,
        editPrenume: false,
        editUtilizator: false,
        editParola: false,

        editCnpClass: this.state.iconClassNames.edit,
        editNumeClass: this.state.iconClassNames.edit,
        editPrenumeClass: this.state.iconClassNames.edit,
        editUtilizatorClass: this.state.iconClassNames.edit,
        editParolaClass: this.state.iconClassNames.edit,

        valueCnpClass: this.state.valueClassNames.edit,
        valueNumeClass: this.state.valueClassNames.edit,
        valuePrenumeClass: this.state.valueClassNames.edit,
        valueUtilizatorClass: this.state.valueClassNames.edit,
        valueParolaClass: this.state.valueClassNames.edit,
      },
      () => 
      {
        this.update( 'grad', this.state.nextGrad);
      });
    }
  }

  // numeric input only
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (27 === charCode) {
      this.onViewSettingsClick({target: {id: 'view-user-settings'}})
    }
    
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if(charCode !== 8 && charCode !== 9 && 
        charCode !== 17 && charCode !== 46 && 
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e && e.target.value.length > 13) {
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

    if (27 === charCode) {console.log(e.target)
      this.onViewSettingsClick({target: {id: 'view-user-settings'}})
    } 

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

      if (optional.id === 'grad' && optional.action === 'select-option') {
        
        this.setState({
          nextGrad: optional.value.trim(),

          showCnpError: false,
          showGradError: false,
          showNumeError: false,
          showPrenumeError: false,
          showUtilizatorError: false,
          showParolaError: false,
        },
        () => {
          this.submitOnMenuClose(e);
        });

      }
    }
  }

  onValueInput(e) {
    if (e && e.target && e.target.id) {
      /*
      this.setState({
        showCnpError: false,
        showGradError: false,
        showNumeError: false,
        showPrenumeError: false,
        showUtilizatorError: false,
        showParolaError: false,
      });
      */
      switch (e.target.id) {
        case '--settings-cnp': {
          if (e.target.value.length > 13) {
            e.preventDefault();
          }
          else {
            this.setState({
              nextCnp: e.target.value.trim(),

              showCnpError: false,
              showGradError: false,
              showNumeError: false,
              showPrenumeError: false,
              showUtilizatorError: false,
              showParolaError: false,
            })
          }
          break;
        }

        case '--settings-nume': {
          this.setState({
            nextNume: e.target.value.trim(),

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          })
          break;
        }

        case '--settings-prenume': {
          this.setState({
            nextPrenume: e.target.value.trim(),

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          })
          break;
        }

        case '--settings-utilizator': {
          this.setState({
            nextUtilizator: e.target.value.trim(),

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          })
          break;
        }

        case '--settings-parola': {
          this.setState({
            nextParola: e.target.value.trim(),

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          })
          break;
        }
      }
    }
  }

  onViewSettingsClick(e) {
    if (e && e.target) {
      if ('view-user-settings' === e.target.id || 'user-settings-container' === e.target.id) {

        if (this.state.editCnp) {
          this.setState({
            editCnp: false,
            nextCnp: this.state.cnp,
            editCnpClass: this.state.iconClassNames.edit,
            valueCnpClass: this.state.valueClassNames.edit,

            fetchingCnp: false,
            fetchingGrad: false,
            fetchingNume: false,
            fetchingPrenume: false,
            fetchingUtilizator: false,
            fetchingParola: false,

            showCnpError: false,
          })
        }

        if (this.state.editGrad) {
          this.setState({
            editGrad: false,
            nextGrad: this.state.grad,
            editGradClass: this.state.iconClassNames.edit,
            valueGradClass: this.state.valueClassNames.edit,

            fetchingCnp: false,
            fetchingGrad: false,
            fetchingNume: false,
            fetchingPrenume: false,
            fetchingUtilizator: false,
            fetchingParola: false,

            showGradError: false,
          })
        }

        if (this.state.editNume) {
          this.setState({
            editNume: false,
            nextNume: this.state.nume,
            editNumeClass: this.state.iconClassNames.edit,
            valueNumeClass: this.state.valueClassNames.edit,

            fetchingCnp: false,
            fetchingGrad: false,
            fetchingNume: false,
            fetchingPrenume: false,
            fetchingUtilizator: false,
            fetchingParola: false,

            showNumeError: false,
          })
        }

        if (this.state.editPrenume) {
          this.setState({
            editPrenume: false,
            nextPrenume: this.state.prenume,
            editPrenumeClass: this.state.iconClassNames.edit,
            valuePrenumeClass: this.state.valueClassNames.edit,

            fetchingCnp: false,
            fetchingGrad: false,
            fetchingNume: false,
            fetchingPrenume: false,
            fetchingUtilizator: false,
            fetchingParola: false,

            showPrenumeError: false,
          })
        }

        if (this.state.editUtilizator) {
          this.setState({
            editUtilizator: false,
            nextUtilizator: this.state.utilizator,
            editUtilizatorClass: this.state.iconClassNames.edit,
            valueUtilizatorClass: this.state.valueClassNames.edit,

            fetchingCnp: false,
            fetchingGrad: false,
            fetchingNume: false,
            fetchingPrenume: false,
            fetchingUtilizator: false,
            fetchingParola: false,

            showUtilizatorError: false,
          })
        }

        if (this.state.editParola) {
          this.setState({
            editParola: false,
            nextParola: this.state.parola,
            editParolaClass: this.state.iconClassNames.edit,
            valueParolaClass: this.state.valueClassNames.edit,

            fetchingCnp: false,
            fetchingGrad: false,
            fetchingNume: false,
            fetchingPrenume: false,
            fetchingUtilizator: false,
            fetchingParola: false,

            showParolaError: false,
          })
        }
      }
    }
  }

  togglePasswordVisibility () {
    this.setState({
      passwordVisible: !this.state.passwordVisible
    });
  }

  onPasswordFocus () {
    this.setState({
      passwordFocused: true,
    })
  }

  onPasswordBlur () {
    this.setState({
      passwordFocused: false,
    })
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
        <div>Setările contului de utilizator</div>
        <hr className='view--separator'/>
        <div id='view-user-settings' 
          className='view-user-settings'
          onClick={this.onViewSettingsClick}>
          <div id='user-settings-container'>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> CNP invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 65]}
                visible={this.state.showCnpError}>
                <form id='--settings-cnp-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    CNP
                  </span>
                  <input id='--settings-cnp'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueCnpClass}
                    disabled={!this.state.editCnp}
                    onInput={this.onValueInput}
                    onKeyDown={this.onKeyDown}
                    value={this.state.nextCnp}
                    ref={this.cnpInput}>
                  </input>
                  <i id='--settings-edit-cnp' 
                    className={this.state.editCnpClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetchingCnp}/>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Grad invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 65]}
                visible={this.state.showGradError}>
                <form id='--settings-grad-form'
                    className='--settings-form'
                    onSubmit={this.handleSettingsSubmit}>
                    <span>
                      Grad
                    </span>
                    <Select
                      id='--settings-grad'
                      isDisabled={!this.state.editGrad}
                      onInputChange={(inputValue, action) => this.onSelect(null, {id: 'grad', value: inputValue, action: action.action})}
                      onChange={(inputValue,action) => this.onSelect(null, {id: 'grad', value: inputValue.value, action: action.action})}
                      maxMenuHeight={100}
                      placeholder='Selectează...'
                      noOptionsMessage={(msg) => 'Nu există'}
                      className='sel-container'
                      classNamePrefix='sel' 
                      options={this.props.judete} 
                      onKeyDown={this.onGenericKeyDown}
                      ref={this.gradInput}
                      openMenuOnFocus={true}
                      closeMenuOnSelect={true}
                      blurInputOnSelect={true}
                      inputId='--grad-select-input'/> 
                    <i id='--settings-edit-grad'  
                      className={this.state.editGradClass}
                      onClick={this.handleSettingsSubmit}
                      ref={this.saveGrad}></i>
                  </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetchingGrad}/>
            </div>
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
                  <input id='--settings-nume'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueNumeClass}
                    disabled={!this.state.editNume}
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
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
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetchingNume}/>
            </div>
            <div className='--settings-item'>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Prenume invalid
                  </>
                }
                allowHTML={true}
                placement='right'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 65]}
                visible={this.state.showPrenumeError}>
                <form id='--settings-prenume-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Prenume
                  </span>
                  <input id='--settings-prenume'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valuePrenumeClass}
                    disabled={!this.state.editPrenume}
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextPrenume}
                    ref={this.prenumeInput}>
                  </input>
                  <i id='--settings-edit-prenume'
                    className={this.state.editPrenumeClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetchingPrenume}/>
            </div>
            <div className='--settings-item'>
              <Tippy
                  content={
                    <>
                      <i className='fas fa-minus-circle'></i> Utilizator invalid sau indisponibil
                    </>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={false}
                  theme='red-material-warning'
                  offset={[0, 65]}
                  visible={this.state.showUtilizatorError}>
                <form id='--settings-utilizator-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Utilizator
                  </span>
                  <input id='--settings-utilizator'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueUtilizatorClass}
                    disabled={!this.state.editUtilizator}
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextUtilizator}
                    ref={this.utilizatorInput}>
                  </input>
                  <i id='--settings-edit-utilizator' 
                    className={this.state.editUtilizatorClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                className='--settings-loading'
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetchingUtilizator}/>
            </div>
            <div className='--settings-item'>
            <Tippy
              content={
                <>
                  <i className='fas fa-minus-circle'></i> Parolă invalidă
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={false}
              theme='red-material-warning'
              offset={[0, 65]}
              visible={this.state.showParolaError}>
              <form id='--settings-parola-form'
                className='--settings-form'
                onSubmit={this.handleSettingsSubmit}>
                <span>
                  Parolă
                </span>
                <input id='--settings-parola'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck={false}
                  className={this.state.valueParolaClass + ' --settings-parola'}
                  disabled={!this.state.editParola}
                  onInput={this.onValueInput}
                  onKeyDown={this.onGenericKeyDown}
                  value={this.state.nextParola}
                  type={this.state.passwordVisible ? 'text' : 'password'}
                  ref={this.parolaInput}>
                </input>
                <i id='--settings-parola-icon'
                  className={(this.state.passwordVisible ? 
                              'fas fa-eye-slash --settings-parola-icon' : 
                              'fas fa-eye --settings-parola-icon') 
                              + 
                            (this.state.editParola ? 
                              ' --parola-is-visible' : 
                                ' --parola-is-invisible')}
                  onClick={this.togglePasswordVisibility}></i>
                <i id='--settings-edit-parola' 
                  className={this.state.editParolaClass}
                  onClick={this.handleSettingsSubmit}></i>
              </form>
            </Tippy>
            <Spinner
                className='--settings-loading'
                width='50px'
                height='50px'
                status='altLoading'
                visibility={this.state.fetchingParola}/>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HotelCreator;
