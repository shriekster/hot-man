import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner';

import CategorieConfort from './CategorieConfort'

class ConfortUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.saveItem = this.saveItem.bind(this);

    this.deleteItem = this.deleteItem.bind(this);

    this.createItem = this.createItem.bind(this);

    this.startCreating = this.startCreating.bind(this);

    this.cancelCreating = this.cancelCreating.bind(this);

    this.generateKey = this.generateKey.bind(this);

    this.state = {
      categoriiConfort: [],

      creating: false,
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

  saveItem(value, isFresh) { // TODO: 'stale' item, i.e. the item is not fresh anymore
    let body;

    if (isFresh) {
      body = {
        token: this.props.token,
        task: 'create',
        value: value.trim(),
      };
    } else {
      body = {
        token: this.props.token,
        task: 'update',
        value: value.trim(),
      };
    }
  
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    fetch('http://localhost:3001/main/administrare/confort', requestOptions)
    .then(response => response.json())
    .then(updated => {
      console.log(updated) //TO:DO: finish

      if ('valid' === updated.status) {
        /** Make the item 'stale' */
        let categorii = this.state.categoriiConfort;

        categorii.forEach(item => {

        if (item.Denumire === body.value) {
          item.fresh = false;
          item.editing = false;
        }
        });

        this.setState({
          categoriiConfort: categorii,
        });
      }
    });
  }

  deleteItem(value) {

  }

  createItem() {
    let categorii = this.state.categoriiConfort;

    if (categorii[categorii.length - 1].Denumire){
      categorii.push({Denumire: '', editing: true, fresh: true});

      this.setState({
        categoriiConfort: categorii,

        creating: true,
      });
    }
  }

  startCreating() {
    this.setState({
      creating: true
    });
  }

  cancelCreating() {
    let categorii = this.state.categoriiConfort;

    if('' === categorii[categorii.length - 1].Denumire) {
      categorii.pop();

      this.setState({
        categoriiConfort: categorii,

        creating: false,
      });
    }  
  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  componentDidMount() {
    /** 'descarc' categoriile de confort */
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'read',
      })
    };

    fetch('http://localhost:3001/main/administrare/confort', requestOptions)
    .then(response => response.json())
    .then(categorii => {
      if ('error' === categorii.status) {
        console.log('Eroare - categorii confort')
      } else 
      
      if ('valid' === categorii.status) {
        this.setState({
          categoriiConfort: categorii.categoriiConfort,
        });

      } else 
      if ('denied' === categorii.status) {
        this.signOut();
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
  }
// div: --settings-item
// input: --settings-value -inline ; --value-editing
  render() {

    const categories = this.state.categoriiConfort.map(
      (categorie) =>

      <CategorieConfort 
      key={this.generateKey()}
      value={categorie.Denumire}
      save={this.saveItem}
      delete={this.deleteItem}
      cancel={this.cancelCreating}
      editing={undefined === categorie.editing || false === categorie.editing ? false : true}
      fresh={undefined === categorie.fresh || false === categorie.fresh ? false : true}
      />
    );

    return (
      <div id='view-confort-categories' 
          className='view-confort-categories'>
          <div id='confort-categories' 
          className='confort-categories'>
            {categories}
          </div>
          <div className='--confort-add'>
          {
            this.state.creating ?
            <Tippy
              content={
                <>
                  Introdu denumirea categoriei de confort
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-disabled'
              offset={[0, 20]}>
              <i className='fas fa-plus-square --add-icon --add-disabled'></i>
            </Tippy>
                              :
            <Tippy
              content={
                <>
                  Adaugă o categorie de confort
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-hints'
              offset={[0, 20]}>
              <i className='fas fa-plus-square --add-icon'
                onClick={this.createItem}></i>
            </Tippy>
          }
            </div>
        </div>
    );
  }
}

export default ConfortUpdater;
