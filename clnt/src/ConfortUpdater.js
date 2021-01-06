import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';
import Spinner from './Spinner';

import CategorieConfort from './CategorieConfort'
import { unstable_batchedUpdates } from 'react-dom';

class ConfortUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.saveItem = this.saveItem.bind(this);

    this.deleteItem = this.deleteItem.bind(this);

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

  saveItem(isFresh, oldValue, newValue) {
    let body;

    if (isFresh) {

      body = {
        token: this.props.token,
        task: 'create',
        value: newValue.trim(),
      };

    } else {

      body = {
        token: this.props.token,
        task: 'update',
        oldValue: oldValue.trim(),
        newValue: newValue.trim(),
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

      if ('valid' === updated.status) {
        /** Make the item 'stale' */
        let categorii = this.state.categoriiConfort;
        let value = newValue.trim();

        categorii.forEach(item => {

          if (item.Denumire === '') {
            item.fresh = false;
            item.editing = false;
            item.fetching = false;
            item.error = false;
            item.Denumire = value;
          }

          else 

          if (item.Denumire === body.oldValue) {
            item.Denumire = value;
          }
        });

        let sorted = categorii.sort(function compare(a, b) {
          return a.Denumire - b.Denumire;
        });

        this.setState({
          categoriiConfort: sorted,

          creating: false,
        });
      }

      else

      if ('error' === updated.status || 'invalid' === updated.status){

        let categorii = this.state.categoriiConfort;
        let value = newValue.trim();

        categorii.forEach(item => {

          if (item.Denumire === value) {
            item.fresh = false;
            item.editing = false;
            item.fetching = false;
            item.error = true;
          }
        });

        this.setState({
          categoriiConfort: categorii,
          creating: false,
        });
      }

      else 

      if ('duplicate' === updated.status){

        /*
        let categorii = this.state.categoriiConfort;

        categorii.forEach(item => {

          item.fresh = false;
          item.editing = false;
          item.fetching = false;
          item.error = false;
        });
        */
        this.setState({
          //categoriiConfort: categorii,
          creating: false,
        });
      }
    });
  }

  deleteItem(value) {

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'delete',
        value: value.trim(),
      }),
    };

    fetch('http://localhost:3001/main/administrare/confort', requestOptions)
    .then(response => response.json())
    .then(updated => {
      if ('valid' === updated.status) {
        
        let categorii = this.state.categoriiConfort;
        let val = value.trim();
        let index = 0;

        for (let i = 0; i < categorii.length; i++ ) {

          if (val === categorii[i].Denumire) {

            index = i;
          }
        }
        
        categorii.splice(index, 1);

        this.setState({
          categoriiConfort: categorii,

          creating: false,
        })
        
      }

      else {

        let categorii = this.state.categoriiConfort;

        categorii.forEach(item => {
          item.fresh = false;
          item.editing = false;
          item.fetching = false;
          item.error = false;
        });

        this.setState({
          categoriiConfort: categorii,
          creating: false,
        });
      }
    });
  }

  startCreating() {
    let categorii = this.state.categoriiConfort;

    if (categorii[categorii.length - 1].Denumire){
      categorii.push({Denumire: '', editing: true, fresh: true});

      this.setState({
        categoriiConfort: categorii,

        creating: true,
      });
    }
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
      } 
      
      else 
      
      if ('valid' === categorii.status) {

        let sorted = categorii.categoriiConfort.sort(function compare(a, b) {
          return a.Denumire - b.Denumire;
        });

        this.setState({
          categoriiConfort: sorted,
        });

      } 
      
      else

      if ('denied' === categorii.status) {
        this.props.onChange('Login');
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
  }
// div: --settings-item
// input: --settings-value -inline ; --value-editing
  render() {

    let categorii = this.state.categoriiConfort;

    const categories = categorii.map(
      (categorie) =>

      <CategorieConfort 
      key={this.generateKey()}
      value={categorie.Denumire}
      save={this.saveItem}
      delete={this.deleteItem}
      cancel={this.cancelCreating}
      editing={undefined === categorie.editing || false === categorie.editing ? false : true}
      fresh={undefined === categorie.fresh || false === categorie.fresh ? false : true}
      fetching={undefined === categorie.fetching || false === categorie.fetching ? false : true}
      error={undefined === categorie.error || false === categorie.error ? false : true}
      />
    );

    return (
      <div id='view-confort-categories' 
          className='view-confort-categories'>
          <div id='confort-categories' 
          className='confort-categories'>
            <div className='confort-categories-inside'>
              {categories}
            </div>
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
                onClick={this.startCreating}></i>
            </Tippy>
          }
            </div>
        </div>
    );
  }
}

export default ConfortUpdater;
