import React from 'react';
import Tippy from '@tippyjs/react';

import CategorieSpatiu from './CategorieSpatiu';

class SpatiiUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onGenericKeyDown = this.onGenericKeyDown.bind(this);

    this.add = this.add.bind(this);

    this.edit = this.edit.bind(this);

    this.input = this.input.bind(this);

    this.save = this.save.bind(this);

    this.cancel = this.cancel.bind(this);

    this.delete = this.delete.bind(this);

    this.generateKey = this.generateKey.bind(this);

    this.state = {
      backup: [],

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

  add() {

    this.setState({

      creating: true,

    }, () => {

      if (this.state.creating) {

        let categorii = this.state.categoriiConfort;
        let backup = this.state.backup;

        let newItem = {

          index: this.state.backup.length, //??

          Denumire: '',
          showWarning: false,
          showError: false,

          isFresh: true,
          isEditing: true,

          isFetching: false,
        };


        if (0 === categorii.length) {

          categorii.push(newItem);
          backup.push('');
        }

        else {

          let last = categorii[categorii.length - 1].Denumire;
          let backupLast = backup[backup.length - 1];

          if (last && backupLast) {
            /** 'Reset' every other item's state when a new item is being added */
            categorii.forEach( item => {

              item.showWarning = false;
              item.showError = false;
              item.isFresh = false;
              item.isEditing = false;
              item.isFetching = false;

            });

            categorii.push(newItem);
            backup.push('');
          }
        }

        this.setState({
          backup: backup,
          categoriiConfort: categorii,
        });
      }
    });
  }

  edit(index) {

    let categorii = this.state.categoriiConfort;
    let backup = this.state.backup;

    if (index >= 0 && index < categorii.length) {

      for (let i = 0; i < categorii.length; i++) {

        if (index == i) {

          categorii[i].showWarning = false;
          categorii[i].showError = false
          categorii[i].isFresh = false;
    
          categorii[i].isEditing = true;
    
          categorii[i].isFetching = false;
          
        } else {

          if (categorii[i].isFresh) {

            categorii.pop();
            backup.pop();

          } else {

            categorii[i].Denumire = backup[i];

            categorii[i].showWarning = false;
            categorii[i].showError = false
            categorii[i].isFresh = false;
            categorii[i].isEditing = false;
            categorii[i].isFetching = false;

          }
        }
      }

      this.setState({
        backup: backup,
        categoriiConfort: categorii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(index, newValue) {

    let categorii = this.state.categoriiConfort;

    if (index >= 0 && index < categorii.length ) {

      categorii[index].Denumire = newValue;

      /** Hide the error or warning tippy */
      categorii[index].showWarning = false;
      categorii[index].showError = false;
    }
    
    this.setState({
      categoriiConfort: categorii,
    });
  }

  save(index) {

    let body;
    let backup = this.state.backup;
    let categorii = this.state.categoriiConfort;

    if (index >= 0 && index < categorii.length) {

      /** Empty input value on saving */
      if (!categorii[index].Denumire) {

        categorii[index].showWarning = true;

        categorii[index].showError = false;

        categorii[index].isFetching = false;

        this.setState({
          categoriiConfort: categorii,
        });
      }

      else 
      
      /** The input value is the same as before being edited */
      if (categorii[index].Denumire === backup[index]) {

        categorii[index].showWarning = false;
        categorii[index].showError = false;
        categorii[index].isFresh = false;
        categorii[index].isEditing = false;
        categorii[index].isFetching = false;

        this.setState({
          categoriiConfort: categorii,
        })
      }

      /** A new, non-empty value is to be saved */
      else {

        if (categorii[index].isFresh) {

          body = {
            token: this.props.token,
            task: 'create',
            value: categorii[index].Denumire.trim(),
          };
    
        } else {
    
          body = {
            token: this.props.token,
            task: 'update',
            oldValue: backup[index],
            newValue: categorii[index].Denumire.trim(),
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
          
          if (updated && updated.status) {
  
            switch (updated.status) {
  
              case 'valid': {
  
                backup[index] = categorii[index].Denumire.trim();
  
                categorii[index].showWarning = false;
                categorii[index].showError = false;
                categorii[index].isFresh = false;
                categorii[index].isEditing = false;
                categorii[index].isFetching = false;
  
                let sorted = categorii.sort(function compare(a, b) {
                  return a.Denumire - b.Denumire;
                });
  
                /** Rewrite the indexes so that they are also sorted */
                let _index = 0;
  
                sorted.forEach(item => {
  
                  item.index = _index++;
  
                });
  
                let sortedBackup = backup.sort(function compare(a, b) {
                  return a - b;
                });
  
                this.setState({
                  backup: sortedBackup,
                  categoriiConfort: sorted,
                  creating: false,
                });
  
                break;
              }
  
              case 'error':
              case 'invalid':
              case 'duplicate': {
  
                categorii[index].showWarning = false;
  
                categorii[index].showError = true;
                categorii[index].isEditing = true;
  
                categorii[index].isFetching = false;
  
                this.setState({
                  categoriiConfort: categorii,
                });
  
                break;
              }
  
              case 'denied': {
                this.props.onChange('Login');
  
                break;
              }
            }
          }
        });
      }
    }
    
  }

  delete(index) {

    let categorii = this.state.categoriiConfort;
    let backup = this.state.backup;
   
    let toDelete = '';

    if (index >= 0 && index < categorii.length) {

      toDelete = backup[index];

    }

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'delete',
        value: toDelete,
      }),
    };

    fetch('http://localhost:3001/main/administrare/confort', requestOptions)
    .then(response => response.json())
    .then(updated => {

      if ('valid' === updated.status) {
        
        categorii.splice(index, 1);
        backup.splice(index, 1);

        /** Rewrite the indexes so that they are also sorted */
        let _index = 0;

        categorii.forEach(item => {

          item.index = _index++;

        });

        this.setState({
          backup: backup,
          categoriiConfort: categorii,

          creating: false,
        })
        
      }

      else {

        let categorii = this.state.categoriiConfort;

        categorii.forEach(item => {
          
          item.showWarning = false;
          item.showError = false;
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;
          
        });

        this.setState({
          categoriiConfort: categorii,
          creating: false,
        });
      }
    });
  }

  cancel(index) {
    let categorii = this.state.categoriiConfort;
    let backup = this.state.backup;

    if (index >= 0 && index < categorii.length) {
      
      /** The user clicked cancel on a newly created item */
      if (categorii[index].isFresh &&
          '' === backup[index]) {
        
        categorii.pop();
        backup.pop();
      }

      /** The user clicked cancel on an existing item */
      else {
        
        categorii[index].Denumire = backup[index];

        categorii[index].showWarning = false;
        categorii[index].showError = false;
        categorii[index].isFresh = false;
        categorii[index].isEditing = false;
        categorii[index].isFetching = false;
      }
    }
    

    this.setState({
      backup: backup,
      categoriiConfort: categorii,

      creating: false,
    });
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

       let sortedBackup = [];

       let length = 0;

        sorted.forEach(item => {

          item.index = length++;

          item.showWarning = false;
          item.showError = false;
    
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;

          sortedBackup.push(item.Denumire);

        });

        this.setState({
          backup: sortedBackup,
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

  render() {

    let categorii = this.state.categoriiConfort;

    const categories = categorii.map(
      (categorie) =>

      <CategorieSpatiu
        index={categorie.index}

        key={this.generateKey()}
        value={categorie.Denumire}

        add={this.add}
        edit={this.edit}
        input={this.input}
        save={this.save}
        cancel={this.cancel}
        delete={this.delete}

        showWarning={undefined === categorie.showWarning || false === categorie.showWarning ? false : true}
        showError={undefined === categorie.showError || false === categorie.showError ? false : true}

        isFresh={undefined === categorie.isFresh || false === categorie.isFresh ? false : true}
        isEditing={undefined === categorie.isEditing || false === categorie.isEditing ? false : true}
        isFetching={undefined === categorie.isFetching || false === categorie.isFetching ? false : true}
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
                onClick={this.add}></i>
            </Tippy>
          }
            </div>
        </div>
    );
  }
}

export default SpatiiUpdater;
