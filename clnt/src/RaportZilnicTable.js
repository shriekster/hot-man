import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner'

function Romani (props) {
  return (
    <>
  <thead>
  <tr>
    <th className='--zilnic-th'><span>Cetățeni români </span>
      <i className='fas fa-caret-right --zilnic-right-arrow'
        onClick={() => {props.changeTable('Straini')}}></i>
      </th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>Table data</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Table footer data</td>
    </tr>
  </tfoot>
  </>
  );
}

function Straini (props) {
  return (
    <>
  <thead>
  <tr>
  <th className='--zilnic-th'>
    <i className='fas fa-caret-left --zilnic-left-arrow'
      onClick={() => {props.changeTable('Romani')}}></i><span> Cetățeni străini</span>
  </th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td>Table data</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>Table footer data</td>
    </tr>
  </tfoot>
  </>
  );
}

class RaportZilnicTable extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);
    
    this.changeTable = this.changeTable.bind(this);

    this.state = {
      components: {
        Romani: Romani,
        Straini: Straini
      },

      defaultComponent: Romani,
      defaultComponentName: 'Romani',
    };
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
      this.onViewSettingsClick({target: {id: 'view-user-settings'}})
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

  changeTable(component=this.state.defaultComponntName) {
    let nextView = component;

    if(Object.keys(this.state.components).includes(nextView)) {
      nextView = this.state.components[component];

    } else {
    }

    switch(component) {
      case 'Romani': {
        break;
      }

      case 'Straini': {
        break;
      }
    }

    this.setState({
      defaultComponent: nextView,
    });
  }

  componentDidMount() {
    
  }

  componentDidUpdate (prevProps, prevState) {
  }

  render() {
    let Component = this.state.defaultComponent;

    return (
      <div id='raport-zilnic-table'
        className='zilnic-table-container'>
        <table className='--zilnic-table'>
          <Component
            changeTable={this.changeTable} />
        </table>
      </div>
    );
  }
}

export default RaportZilnicTable;
