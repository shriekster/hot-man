import React from 'react';
import Tippy from '@tippyjs/react';

import CategorieSpatiu from './CategorieSpatiu';

class SpatiiUpdater extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

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

      categoriiSpatii: [],

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

  add() {

    this.setState({

      creating: true,

    }, () => {

      if (this.state.creating) {

        let categorii = this.state.categoriiSpatii;
        let backup = this.state.backup;

        let newItem = {

          index: categorii.length, //??

          Denumire: '',
          Detalii: '',
          showWarning: false,
          showError: false,

          isFresh: true,
          isEditing: true,

          inputIsFocused: true,
          textareaIsFocused: false,
          inputCaretPosition: 0,
          inputCaretPositionEnd: 0,//???
          textareaCaretPosition: 0,
          textareaCaretPositionEnd: 0,//???

          isFetching: false,
        };

        let newBackupItem = {

          index: backup.length, //??

          Denumire: '',
          Detalii: '',
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

              item.showWarning = false;
              item.showError = false;
              item.isFresh = false;
              item.isEditing = false;
              item.isFetching = false;

              item.inputIsFocused = false;
              item.textareaIsFocused = false;

              item.inputCaretPosition = item.Denumire.length;
              item.inputCaretPositionEnd = item.Denumire.length;//??
              item.textareaCaretPosition = item.Detalii.length;
              item.textareaCaretPositionEnd = item.Detalii.length;//??
            });

            categorii.push(newItem);
            backup.push(newBackupItem);
          }
        }

        this.setState({
          backup: backup,
          categoriiSpatii: categorii,
        });
      }
    });
  }

  edit(index) {

    let categorii = this.state.categoriiSpatii;
    let backup = this.state.backup;

    if (index >= 0 && index < categorii.length) {

      for (let i = 0; i < categorii.length; i++) {

        if (index == i) {

          categorii[i].showWarning = false;
          categorii[i].showError = false
          categorii[i].isFresh = false;
    
          categorii[i].isEditing = true;
          categorii[i].inputIsFocused = true;
    
          categorii[i].isFetching = false;
          
        } else {

          if (categorii[i].isFresh) {

            categorii.pop();
            backup.pop();

          } else {

            categorii[i].Denumire = backup[i].Denumire;
            categorii[i].Detalii = backup[i].Detalii;

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
        categoriiSpatii: categorii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(index, type, newValue, caretPosition, caretPositionEnd) {

    let categorii = this.state.categoriiSpatii;

    switch (type) {

      case 'denumire': {

        if (index >= 0 && index < categorii.length ) {

          categorii[index].Denumire = newValue;
          categorii[index].inputCaretPosition = caretPosition;
          categorii[index].inputCaretPositionEnd = caretPositionEnd;//??
    
          /** Hide the error or warning tippy */
          categorii[index].showWarning = false;
          categorii[index].showError = false;
        }

        break;
      }

      case 'detalii': {

        if (index >= 0 && index < categorii.length ) {

          categorii[index].Detalii = newValue;
          categorii[index].textareaCaretPosition = caretPosition;
          categorii[index].textareaCaretPositionEnd = caretPositionEnd;//??
        }

        break;
      }
    }
    
    this.setState({
      categoriiSpatii: categorii,
    });
  }

  save(index) {

    let body;
    let backup = this.state.backup;
    let categorii = this.state.categoriiSpatii;

    if (index >= 0 && index < categorii.length) {

      /** Empty input value on saving */
      if (!categorii[index].Denumire) {

        categorii[index].showWarning = true;

        categorii[index].showError = false;

        categorii[index].isFetching = false;

        this.setState({
          categoriiSpatii: categorii,
        });
      }

      else 
      
      /** The input value is the same as before being edited */
      if (categorii[index].Denumire === backup[index].Denumire &&
          categorii[index].Detalii === backup[index].Detalii) {

        categorii[index].showWarning = false;
        categorii[index].showError = false;
        categorii[index].isFresh = false;
        categorii[index].isEditing = false;
        categorii[index].isFetching = false;

        categorii[index].inputIsFocused = true;
        categorii[index].textareaIsFocused = false;
        categorii[index].inputCaretPosition = categorii[index].Denumire.length;
        categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??
        categorii[index].textareaCaretPosition = categorii[index].Detalii.length;
        categorii[index].textareaCaretPositionEnd = categorii[index].Detalii.length;//??

        this.setState({
          categoriiSpatii: categorii,
          creating: false,
        })
      }

      else {
        /** A new, non-empty value is to be saved */
        if (categorii[index].isFresh) {

          body = {
            token: this.props.token,
            task: 'create',
            value: categorii[index].Denumire.trim(),
            details: categorii[index].Detalii.trim(),
          };
    
        } else {
    
          let newDetails = ('' === categorii[index].Detalii || undefined === categorii[index].Detalii) ? '' : categorii[index].Detalii.trim();

          body = {
            token: this.props.token,
            task: 'update',
            oldValue: backup[index].Denumire,
            newValue: categorii[index].Denumire.trim(),
            oldDetails: backup[index].Detalii,
            newDetails: newDetails,
          };
        }
      
        const requestOptions = {
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        };
    
        fetch('http://localhost:3001/main/administrare/spatii', requestOptions)
        .then(response => response.json())
        .then(updated => {
          
          if (updated && updated.status) {
  
            switch (updated.status) {
  
              case 'valid': {
  
                backup[index].Denumire = categorii[index].Denumire.trim();
                backup[index].Detalii = categorii[index].Detalii.trim();
  
                categorii[index].showWarning = false;
                categorii[index].showError = false;
                categorii[index].isFresh = false;
                categorii[index].isEditing = false;
                categorii[index].isFetching = false;
                categorii[index].inputIsFocused = true;
                categorii[index].textareaIsFocused = false;
                categorii[index].inputCaretPosition = categorii[index].Denumire.length;
                categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??
                categorii[index].textareaCaretPosition = categorii[index].Detalii.length;
                categorii[index].textareaCaretPositionEnd = categorii[index].Detalii.length;//??
  
                this.setState({
                  backup: backup,
                  categoriiSpatii: categorii,
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
                  categoriiSpatii: categorii,
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

    let categorii = this.state.categoriiSpatii;
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

    fetch('http://localhost:3001/main/administrare/spatii', requestOptions)
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
          categoriiSpatii: categorii,

          creating: false,
        })
        
      }

      else {

        let categorii = this.state.categoriiSpatii;

        categorii.forEach(item => {
          
          item.showWarning = false;
          item.showError = false;
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;
          
        });

        this.setState({
          categoriiSpatii: categorii,
          creating: false,
        });
      }
    });
  }

  cancel(index) {
    let categorii = this.state.categoriiSpatii;
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
        categorii[index].Detalii = backup[index].Detalii;

        categorii[index].showWarning = false;
        categorii[index].showError = false;
        categorii[index].isFresh = false;
        categorii[index].isEditing = false;
        categorii[index].isFetching = false;

        categorii[index].inputIsFocused = true;
        categorii[index].textareaIsFocused = false;
        categorii[index].inputCaretPosition = categorii[index].Denumire.length;
        categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??
        categorii[index].textareaCaretPosition = categorii[index].Detalii.length;
        categorii[index].textareaCaretPositionEnd = categorii[index].Detalii.length;//??
      }
    }
    

    this.setState({
      backup: backup,
      categoriiSpatii: categorii,

      creating: false,
    });
  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  setFocusState(index, type, state, caretPosition, caretPositionEnd) {

    let categorii = this.state.categoriiSpatii;

    if (index >= 0 && index <= categorii.length) {

      switch (type) {

        case 'input': {

          if (state) {

            categorii[index].inputIsFocused = true;
            categorii[index].inputCaretPosition = caretPosition;
            categorii[index].inputCaretPositionEnd = caretPositionEnd;//??

            categorii[index].textareaIsFocused = false;
            categorii[index].textareaCaretPosition = !categorii[index].Detalii ? 0 : categorii[index].Detalii.length;
            categorii[index].textareaCaretPositionEnd = !categorii[index].Detalii ? 0 : categorii[index].Detalii.length;//??

          } else {

            categorii[index].inputIsFocused = false;
            categorii[index].inputCaretPosition = categorii[index].Denumire.length;
            categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??

          }

          break;
        }

        case 'textarea': {

          if (state) {

            categorii[index].inputIsFocused = false;
            categorii[index].inputCaretPosition = categorii[index].Denumire.length;
            categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??

            categorii[index].textareaIsFocused = true;
            categorii[index].textareaCaretPosition = caretPosition;
            categorii[index].textareaCaretPositionEnd = caretPositionEnd;//??

          } else {

            categorii[index].textareaIsFocused = false;
            categorii[index].textareaCaretPosition = !categorii[index].Detalii ? 0 : categorii[index].Detalii.length;
            categorii[index].textareaCaretPositionEnd = !categorii[index].Detalii ? 0 : categorii[index].Detalii.length;//??
            
          }

          break;
        }

      }

      this.setState({
        categoriiSpatii: categorii,
      });
    }
  }

  componentDidMount() {
    /** 'descarc' categoriile de spatii */
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'read',
      })
    };

    fetch('http://localhost:3001/main/administrare/spatii', requestOptions)
    .then(response => response.json())
    .then(categorii => {

      if ('error' === categorii.status) {
        console.log('Eroare - categorii spatii')
      } 
      
      else 
      
      if ('valid' === categorii.status) {

        let cats = categorii.categoriiSpatii;

       let length = 0;
       let backup = [];

        cats.forEach( item => {

          item.index = length++;

          item.showWarning = false;
          item.showError = false;
    
          item.isFresh = false;
          item.isEditing = false;
          item.isFetching = false;

          item.inputIsFocused = true;
          item.textareaIsFocused = false;
          item.inputCaretPosition = item.Denumire.length;
          item.inputCaretPositionEnd = item.Denumire.length;//??
          item.textareaCaretPosition = !item.Detalii ? 0 : item.Detalii.length;
          item.textareaCaretPositionEnd = !item.Detalii ? 0 : item.Detalii.length;//??

          let backupItem = {
            Denumire: item.Denumire, 
            Detalii: item.Detalii,
          };

          backup.push(backupItem);

        });

        this.setState({
          backup: backup,
          categoriiSpatii: cats,
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

    let categorii = this.state.categoriiSpatii;

    const categories = categorii.map(
      (categorie) =>

      <CategorieSpatiu
        index={categorie.index}

        key={this.generateKey()}
        value={categorie.Denumire}
        details={categorie.Detalii}

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
        inputCaretPositionEnd={categorie.inputCaretPositionEnd}
        textareaCaretPosition={categorie.textareaCaretPosition}
        textareaCaretPositionEnd={categorie.textareaCaretPositionEnd}

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
          <div className='-categorii-title'>
            Categoriile de spații de cazare
            <div className='--next'>
              <Tippy
                content={
                  <div className='-cen-txt'>Situația spațiilor de cazare</div>
                }
                allowHTML={true}
                placement='right'
                arrow={true}
                theme='material-centralizator-spatii'
                hideOnClick={false}
                offset={[0, 10]}>
                <i className='fas fa-project-diagram --next-icon'
                  onClick={() => this.props.changeMenu('CentralizatorSpatii')}></i>
              </Tippy>
            </div>
          </div>
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
                  Introdu denumirea categoriei de spațiu
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-disabled'
              hideOnClick={false}
              offset={[0, 20]}>
              <i className='fas fa-plus-square --add-icon --add-disabled'></i>
            </Tippy>
                              :
            <Tippy
              content={
                <>
                  Adaugă o categorie de spațiu
                </>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
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
