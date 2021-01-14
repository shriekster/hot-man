import React from 'react';
import Tippy from '@tippyjs/react';

import CategoriePat from './CategoriePat';

class PaturiUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this);

    this.edit = this.edit.bind(this);

    this.input = this.input.bind(this);

    this.save = this.save.bind(this);

    this.cancel = this.cancel.bind(this);

    this.delete = this.delete.bind(this);

    this.generateKey = this.generateKey.bind(this);

    this.setFocusState = this.setFocusState.bind(this);

    this.state = {
      backup: [],

      categoriiPaturi: [],

      creating: false,
    };
  }

  add() {

    this.setState({

      creating: true,

    }, () => {

      if (this.state.creating) {

        let categorii = this.state.categoriiPaturi;
        let backup = this.state.backup;

        let newItem = {

          index: categorii.length, //??

          Denumire: '',
          NumarLocuri: '',
          showNameWarning: false,
          showNameError: false,
          showNumberWarning: false,
          showNumberError: false,

          isFresh: true,
          isEditing: true,

          inputIsFocused: true,
          textareaIsFocused: false,
          inputCaretPosition: 0,
          textareaCaretPosition: 0,

          isFetching: false,
        };

        let newBackupItem = {

          index: backup.length, //??

          Denumire: '',
          NumarLocuri: '',
        };


        if (0 === categorii.length && 0 === backup.length) {

          categorii.push(newItem);
          backup.push(newBackupItem);
        }

        else {

          let last = categorii[categorii.length - 1].Denumire;
          let backupLast = backup[backup.length - 1].Denumire;

          if (last && backupLast) {
            /** 'Reset' every other item's state when a new item is being added */
            categorii.forEach( item => {

              item.showNameWarning = false;
              item.showNameError = false;
              item.showNumberWarning = false;
              item.showNumberError = false;
              item.isFresh = false;
              item.isEditing = false;
              item.isFetching = false;

              item.inputIsFocused = false;
              item.textareaIsFocused = false;
              item.inputCaretPosition = item.Denumire.length;
              item.textareaCaretPosition = item.NumarLocuri.length;
            });

            categorii.push(newItem);
            backup.push(newBackupItem);
          }
        }

        this.setState({
          backup: backup,
          categoriiPaturi: categorii,
        });
      }
    });
  }

  edit(index) {

    let categorii = this.state.categoriiPaturi;
    let backup = this.state.backup;

    if (index >= 0 && index < categorii.length) {

      for (let i = 0; i < categorii.length; i++) {

        if (index == i) {

          categorii[i].showNameWarning = false;
          categorii[i].showNameError = false;
          categorii[i].showNumberWarning = false;
          categorii[i].showNumberError = false;

          categorii[i].isFresh = false;
          categorii[i].isEditing = true;
          categorii[i].isFetching = false;
          
        } else {

          if (categorii[i].isFresh) {

            categorii.pop();
            backup.pop();

          } else {

            categorii[i].Denumire = backup[i].Denumire;
            categorii[i].NumarLocuri = backup[i].NumarLocuri;

            categorii[i].showNameWarning = false;
            categorii[i].showNameError = false;
            categorii[i].showNumberWarning = false;
            categorii[i].showNumberError = false;

            categorii[i].isFresh = false;
            categorii[i].isEditing = false;
            categorii[i].isFetching = false;

          }
        }
      }

      this.setState({
        backup: backup,
        categoriiPaturi: categorii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(index, type, newValue, caretPosition) {

    let categorii = this.state.categoriiPaturi;

    switch (type) {

      case 'denumire': {

        if (index >= 0 && index < categorii.length ) {

          categorii[index].Denumire = newValue;
          categorii[index].inputCaretPosition = caretPosition;
    
          /** Hide the error or warning tippy */
          categorii[index].showNameWarning = false;
          categorii[index].showNameError = false;
        }

        break;
      }

      case 'locuri': {

        if (index >= 0 && index < categorii.length ) {

          categorii[index].NumarLocuri = newValue;
          categorii[index].textareaCaretPosition = caretPosition;

          /** Hide the error or warning tippy */
          categorii[index].showNumberWarning = false;
          categorii[index].showNumberError = false;
        }

        break;
      }
    }
    
    this.setState({
      categoriiPaturi: categorii,
    });
  }

  save(index) {

    let body;
    let backup = this.state.backup;
    let categorii = this.state.categoriiPaturi;

    if (index >= 0 && index < categorii.length) {

      /** Empty input value(s) on saving */
      if (!categorii[index].Denumire || !categorii[index].NumarLocuri) {

        let nameWarning = false;
        let numberWarning = false;

        if (!categorii[index].Denumire) nameWarning = true;

        if(!categorii[index].NumarLocuri) numberWarning = true;

        categorii[index].showNameWarning = nameWarning;
        categorii[index].showNameError = false;

        categorii[index].showNumberWarning = numberWarning;
        categorii[index].showNumberError = false;

        categorii[index].isFetching = false;

        this.setState({
          categoriiPaturi: categorii,
        });
      }

      else 
      
      /** The input values are the same as before being edited */
      if (categorii[index].Denumire === backup[index].Denumire &&
          categorii[index].NumarLocuri === backup[index].NumarLocuri) {

        categorii[index].showNameWarning = false;
        categorii[index].showNameError = false;
        categorii[index].showNumberWarning = false;
        categorii[index].showNumberError = false;
        categorii[index].isFresh = false;
        categorii[index].isEditing = false;
        categorii[index].isFetching = false;

        categorii[index].inputIsFocused = true;
        categorii[index].textareaIsFocused = false;
        categorii[index].inputCaretPosition = categorii[index].Denumire.length;
        categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;

        this.setState({
          categoriiPaturi: categorii,
        })
      }

      else {
        /** A new, non-empty value is to be saved */
        if (categorii[index].isFresh) {

          body = {
            token: this.props.token,
            task: 'create',
            value: categorii[index].Denumire.trim(),
            number: categorii[index].NumarLocuri.toString().trim(),
          };
    
        } else {
          
          body = {
            token: this.props.token,
            task: 'update',
            oldValue: backup[index].Denumire,
            newValue: categorii[index].Denumire.trim(),
            oldNumber: backup[index].NumarLocuri,
            newNumber: categorii[index].NumarLocuri.toString().trim(),
          };
        }
      
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        };
    
        fetch('http://localhost:3001/main/administrare/paturi', requestOptions)
        .then(response => response.json())
        .then(updated => {
          
          if (updated && updated.status) {
  
            switch (updated.status) {
  
              case 'valid': {
  
                backup[index].Denumire = categorii[index].Denumire.trim();
                backup[index].NumarLocuri = categorii[index].NumarLocuri.toString().trim();
  
                categorii[index].showNameWarning = false;
                categorii[index].showNameError = false;
                categorii[index].showNumberWarning = false;
                categorii[index].showNumberError = false;

                categorii[index].isFresh = false;
                categorii[index].isEditing = false;
                categorii[index].isFetching = false;
                categorii[index].inputIsFocused = true;
                categorii[index].textareaIsFocused = false;
                categorii[index].inputCaretPosition = categorii[index].Denumire.length;
                categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
  
                this.setState({
                  backup: backup,
                  categoriiPaturi: categorii,
                  creating: false,
                });
  
                break;
              }
  
              case 'error':
              case 'invalid': {

                categorii[index].showNameWarning = false;
                categorii[index].showNameError = false;
                categorii[index].showNumberWarning = false;
                categorii[index].showNumberError = true;

                categorii[index].isEditing = true;
                categorii[index].isFetching = false;
  
                this.setState({
                  categoriiPaturi: categorii,
                });
  
                break;
              }

              case 'duplicate': {
  
                categorii[index].showNameWarning = false;
                categorii[index].showNameError = true;
                categorii[index].showNumberWarning = false;
                categorii[index].showNumberError = false;

                categorii[index].isEditing = true;
                categorii[index].isFetching = false;
  
                this.setState({
                  categoriiPaturi: categorii,
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

    let categorii = this.state.categoriiPaturi;
    let backup = this.state.backup;
   
    let toDelete = '';

    if (index >= 0 && index < categorii.length) {

      toDelete = backup[index].Denumire;

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

    fetch('http://localhost:3001/main/administrare/paturi', requestOptions)
    .then(response => response.json())
    .then(updated => {

      if ('valid' === updated.status) {
        
        categorii.splice(index, 1);
        backup.splice(index, 1);

        /** Rewrite the indexes so that they are in 'order' */
        let _index = 0;

        categorii.forEach(item => {

          item.index = _index++;

        });

        this.setState({
          backup: backup,
          categoriiPaturi: categorii,

          creating: false,
        })
        
      }

      else {

        let categorii = this.state.categoriiPaturi;

        categorii.forEach(item => {
          
          item.showNameWarning = false;
          item.showNameError = false;
          item.showNumberWarning = false;
          item.showNumberError = false;

          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;
          
        });

        this.setState({
          categoriiPaturi: categorii,
          creating: false,
        });
      }
    });
  }

  cancel(index) {
    let categorii = this.state.categoriiPaturi;
    let backup = this.state.backup;

    if (index >= 0 && index < categorii.length) {
      
      /** The user clicked cancel on a newly created item */
      if (categorii[index].isFresh &&
          '' === backup[index].Denumire) {
        
        categorii.pop();
        backup.pop();
      }

      /** The user clicked cancel on an existing item */
      else {
        
        categorii[index].Denumire = backup[index].Denumire;
        categorii[index].NumarLocuri = backup[index].NumarLocuri;

        categorii[index].showNameWarning = false;
        categorii[index].showNameError = false;
        categorii[index].showNumberWarning = false;
        categorii[index].showNumberError = false;

        categorii[index].isFresh = false;
        categorii[index].isEditing = false;
        categorii[index].isFetching = false;

        categorii[index].inputIsFocused = true;
        categorii[index].textareaIsFocused = false;
        categorii[index].inputCaretPosition = categorii[index].Denumire.length;
        categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
      }
    }
    

    this.setState({
      backup: backup,
      categoriiPaturi: categorii,

      creating: false,
    });
  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  setFocusState(index, type, state, caretPosition) {

    let categorii = this.state.categoriiPaturi;

    if (index >= 0 && index <= categorii.length) {

      switch (type) {

        case 'input': {

          if (state) {

            categorii[index].inputIsFocused = true;
            categorii[index].inputCaretPosition = caretPosition;

            categorii[index].textareaIsFocused = false;
            categorii[index].textareaCaretPosition = !categorii[index].NumarLocuri ? 0 : categorii[index].NumarLocuri.length;

          } else {

            categorii[index].inputIsFocused = false;
            categorii[index].inputCaretPosition = categorii[index].Denumire.length;

          }

          break;
        }

        case 'textarea': {

          if (state) {

            categorii[index].inputIsFocused = false;
            categorii[index].inputCaretPosition = categorii[index].Denumire.length;

            categorii[index].textareaIsFocused = true;
            categorii[index].textareaCaretPosition = caretPosition;

          } else {

            categorii[index].textareaIsFocused = false;
            categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
            
          }

          break;
        }

      }

      this.setState({
        categoriiPaturi: categorii,
      });
    }
  }

  componentDidMount() {
    /** 'descarc' categoriile de paturi */
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'read',
      })
    };

    fetch('http://localhost:3001/main/administrare/paturi', requestOptions)
    .then(response => response.json())
    .then(categorii => {

      if ('error' === categorii.status) {
        console.log('Eroare - categorii spatii')
      } 
      
      else 
      
      if ('valid' === categorii.status) {

        let cats = categorii.categoriiPaturi;

        let length = 0;
        let backup = [];

        cats.forEach( item => {

          item.index = length++;

          item.showNameWarning = false;
          item.showNameError = false;
          item.showNumberWarning = false;
          item.showNumberError = false;
    
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;

          item.inputIsFocused = true;
          item.textareaIsFocused = false;
          item.inputCaretPosition = item.Denumire.length;
          item.textareaCaretPosition = item.NumarLocuri.length;

          let backupItem = {
            Denumire: item.Denumire, 
            NumarLocuri: item.NumarLocuri,
          };

          backup.push(backupItem);

        });

        this.setState({
          backup: backup,
          categoriiPaturi: cats,
        });

      } 
      
      else

      if ('denied' === categorii.status) {
        this.props.onChange('Login');
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {}

  render() {

    let categorii = this.state.categoriiPaturi;

    const categories = categorii.map(
      (categorie) =>

      <CategoriePat
        index={categorie.index}

        key={this.generateKey()}
        value={categorie.Denumire}
        number={categorie.NumarLocuri}

        add={this.add}
        edit={this.edit}
        input={this.input}
        save={this.save}
        cancel={this.cancel}
        delete={this.delete}

        focus={this.setFocusState}
        inputIsFocused={categorie.inputIsFocused}
        textareaIsFocused={categorie.textareaIsFocused}
        inputCaretPosition={categorie.inputCaretPosition}
        textareaCaretPosition={categorie.textareaCaretPosition}

        showNameWarning={categorie.showNameWarning}
        showNameError={categorie.showNameError}
        showNumberWarning={categorie.showNumberWarning}
        showNumberError={categorie.showNumberError}

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
                  Introdu denumirea categoriei de pat
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
                  Adaugă o categorie de pat
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

export default PaturiUpdater;
