import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner';

class Setari extends React.Component {
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

    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);

    this.submitModal = this.submitModal.bind(this);

    /** Update user attributes (fetch - POST) */
    this.update = this.update.bind(this);

    this.state = {
      token: this.props.token,

      backgroundClass: 'view-user-settings',
      confirmNewPassword: false,
      showModal: false,
      modalPassword: '',
      showModalError: false,

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

      cnp: this.props.user.loc,
      grad: this.props.user.grad,
      nume: this.props.user.nume,
      prenume: this.props.user.prenume,
      utilizator: this.props.user.utilizator,
      rol: this.props.user.rol,
      parola: '',

      nextCnp: this.props.user.loc,
      nextGrad: this.props.user.grad,
      nextNume: this.props.user.nume,
      nextPrenume: this.props.user.prenume,
      nextUtilizator: this.props.user.utilizator,
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

      grade: [
        {value: 'P.c.c.', label: 'Personal civil contractual'},
        {value: 'F.p.', label: 'Funcționar public'},
        {value: 'Sold.', label: 'Soldat'},
        {value: 'Frt.', label: 'Fruntaș'},
        {value: 'Cap.III', label: 'Caporal clasa a III-a'},
        {value: 'Cap.II', label: 'Caporal clasa a II-a'},
        {value: 'Cap.I', label: 'Caporal clasa I'},
        {value: 'Sg.', label: 'Sergent'},
        {value: 'Sg.maj.', label: 'Sergent major'},
        {value: 'Plt.', label: 'Plutonier'},
        {value: 'Plt.maj.', label: 'Plutonier major'},
        {value: 'Plt.adj.', label: 'Plutonier adjutant'},
        {value: 'Plt.adj.pr.', label: 'Plutonier adjutant principal'},
        {value: 'M.m.V', label: 'Maistru militar clasa a V-a'},
        {value: 'M.m.IV', label: 'Maistru militar clasa a IV-a'},
        {value: 'M.m.III', label: 'Maistru militar clasa a III-a'},
        {value: 'M.m.II', label: 'Maistru militar clasa a II-a'},
        {value: 'M.m.I', label: 'Maistru militar clasa I'},
        {value: 'M.m.p.', label: 'Maistru militar principal'},
        {value: 'Slt.', label: 'Sublocotenent'},
        {value: 'Asp.', label: 'Aspirant'},
        {value: 'Lt.', label: 'Locotenent'},
        {value: 'Cpt.', label: 'Căpitan'},
        {value: 'Mr.', label: 'Maior'},
        {value: 'Lt.cdor.', label: 'Locotenent-comandor'},
        {value: 'Lt.col.', label: 'Locotenent-colonel'},
        {value: 'Cpt.cdor.', label: 'Căpitan-comandor'},
        {value: 'Col.', label: 'Colonel'},
        {value: 'Cdor.', label: 'Comandor'},
      ],
    };

    // Focus inputs when they are enabled
    this.cnpInput = React.createRef(); 
    this.gradInput = React.createRef(); 
    this.numeInput = React.createRef();
    this.prenumeInput = React.createRef();
    this.utilizatorInput = React.createRef();
    this.parolaInput = React.createRef();

    this.modalInput = React.createRef();

    // React Select use case: blur input on select, then click on the save icon
    this.saveGrad = React.createRef();
    
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput(prevState) {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    if (this.state.editCnp) {
      this.cnpInput.current.focus();
    } 
    
    else

    /** Important! Check the previous state, 
     * otherwise the select menu will stay 
     * open when it's not supposed to */
    if (this.state.editGrad) {
      if(!prevState.editGrad) {
        this.gradInput.current.select.focus()
      }
    } 
    
    else

    if (this.state.editNume) {
      this.numeInput.current.focus();
    } 
    
    else

    if (this.state.editPrenume) {
      this.prenumeInput.current.focus();
    } 
    
    else

    if (this.state.editUtilizator) {
      this.utilizatorInput.current.focus();
    } 
    
    else

    if (this.state.editParola) {
      this.parolaInput.current.focus();
    }

    else

    if (this.state.showModal) {
      this.modalInput.current.focus();
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
      attributeValue: attributeValue.trim(),
      token: this.state.token,
      username: this.state.utilizator,
    })
  };

  let fCnp = false;
  let eCnp = false;

  let fGrad = false;
  let eGrad = false;

  let fNume = false;
  let eNume = false;

  let fPrenume = false;
  let ePrenume = false;

  let fUtilizator = false;
  let eUtilizator = false;

  let fParola = false;
  let eParola = false;

  switch(attributeName) {
 
    case 'cnp': {

      if (this.state.nextCnp !== '') {
        if (this.state.cnp !== this.state.nextCnp){
          fCnp = true;
        }
      } else {
        eCnp = true;
      }
      break;
    }

    case 'grad': {

      if (this.state.nextGrad !== '') {
        if(this.state.grad !== this.state.nextGrad) {
          fGrad = true;
        }
      } else {
        eGrad = true;
      }
      break;
    }

    case 'nume': {

      if (this.state.nextNume !== '') {
        if (this.state.nume !== this.state.nextNume) {
          fNume = true;
        }
      } else {
        eNume = true;
      }
      break;
    }

    case 'prenume': {

      if (this.state.nextPrenume !== '') {
        if (this.state.prenume !== this.state.nextPrenume) {
          fPrenume = true;
        }
    } else {
      ePrenume = true;
    }
      break;
    }

    case 'utilizator': {

      if (this.state.nextUtilizator !== '') {
        if (this.state.utilizator !== this.state.nextUtilizator) {
          fUtilizator = true;
        }
      } else {
        eUtilizator = true;
      }
      break;
    }

    case 'parola': {
      if (this.state.nextParola !== '') {
        if (this.state.parola !== this.state.nextParola) {
          fParola = true;
        }
      } else {
        eParola = true;
      }
      break;
    }
  }

    let approved = (
      fCnp || fGrad || fNume || fPrenume || fUtilizator || fParola
    );

    if (approved) {

      this.setState({
        fetchingCnp: fCnp,
        fetchingGrad: fGrad,
        fetchingNume: fNume,
        fetchingPrenume: fPrenume,
        fetchingUtilizator: fUtilizator,
        fetchingParola: fParola,

        backgroundClass: 'view-user-settings -modal-background',
        showModal: true,
      });

    } else {

      if (eCnp) {
        this.setState({
          editCnp: true,
          editCnpClass: this.state.iconClassNames.editing,
          valueCnpClass: this.state.valueClassNames.editing,
          showCnpError: true,
        });
      }

      else

      if (eGrad) {
        this.setState({
          editGrad: true,
          editGradClass: this.state.iconClassNames.editing,
          valueGradClass: this.state.valueClassNames.editing,
          showGradError: true,
        });
      }

      else 

      if (eNume) {
        this.setState({
          editNume: true,
          editNumeClass: this.state.iconClassNames.editing,
          valueNumeClass: this.state.valueClassNames.editing,
          showNumeError: true,
        });
      }

      else

      if (ePrenume) {
        this.setState({
          editPrenume: true,
          editPrenumeClass: this.state.iconClassNames.editing,
          valuePrenumeClass: this.state.valueClassNames.editing,
          showPrenumeError: true,
        });
      }

      else

      if (eUtilizator) {
        this.setState({
          editUtilizator: true,
          editUtilizatorClass: this.state.iconClassNames.editing,
          valueUtilizatorClass: this.state.valueClassNames.editing,
          showUtilizatorError: true,
        });
      }

      else

      if (eParola) {
        this.setState({
          editParola: true,
          editParolaClass: this.state.iconClassNames.editing,
          valueParolaClass: this.state.valueClassNames.editing,
          showParolaError: true,
        });
      }

    }
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
          let className = (this.state.editCnpClass === this.state.iconClassNames.edit || '' === this.state.nextCnp) ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = (this.state.valueCnpClass === this.state.valueClassNames.edit || '' === this.state.nextCnp) ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;

          if (this.state.editCnp) {
            this.update( 'cnp', this.state.nextCnp);
          }

          let edit = !this.state.editCnp || ('' === this.state.nextCnp);

          this.setState({
            editCnp: edit,
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

            nextGrad: this.props.user.grad,
            nextNume: this.props.user.nume,
            nextPrenume: this.props.user.prenume,
            nextUtilizator: this.props.user.utilizator,
            nextParola: '',

            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,

          });
          break;
        }

        case '--settings-grad-form':
        case '--settings-edit-grad': {
          let className = this.state.editGradClass === this.state.iconClassNames.edit || '' === this.state.nextGrad ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueGradClass === this.state.valueClassNames.edit || '' === this.state.nextGrad  ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
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

            nextCnp: this.props.user.loc,
            nextNume: this.props.user.nume,
            nextPrenume: this.props.user.prenume,
            nextUtilizator: this.props.user.utilizator,
            nextParola: '',

            showCnpError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          });
          
          break;
        }

        case '--settings-nume-form':
        case '--settings-edit-nume': {
          let className = this.state.editNumeClass === this.state.iconClassNames.edit  || '' === this.state.nextNume ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueNumeClass === this.state.valueClassNames.edit || '' === this.state.nextNume  ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editNume) {
            this.update( 'nume', this.state.nextNume);
          }

          let edit = !this.state.editNume  || '' === this.state.nextNume; 

          this.setState({
            editNume: edit,
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

            nextCnp: this.props.user.loc,
            nextGrad: this.props.user.grad,
            nextPrenume: this.props.user.prenume,
            nextUtilizator: this.props.user.utilizator,
            nextParola: '',

            showCnpError: false,
            showGradError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          });
          break;
        }

        case '--settings-prenume-form':
        case '--settings-edit-prenume': {
          let className = this.state.editPrenumeClass === this.state.iconClassNames.edit || '' === this.state.nextPrenume ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valuePrenumeClass === this.state.valueClassNames.edit || '' === this.state.nextPrenume ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editPrenume) {
            this.update( 'prenume', this.state.nextPrenume);
          }

          let edit = !this.state.editPrenume  || '' === this.state.nextPrenume;

          this.setState({
            editPrenume: edit,
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

            nextCnp: this.props.user.loc,
            nextGrad: this.props.user.grad,
            nextNume: this.props.user.nume,
            nextUtilizator: this.props.user.utilizator,
            nextParola: '',

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          });
          break;
        }

        case '--settings-utilizator-form':
        case '--settings-edit-utilizator': {
          let className = this.state.editUtilizatorClass === this.state.iconClassNames.edit  || '' === this.state.nextUtilizator ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueUtilizatorClass === this.state.valueClassNames.edit || '' === this.state.nextUtilizator ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          if (this.state.editUtilizator) {
            this.update( 'utilizator', this.state.nextUtilizator);
          }

          let edit = !this.state.editUtilizator  || '' === this.state.nextUtilizator;

          this.setState({
            editUtilizator: edit,
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

            nextCnp: this.props.user.loc,
            nextGrad: this.props.user.grad,
            nextNume: this.props.user.nume,
            nextPrenume: this.props.user.prenume,
            nextParola: '',

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showParolaError: false,
          });
          break;
        }

        case '--settings-parola-form':
        case '--settings-edit-parola': {
          let className = this.state.editParolaClass === this.state.iconClassNames.edit || '' === this.state.nextParola ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueParolaClass === this.state.valueClassNames.edit || '' === this.state.nextParola ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          let passwordVisible = false;

          if (className === this.state.iconClassNames.edit &&
              valueClassName == this.state.valueClassNames.edit) {
                passwordVisible = false;
          }

          if (this.state.editParola) {
            this.update( 'parola', this.state.nextParola);
          }

          let edit = !this.state.editParola || '' === this.state.nextParola;

          this.setState({
            editParola: edit,
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

            nextCnp: this.props.user.loc,
            nextGrad: this.props.user.grad,
            nextNume: this.props.user.nume,
            nextPrenume: this.props.user.prenume,
            nextUtilizator: this.props.user.utilizator,

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
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
        charCode !== 17 && charCode !== 46 && charCode !== 13 &&
        !(charCode >= 37 && charCode <= 40)) {
        e.preventDefault();
        return false;
      }
    }

    if (e && e.target.value.length > 13) {
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

    if (27 === charCode) {console.log(e.target)
      if (this.state.showModal) {

        this.closeModal();

      } else {
        this.onViewSettingsClick({target: {id: 'view-user-settings'}});
      }
      
    } 

    if (e && e.target.value.length > 64) {
      if(charCode !== 8 && charCode !== 9 && 
          charCode !== 17 && charCode !== 46 && charCode !== 13 &&
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
          nextGrad: optional.value,

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

        case '-modal-password': {
          this.setState({
            modalPassword: e.target.value,
            showModalError: false,
          })

          break;
        }

        case '--settings-cnp': {

          this.setState({
            nextCnp: e.target.value,

            showCnpError: false,
            showGradError: false,
            showNumeError: false,
            showPrenumeError: false,
            showUtilizatorError: false,
            showParolaError: false,
          });
          break;
        }

        case '--settings-nume': {
          this.setState({
            nextNume: e.target.value,

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
            nextPrenume: e.target.value,

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
            nextUtilizator: e.target.value,

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
            nextParola: e.target.value,

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

  openModal(e) {
    this.setState({
      backgroundClass: 'view-user-settings -modal-background',
      showModal: true,
    });
  }

  closeModal(e) {
    this.setState({
      backgroundClass: 'view-user-settings',
      showModal: false,
      modalPassword: '',

      editCnp: false,
      editGrad: false,
      editNume: false,
      editPrenume: false,
      editUtilizator: false,
      editParola: false,

      editCnpClass: this.state.iconClassNames.edit,
      editGradClass: this.state.iconClassNames.edit,
      editNumeClass: this.state.iconClassNames.edit,
      editPrenumeClass: this.state.iconClassNames.edit,
      editUtilizatorClass: this.state.iconClassNames.edit,
      editParolaClass: this.state.iconClassNames.edit,

      valueCnpClass: this.state.valueClassNames.edit,
      valueGradClass: this.state.valueClassNames.edit,
      valueNumeClass: this.state.valueClassNames.edit,
      valuePrenumeClass: this.state.valueClassNames.edit,
      valueUtilizatorClass: this.state.valueClassNames.edit,
      valueParolaClass: this.state.valueClassNames.edit,

      nextCnp: this.props.user.loc,
      nextGrad: this.props.user.grad,
      nextNume: this.props.user.nume,
      nextPrenume: this.props.user.prenume,
      nextUtilizator: this.props.user.utilizator,
      nextParola: '',

      showCnpError: false,
      showGradError: false,
      showNumeError: false,
      showPrenumeError: false,
      showUtilizatorError: false,
      showParolaError: false,

      fetchingCnp: false,
      fetchingGrad: false,
      fetchingNume: false,
      fetchingPrenume: false,
      fetchingUtilizator: false,
      fetchingParola: false,
    });
  }

  submitModal(e) {
    e.preventDefault(); 

    let user = this.state.utilizator;
    let pass = this.state.modalPassword;

    let show = this.state.showModal;

    let credentials = {
      user: user,
      pass: pass,
    };

    let valid = (user !== '' && pass !== '');

    if (show && valid) {
      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      };

      fetch('http://localhost:3001/login', requestOptions)
      .then(response => response.json())
      .then(login => {

        if (login.status === 'allowed') {

          this.setState({

            showModal: false,
            showModalError: false,
            backgroundClass: 'view-user-settings',

            modalPassword: '',
          }, 
          
          () => {

            //this.props.onUserUpdate(login.token, login.user);

            let attributeName = '';
            let attributeValue = '';
  
            if (this.state.fetchingCnp) {
              attributeName = 'cnp';
              attributeValue = this.state.nextCnp;
            }
  
            else
  
            if (this.state.fetchingGrad) {
              attributeName = 'grad';
              attributeValue = this.state.nextGrad;
            }
  
            else
  
            if (this.state.fetchingNume) {
              attributeName = 'nume';
              attributeValue = this.state.nextNume;
            }
  
            else
  
            if (this.state.fetchingPrenume) {
              attributeName = 'prenume';
              attributeValue = this.state.nextPrenume;
            }
  
            else 
  
            if (this.state.fetchingUtilizator) {
              attributeName = 'utilizator';
              attributeValue = this.state.nextUtilizator;
            }
  
            else 
  
            if (this.state.fetchingParola) {
              attributeName = 'parola';
              attributeValue = this.state.nextParola;
            }
  
            const requestSettingsOptions = {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                attributeName: attributeName,
                attributeValue: attributeValue.trim(),
                token: this.state.token,
                username: this.state.utilizator,
              })
            };
  
            let fetchApproved = (
              this.state.fetchingCnp ||
              this.state.fetchingGrad ||
              this.state.fetchingNume ||
              this.state.fetchingPrenume ||
              this.state.fetchingUtilizator ||
              this.state.fetchingParola
            );
      
            if (fetchApproved && attributeName && attributeValue) {
              fetch('http://localhost:3001/main/setari', requestSettingsOptions)
              .then(response => response.json())
              .then(updated => {
      
                if ('denied' === updated.status) {
                  this.props.onChange('Login'); /* render login component when something is wrong with authorization (!) */
                } else {
                  if ('invalid' === updated.status || 'error' === updated.status) {
                    switch(attributeName) {
                      case 'cnp': {
                        this.setState({
                          fetchingCnp: false,
                          fetchingGrad: false,
                          fetchingNume: false,
                          fetchingPrenume: false,
                          fetchingUtilizator: false,
                          fetchingParola: false,
      
                          editCnp: true,
                          valueCnpClass: this.state.valueClassNames.editing,
                          editCnpClass: this.state.iconClassNames.editing,
      
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
      
                          editGrad: true,
                          valueGradClass: this.state.valueClassNames.editing,
                          editGradClass: this.state.iconClassNames.editing,
      
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
      
                          editNume: true,
                          valueNumeClass: this.state.valueClassNames.editing,
                          editNumeClass: this.state.iconClassNames.editing,
      
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
      
                          editPrenume: true,
                          valuePrenumeClass: this.state.valueClassNames.editing,
                          editPrenumeClass: this.state.iconClassNames.editing,
      
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
      
                          editUtilizator: true,
                          valueUtilizatorClass: this.state.valueClassNames.editing,
                          editUtilizatorClass: this.state.iconClassNames.editing,
      
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
      
                          editParola: true,
                          valueParolaClass: this.state.valueClassNames.editing,
                          editParolaClass: this.state.iconClassNames.editing,
      
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

                      modalPassword: '',
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

                modalPassword: '',
                //showError: true,
              });
            });
            }
          });

        } else {

          this.setState({
            showModalError: true
          });

        }
      });

    } else {

      if (show && !pass) {

        this.setState({
          showModalError: true,
        });

      }
    }
  }

  componentDidMount() {}

  componentDidUpdate (prevProps, prevState) {
    // Focus input elements when they are enabled
    this.focusInput(prevState);
  }

  render() {
    return (
      <div>
        <div>Setările contului de utilizator</div>
        <hr className='view--separator'/>
        <div className='-modal'
          style={{
            visibility: this.state.showModal ? 'visible' : 'hidden'
          }}>
          <div className='-modal-container'
            style={{
              height: this.state.confirmNewPassword ? '400px' : '250px'
            }}>
            <div className='-modal-title'>
              <i className='far fa-times-circle -modal-close'
                onClick={this.closeModal}></i>
              <i className='far fa-id-card -modal-title-icon'></i>
              <span className='-modal-title-text'>
                Introdu parola curentă pentru confirmare
              </span>
            </div>
            <hr className='-modal-separator'/> 
            <form id='-modal-content'
              className='-modal-content'
              onSubmit={this.submitModal}>
              <Tippy
                content={
                  <>
                    <i className='fas fa-minus-circle'></i> Parolă invalidă
                  </>
                }
                allowHTML={true}
                placement='bottom'
                arrow={false}
                theme='red-material-warning'
                offset={[0, 2]}
                visible={this.state.showModalError}>
                <input id='-modal-password'
                  className='-modal-password'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck={false}
                  onInput={this.onValueInput}
                  onKeyDown={this.onGenericKeyDown}
                  value={this.state.modalPassword}
                  type='password'
                  ref={this.modalInput}>
                </input>
              </Tippy>
              <button className='-modal-button'>
                Continuă
              </button>
              <button className='-modal-cancel-button'
                onClick={this.closeModal}>
                Renunță
              </button>
            </form>
          </div>
        </div>
        <div id='view-user-settings' 
          className={this.state.backgroundClass}
          onClick={this.onViewSettingsClick}>
            <div id='user-settings-container'>
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
                visible={this.state.showCnpError}>
                <form id='--settings-cnp-form'
                  className='--settings-form'
                  onSubmit={this.handleSettingsSubmit}>
                  <span>
                    Locul nașterii
                  </span>
                  <input id='--settings-cnp'
                    autoComplete='off'
                    autoCorrect='off'
                    spellCheck={false}
                    className={this.state.valueCnpClass}
                    disabled={!this.state.editCnp}
                    onInput={this.onValueInput}
                    onKeyDown={this.onGenericKeyDown}
                    value={this.state.nextCnp}
                    ref={this.cnpInput}>
                  </input>
                  <i id='--settings-edit-cnp' 
                    className={this.state.editCnpClass}
                    onClick={this.handleSettingsSubmit}></i>
                </form>
              </Tippy>
              <Spinner
                status='loading'
                className='--settings-loading'
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
                      defaultValue={this.state.grade.find(option => option.value === this.state.nextGrad)}
                      value={this.state.grade.find(option => option.value === this.state.nextGrad)}
                      onInputChange={(inputValue, action) => this.onSelect(null, {id: 'grad', value: inputValue, action: action.action})}
                      onChange={(inputValue,action) => this.onSelect(null, {id: 'grad', value: inputValue.value, action: action.action})}
                      maxMenuHeight={100}
                      placeholder='Selectează...'
                      noOptionsMessage={(msg) => 'Nu există'}
                      className='sel-container'
                      classNamePrefix='sel' 
                      options={this.state.grade} 
                      onKeyDown={this.onGenericKeyDown}
                      ref={this.gradInput}
                      openMenuOnFocus={true}
                      closeMenuOnSelect={true}
                      blurInputOnSelect={true}
                      //onMenuClose={this.submitOnMenuClose}
                      inputId='--grad-select-input'/> 
                    <i id='--settings-edit-grad'  
                      className={this.state.editGradClass}
                      onClick={this.handleSettingsSubmit}
                      ref={this.saveGrad}></i>
                  </form>
              </Tippy>
              <Spinner
                status='loading'
                className='--settings-loading'
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
                status='loading'
                className='--settings-loading'
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
                status='loading'
                className='--settings-loading'
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
                status='loading'
                className='--settings-loading'
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
              status='loading'
              className='--settings-loading'
              visibility={this.state.fetchingParola}/>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Setari;
