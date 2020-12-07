import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import PasswordInput from './PasswordInput';

class Setari extends React.Component {
  constructor(props) {
    super(props);

    this.editItem = this.editItem.bind(this);

    this.onValueInput = this.onValueInput.bind(this);

    this.onIconClick = this.onIconClick.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.onSelect = this.onSelect.bind(this);

    this.state = {
      fetching: false,
      editCnp: false,
      editGrad: false,
      editNume: false,
      editPrenume: false,
      editUtilizator: false,
      editParola: false,

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
  }

  editItem(itemName) {
    ;
  }

  onIconClick(e) {
    if (e && e.target && e.target.id) {
      switch (e.target.id) {
        case '--settings-edit-cnp': {
          let className = this.state.editCnpClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueCnpClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
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

        case '--settings-edit-grad': {
          let className = this.state.editGradClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueGradClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
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

        case '--settings-edit-nume': {
          let className = this.state.editNumeClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueNumeClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
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

        case '--settings-edit-prenume': {
          let className = this.state.editPrenumeClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valuePrenumeClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
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

        case '--settings-edit-utilizator': {
          let className = this.state.editUtilizatorClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueUtilizatorClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
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

        case '--settings-edit-parola': {
          let className = this.state.editParolaClass === this.state.iconClassNames.edit ? this.state.iconClassNames.editing : this.state.iconClassNames.edit; 
          let valueClassName = this.state.valueParolaClass === this.state.valueClassNames.edit ? this.state.valueClassNames.editing : this.state.valueClassNames.edit;
          
          this.setState({
            editParola: !this.state.editParola,
            editParolaClass: className,
            valueParolaClass: valueClassName,

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

    if (e && e.target.innerText.length > 12) {
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

    if (e && e.target.innerText.length > 64) {
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
          nextGrad: optional.value.trim()
        });
      }
    }
  }

  onValueInput(e) {
    if (e && e.target && e.target.id) {
      switch (e.target.id) {
        case '--settings-cnp': {
          if (e.target.innerText) {
            this.setState({
              nextCnp: e.target.innerText
            })
          }
          break;
        }

        case '--settings-nume': {
          if (e.target.innerText) {
            this.setState({
              nextNume: e.target.innerText
            })
          }
          break;
        }

        case '--settings-prenume': {
          if (e.target.innerText) {
            this.setState({
              nextPrenume: e.target.innerText
            })
          }
          break;
        }

        case '--settings-utilizator': {
          if (e.target.innerText) {
            this.setState({
              nextUtilizator: e.target.innerText
            })
          }
          break;
        }

        case '--settings-parola': {
          if (e.target.innerText) {
            this.setState({
              nextParola: e.target.innerText
            })
          }
          break;
        }
      }
    }
  }

  componentDidMount() {
  }

  componentDidUpdate () {
    console.log(this.state.nextCnp, this.state.nextGrad, this.state.nextNume, this.state.nextPrenume, this.state.nextUtilizator, this.state.nextParola)
  }

  render() {
    return (
      <div>
        <div>Setările contului</div>
        <hr className='view--separator'/>
        <div className='view-user-settings'>
          <div className='--settings-item'>
            <span>
              CNP
            </span>
            <div id='--settings-cnp'
              className={this.state.valueCnpClass}
              contentEditable={this.state.editCnp}
              onInput={this.onValueInput}
              onKeyDown={this.onKeyDown}>
              {this.props.user.cnp}
            </div>
            <i id='--settings-edit-cnp' 
              className={this.state.editCnpClass}
              onClick={this.onIconClick}></i>
          </div>
          <div className='--settings-item'>
            <span>
              Grad
            </span>
            <Select
              isDisabled={!this.state.editGrad}
              defaultValue={this.state.grade.find(option => option.value === this.props.user.grad)}
              onInputChange={(inputValue, action) => this.onSelect(null, {id: 'grad', value: inputValue, action: action.action})}
              onChange={(inputValue,action) => this.onSelect(null, {id: 'grad', value: inputValue.value, action: action.action})}
              maxMenuHeight={100}
              placeholder='Selectează...'
              noOptionsMessage={(msg) => 'Nu există'}
              className='sel-container'
              classNamePrefix='sel' 
              options={this.state.grade} /> 
            <i id='--settings-edit-grad'  
              className={this.state.editGradClass}
              onClick={this.onIconClick}></i>
          </div>
          <div className='--settings-item'>
            <span>
              Nume
            </span>
            <div id='--settings-nume'
              className={this.state.valueNumeClass}
              contentEditable={this.state.editNume}
              onInput={this.onValueInput}
              onKeyDown={this.onGenericKeyDown}>
              {this.props.user.nume}
            </div>
            <i id='--settings-edit-nume' 
              className={this.state.editNumeClass}
              onClick={this.onIconClick}></i>
          </div>
          <div className='--settings-item'>
            <span>
              Prenume
            </span>
            <div id='--settings-prenume'
              className={this.state.valuePrenumeClass}
              contentEditable={this.state.editPrenume}
              onInput={this.onValueInput}
              onKeyDown={this.onGenericKeyDown}>
              {this.props.user.prenume}
            </div>
            <i id='--settings-edit-prenume'
              className={this.state.editPrenumeClass}
              onClick={this.onIconClick}></i>
          </div>
          <div className='--settings-item'>
            <span>
              Utilizator
            </span>
            <div id='--settings-utilizator'
              className={this.state.valueUtilizatorClass}
              contentEditable={this.state.editUtilizator}
              onInput={this.onValueInput}
              onKeyDown={this.onGenericKeyDown}>
              {this.props.user.utilizator}
            </div>
            <i id='--settings-edit-utilizator' 
              className={this.state.editUtilizatorClass}
              onClick={this.onIconClick}></i>
          </div>
          <div className='--settings-item'>
            <span>
              Parolă
            </span>
            <div id='--settings-parola'
              className={this.state.valueParolaClass}
              contentEditable={this.state.editParola}
              onInput={this.onValueInput}
              onKeyDown={this.onGenericKeyDown}>
            </div>
            <i id='--settings-edit-parola' 
              className={this.state.editParolaClass}
              onClick={this.onIconClick}></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Setari;
