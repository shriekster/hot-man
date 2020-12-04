import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';

class Setari extends React.Component {
  constructor(props) {
    super(props);

    this.editItem = this.editItem.bind(this);

    this.state = {
      fetching: false,
      editCnp: false,
      editGrad: false,
      editNume: false,
      editPrenume: false,
      editUtilizator: false,
      editParola: false,
    };
  }

  editItem(itemName) {
    ;
  }

  render() {
    return (
      <div>
        <div>Setările utilizatorului</div>
        <hr/>
        <div className='view-user-settings'>
          <div className='--settings-item'>
            <span>
              CNP
            </span>
            <div 
              className='--settings-value -inline'
              contentEditable={this.state.editCnp}>
              {this.props.user.cnp}
            </div>
            <i className='fas fa-edit --settings-edit'></i>
          </div>
          <div className='--settings-item'>
            <span>
              Grad
            </span>
            <div 
              className='--settings-value -inline'
              contentEditable={this.state.editGrad}>
              {this.props.user.grad}
            </div>
            <i className='fas fa-edit --settings-edit'></i>
          </div>
          <div className='--settings-item'>
            <span>
              Nume
            </span>
            <div 
              className='--settings-value -inline'
              contentEditable={this.state.editNume}>
              {this.props.user.nume}
            </div>
            <i className='fas fa-edit --settings-edit'></i>
          </div>
          <div className='--settings-item'>
            <span>
              Prenume
            </span>
            <div 
              className='--settings-value -inline'
              contentEditable={this.state.editPrenume}>
              {this.props.user.prenume}
            </div>
            <i className='fas fa-edit --settings-edit'></i>
          </div>
          <div className='--settings-item'>
            <span>
              Utilizator
            </span>
            <div 
              className='--settings-value -inline'
              contentEditable={this.state.editUtilizator}>
              {this.props.user.utilizator}
            </div>
            <i className='fas fa-edit --settings-edit'></i>
          </div>
          <div className='--settings-item'>
            <span>
              Parolă
            </span>
            <div 
              className='--settings-value -inline'
              contentEditable={this.state.editParola}>
            </div>
            <i className='fas fa-edit --settings-edit'></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Setari;
