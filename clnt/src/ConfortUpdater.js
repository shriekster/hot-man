import React from 'react';
import Tippy from '@tippyjs/react';

import CategorieConfort from './CategorieConfort';

class ConfortUpdater extends React.Component {
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

        if (0 === categorii.length) {

          categorii.push({
            Denumire: '',
            showWarning: false,
            showError: false,

            isFresh: true,
            isEditing: true,

            isFetching: false,
          });
        }

        else {

          let last = categorii[categorii.length - 1].Denumire;

          if (last) {
            /** 'Reset' every other item's state when a new item is being added */
            categorii.forEach( item => {

              item.showWarning = false;
              item.showError = false;
              item.isFresh = false;
              item.isEditing = false;
              item.isFetching = false;

            });

            categorii.push({
              Denumire: '',
              showWarning: false,
              showError: false,

              isFresh: true,
              isEditing: true,

              isFetching: false,
            });
          }
        }

        this.setState({
          backup: categorii,
          categoriiConfort: categorii,
        });
      }
    });
  }

  edit(value) {

    if (value) {

      let categorii = this.state.categoriiConfort;

      for (let i = 0; i < categorii.length; i++) {

        if (value === categorii[i].Denumire) {

          categorii[i].showWarning = false;
          categorii[i].showError = false
          categorii[i].isFresh = false;

          categorii[i].isEditing = true;

          categorii[i].isFetching = false;

        } else {
          /** 'Reset' every other item's state when a new item is being edited
           *  and cancel the creation of a new item, if this applies
           */
          if (i === categorii.length - 1 && '' === categorii[i].Denumire) {

            categorii.pop(); /** cancel creation */

          } else {

            categorii[i].showWarning = false;
            categorii[i].showError = false
            categorii[i].isFresh = false;
            categorii[i].isEditing = false;
            categorii[i].isFetching = false;
          }
        }
      }

      this.setState({
        categoriiConfort: categorii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(oldValue, newValue) {

    let categorii = this.state.categoriiConfort;

    for (let i = 0; i < categorii.length; i++) {

      if (oldValue === categorii[i].Denumire) {

        categorii[i].Denumire = newValue;

        /** Hide the error or warning tippy */
        categorii[i].showWarning = false;
        categorii[i].showError = false;
        
        break;
      }
    }

    this.setState({
      categoriiConfort: categorii,
    });
  }

  save(isFresh, oldValue, newValue) {
    let body;

    /** If the user saves and the input value is empty */
    if (!newValue) {

      let categorii = this.state.categoriiConfort;

      for (let i = 0; i < categorii.length; i++) {

        if (categorii[i].Denumire === oldValue) {

          //categorii[i].Denumire = newValue; /** empty value */

          categorii[i].showWarning = true;

          categorii[i].showError = false;

          break;
        }
      }

      this.setState({
        categoriiConfort: categorii,
      });

    }
    
    else
    
    /** If the user saves without modifying the value */
    if (oldValue && oldValue === newValue) {

      let categorii = this.state.categoriiConfort;

      for (let i = 0; i < categorii.length; i++) {

        if (categorii[i].Denumire === oldValue) {

          categorii[i].showWarning = false;
          categorii[i].showError = false
          categorii[i].isFresh = false;
          categorii[i].isEditing = false;
          categorii[i].isFetching = false;

          break;
        }
      }

      this.setState({
        categoriiConfort: categorii,
        creating: false,
      });
    }

    /** If the user saves a new, non-empty value */
    else {

      let categorii = this.state.categoriiConfort;

      for (let i = 0; i < categorii.length; i++) {

        if (categorii[i].Denumire === oldValue) {

          categorii[i].isFetching = true;

          break;
        }
      }

      this.setState({
        
        categoriiConfort: categorii,

      }, () => {

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
            oldValue: oldValue,
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
          
          if (updated && updated.status) {
  
            switch (updated.status) {
  
              case 'valid': {

                let categorii = this.state.categoriiConfort;
  
                for (let i = 0; i < categorii.length; i++) {
  
                  if (oldValue === categorii[i].Denumire) {
  
                    categorii[i].Denumire = newValue.trim();
  
                    categorii[i].showWarning = false;
                    categorii[i].showError = false
                    categorii[i].isFresh = false;
                    categorii[i].isEditing = false;
                    categorii[i].isFetching = false;
  
                    break;
                  }
                }

                let sorted = categorii.sort(function compare(a, b) {
                  return a.Denumire - b.Denumire;
                });
  
                this.setState({
                  categoriiConfort: sorted,
                  creating: false,
                });
  
                break;
              }
  
              case 'error':
              case 'invalid':
              case 'duplicate': {

                let categorii = this.state.categoriiConfort;
  
                for (let i = 0; i < categorii.length; i++) {
  
                  if (oldValue === categorii[i].Denumire) {
  
                    categorii[i].showWarning = false;

                    categorii[i].showError = true;

                    categorii[i].isFetching = false;
  
                    break;
                  }
                }
  
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
      });
    }
  }

  delete(value) {

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
       
        let index = 0;

        for (let i = 0; i < categorii.length; i++ ) {

          if (value === categorii[i].Denumire) {

            index = i;
          }
        }
        
        categorii.splice(index, 1);

        this.setState({
          backup: categorii,
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
          backup: categorii,
          categoriiConfort: categorii,
          creating: false,
        });
      }
    });
  }

  cancel(value) {
    let categorii = this.state.categoriiConfort;
    let backup = this.state.backup;

    for (let i = 0; i < categorii.length; ++i) {

      if (value === categorii[i].Denumire) {
        
        /** The user clicked cancel on a newly created item */
        if (!value) {
          categorii.pop();

          if (backup.length - 1 === categorii.length &&
              '' === backup[backup.length - 1].Denumire) {

                backup.pop();
          }
        }

        /** The user clicked cancel on an existing item */
        else {

          categorii[i].Denumire = this.state.backup[i].Denumire;

          categorii[i].showWarning = false;
          categorii[i].showError = false;
          categorii[i].isFresh = false;
          categorii[i].isEditing = false;
          categorii[i].isFetching = false;
        }
      }
    }
    
    /*
    categorii.forEach(item => {
      
      if (value === item.Denumire) {
        
        // The user clicked cancel on a newly created item 
        if (!value) {
          categorii.pop();
        }

        // The user clicked cancel on an existing item 
        else {

          item.showWarning = false;
          item.showError = false;
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;
        }
      }
    });
    */

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

        sorted.forEach(item => {

          item.showWarning = false;
          item.showError = false;
    
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;

          let backupItem = Object.assign({}, item);
          sortedBackup.push(backupItem);

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
    console.log('N ', this.state.categoriiConfort[0].Denumire);
    console.log('B ', this.state.backup[0].Denumire)
  }

  render() {

    let categorii = this.state.categoriiConfort;

    const categories = categorii.map(
      (categorie) =>

      <CategorieConfort 
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

export default ConfortUpdater;
