import React from 'react';
import Tippy from '@tippyjs/react';
import Select from 'react-select';

import Spinner from './Spinner';

import SpatiuCazare from './SpatiuCazare';

class CentralizatorSpatii extends React.Component {
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

    this.toggleChecked = this.toggleChecked.bind(this);

    this.toggleMasterChecked = this.toggleMasterChecked.bind(this);

    this.state = {

      backup: [],
      current: [],

      floors: [],

      addRange: false,

      checkLevel: 0,

      creating: false,

      checkBoxData: [ /** checkLevel: { 0: none checked, 1: some checked, 2: all checked } */
        {
          hint: 'Selectează tot',
          icon: 'far fa-square -check-icon',
        },
        {
          hint: 'Selectează tot',
          icon: 'far fa-minus-square -check-icon',
        },
        {
          hint: 'Deselectează tot',
          icon: 'far fa-check-square -check-icon',
        }
      ],
    };
  }

  add() {

    this.setState({

      creating: true,

    }, () => {

      if (this.state.creating) {

        let categorii = this.state.current;
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
          isChecked: true,

          inputIsFocused: true,
          textareaIsFocused: false,

          inputCaretPosition: 0,
          inputCaretPositionEnd: 0,//??
          textareaCaretPosition: 0,
          textareaCaretPositionEnd: 0,//??

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
              item.isChecked = false;
              item.isFetching = false;

              item.inputIsFocused = false;
              item.textareaIsFocused = false;

              item.inputCaretPosition = item.Denumire.length;
              item.inputCaretPositionEnd = item.Denumire.length;//??
              item.textareaCaretPosition = item.NumarLocuri.length;
              item.textareaCaretPositionEnd = item.NumarLocuri.length;//??
            });

            categorii.push(newItem);
            backup.push(newBackupItem);
          }
        }

        this.setState({
          backup: backup,
          current: categorii,
        });
      }
    });
  }

  edit(index) {

    let categorii = this.state.current;
    let backup = this.state.backup;

    if (index >= 0 && index < categorii.length) {

      for (let i = 0; i < categorii.length; i++) {

        if (index == i) {

          categorii[i].showNameWarning = false;
          categorii[i].showNameError = false;
          categorii[i].showNumberWarning = false;
          categorii[i].showNumberError = false;

          categorii[i].isFresh = false;
          categorii[i].isChecked = true;
          categorii[i].inputIsFocused = true;
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
            categorii[i].isChecked = false;
            categorii[i].isFetching = false;

          }
        }
      }

      this.setState({
        backup: backup,
        current: categorii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(index, type, newValue, caretPosition, caretPositionEnd) {

    let categorii = this.state.current;

    switch (type) {

      case 'denumire': {

        if (index >= 0 && index < categorii.length ) {

          categorii[index].Denumire = newValue;
          categorii[index].inputCaretPosition = caretPosition;
          categorii[index].inputCaretPositionEnd = caretPositionEnd;//??
    
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
          categorii[index].textareaCaretPositionEnd = caretPositionEnd;//??

          /** Hide the error or warning tippy */
          categorii[index].showNumberWarning = false;
          categorii[index].showNumberError = false;
        }

        break;
      }
    }
    
    this.setState({
      current: categorii,
    });
  }

  save(index) {

    let body;
    let backup = this.state.backup;
    let categorii = this.state.current;

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
          current: categorii,
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
        categorii[index].isChecked = false;
        categorii[index].isFetching = false;

        categorii[index].inputIsFocused = true;
        categorii[index].textareaIsFocused = false;

        categorii[index].inputCaretPosition = categorii[index].Denumire.length;
        categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??
        categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
        categorii[index].textareaCaretPositionEnd = categorii[index].NumarLocuri.length;//??

        this.setState({
          current: categorii,
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
                categorii[index].isChecked = false;
                categorii[index].isFetching = false;
                categorii[index].inputIsFocused = true;
                categorii[index].textareaIsFocused = false;

                categorii[index].inputCaretPosition = categorii[index].Denumire.length;
                categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??
                categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
                categorii[index].textareaCaretPositionEnd = categorii[index].NumarLocuri.length;//??
  
                this.setState({
                  backup: backup,
                  current: categorii,
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

                categorii[index].isChecked = true;
                categorii[index].isFetching = false;
  
                this.setState({
                  current: categorii,
                });
  
                break;
              }

              case 'duplicate': {
  
                categorii[index].showNameWarning = false;
                categorii[index].showNameError = true;
                categorii[index].showNumberWarning = false;
                categorii[index].showNumberError = false;

                categorii[index].isChecked = true;
                categorii[index].isFetching = false;
  
                this.setState({
                  current: categorii,
                });
  
                break;
              }

              case 'broken': {
  
                categorii[index].showNameWarning = false;
                categorii[index].showNameError = true;
                categorii[index].showNumberWarning = false;
                categorii[index].showNumberError = true;

                categorii[index].isChecked = true;
                categorii[index].isFetching = false;
  
                this.setState({
                  current: categorii,
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

    let categorii = this.state.current;
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
          current: categorii,

          creating: false,
        })
        
      }

      else {

        let categorii = this.state.current;

        categorii.forEach(item => {
          
          item.showNameWarning = false;
          item.showNameError = false;
          item.showNumberWarning = false;
          item.showNumberError = false;

          item.isFresh = false;
          item.isChecked = false;
          item.isFetching = false;
          
        });

        this.setState({
          current: categorii,
          creating: false,
        });
      }
    });
  }

  cancel(index) {
    let categorii = this.state.current;
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
        categorii[index].isChecked = false;
        categorii[index].isFetching = false;

        categorii[index].inputIsFocused = true;
        categorii[index].textareaIsFocused = false;

        categorii[index].inputCaretPosition = categorii[index].Denumire.length;
        categorii[index].inputCaretPositionEnd = categorii[index].Denumire.length;//??
        categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
        categorii[index].textareaCaretPositionEnd = categorii[index].NumarLocuri.length;//??
      }
    }
    

    this.setState({
      backup: backup,
      current: categorii,

      creating: false,
    });
  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  setFocusState(index, type, state, caretPosition, caretPositionEnd) {

    let categorii = this.state.current;

    if (index >= 0 && index <= categorii.length) {

      switch (type) {

        case 'input': {

          if (state) {

            categorii[index].inputIsFocused = true;
            categorii[index].inputCaretPosition = caretPosition;
            categorii[index].inputCaretPositionEnd = caretPositionEnd;//??

            categorii[index].textareaIsFocused = false;
            categorii[index].textareaCaretPosition = !categorii[index].NumarLocuri ? 0 : categorii[index].NumarLocuri.length;
            categorii[index].textareaCaretPositionEnd = !categorii[index].NumarLocuri ? 0 : categorii[index].NumarLocuri.length;//??

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
            categorii[index].textareaCaretPosition = categorii[index].NumarLocuri.length;
            categorii[index].textareaCaretPositionEnd = categorii[index].NumarLocuri.length;//??
            
          }

          break;
        }

      }

      this.setState({
        current: categorii,
      });
    }
  }

  toggleChecked(index) {
    let current = this.state.current;
    let checkLevel = this.state.checkLevel;

    if (index >= 0 && index < current.length) {

      /** Toggle item check state (@index) */
      current[index].isChecked = !(current[index].isChecked);

      /** Update the parent component's check state */
      const itemIsChecked = (value) => { return value.isChecked; };
  
      if (current.every(itemIsChecked) && checkLevel !== 2) {
        checkLevel = 2;
      }
  
      else 
  
      if (current.some(itemIsChecked) && checkLevel !== 1) {
        checkLevel = 1;
      }
  
      else 
  
      if (!current.some(itemIsChecked) && checkLevel !== 0) {
        checkLevel = 0;
      }

      this.setState({
        checkLevel: checkLevel,
        current: current,
      })
    }
  }

  toggleMasterChecked() {

    let checkLevel = this.state.checkLevel;
    let current = this.state.current;
    
    switch (checkLevel) {

      /** none or some are checked */
      case 0:
      case 1: {
        
        checkLevel = 2;

        current.forEach(item => {
          item.isChecked = true;
        });

        break;
      }

      /** all are checked */
      case 2: {

        checkLevel = 0;

        current.forEach(item => {
          item.isChecked = false;
        });

        break;
      }
    }

    this.setState({
      current: current,
      checkLevel: checkLevel,
    })
  }

  componentDidMount() {
    /** 'descarc' info -> spatiile de cazare */
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'read',
      })
    };

    fetch('http://localhost:3001/main/administrare/central', requestOptions)
    .then(response => response.json())
    .then(res => {

      if ('error' === res.status) {
        console.log('Eroare - categorii spatii')
      } 
      
      else 
      
      if ('valid' === res.status) {

        let items = res.spatii;

        let length = 0;
        let backup = [];

        let _floors = [];

        items.forEach( item => {

          item.index = length++;

          item.showNameWarning = false;
          item.showNameError = false;
          item.showNumberWarning = false;
          item.showNumberError = false;
    
          item.isFresh = false;
          item.isChecked = false; //!!!!
          item.isFetching = false;

          item.inputIsFocused = true;
          item.textareaIsFocused = false;

          /*
          item.inputCaretPosition = item.Denumire.length;
          item.inputCaretPositionEnd = item.Denumire.length;//??
          item.textareaCaretPosition = item.NumarLocuri.length;
          item.textareaCaretPositionEnd = item.NumarLocuri.length;//??
          */

          let backupItem = {
            etaj: item.etaj, 
            numar: item.numar,
            tipSpatiu: item.tipSpatiu,
            paturi: Object.assign({}, item.paturi)
          };

          backup.push(backupItem);

          //!!
          _floors.push(item.etaj);

        });

        let floorsArray = _floors.filter((value, index, self) => self.indexOf(value) === index);
        let floorsOptions = [];

        floorsArray.forEach(item => {
          floorsOptions.push( { value: item, label: 0 === item ? 'Parter' : item } );
        });

        this.setState({
          backup: backup,
          current: items,
          floors: floorsOptions,
        });

      } 
      
      else

      if ('denied' === res.status) {
        this.props.onChange('Login');
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
  }

  render() {

    let current = this.state.current;

    const items = current.map(
      
      (item) =>

      // isFresh, isChecked, isFetching
      <div className='-row'
        data-index={item.index} 
        data-floor={item.etaj}
        onInput={(event) => {console.log(event.currentTarget.dataset.index)}}
        key={item.index}>
        {
          item.isChecked  ?
          <i className='far fa-check-square -check-icon'
            onClick={() => { this.toggleChecked(item.index) }}></i>
                          :
          <i className='far fa-square -check-icon'
            onClick={() => { this.toggleChecked(item.index) }}></i>
        }
        <input data-type='roomNumber'
          maxLength={64}
          type='text'
          className='-cell'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          onInput={(event) => {console.log(event.currentTarget.dataset.type)}}
          //onKeyDown={this.onKeyDown}
          value={item.numar}>
        </input>
        <input data-type='bedTypes'
          maxLength={64}
          type='text'
          className='-cell'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          onInput={(event) => {console.log(event.currentTarget.dataset.type)}}
          //onKeyDown={this.onKeyDown}
          value={item.paturi}>
        </input>
        <input data-type='roomType'
          maxLength={64}
          type='text'
          className='-cell'
          autoComplete='off'
          autoCorrect='off'
          spellCheck={false}
          onInput={(event) => {console.log(event.currentTarget.dataset.type)}}
          //onKeyDown={this.onKeyDown}
          value={item.tipSpatiu}>
        </input>
        <Spinner
        status='loading'
        visibility={true}/>
      </div>
    );

    return (
      <div id='centralizator-spatii' 
        className='view-confort-categories'>
        <div className='centralizator-menu'>
          <div id='-title'>
            <span>Situația spațiilor de cazare</span>
            <div className='--next'>
                <Tippy
                  content={
                    <div className='-cen-txt'>Mergi la <span className='-underlined'>categoriile de spații de cazare</span></div>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={true}
                  theme='material-centralizator-spatii'
                  hideOnClick={false}
                  offset={[0, 10]}>
                  <i className='fas fa-toggle-on --next-icon'
                    onClick={() => this.props.changeMenu('SpatiiUpdater')}></i>
                </Tippy>
            </div>
            <div className='-check-all'>
              <Tippy
                  content={
                    <div className='-cen-txt'>
                      <>
                        {this.state.checkBoxData[this.state.checkLevel].hint}
                      </>
                    </div>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={true}
                  theme='material-centralizator-spatii'
                  hideOnClick={false}
                  offset={[0, 10]}>
                  <i className={this.state.checkBoxData[this.state.checkLevel].icon}
                    onClick={this.toggleMasterChecked}></i>
                </Tippy>
            </div>
          </div>
          <div className='-floor-select-container'>
            <span>Etaj: </span>
            <Select
              id='-floor-select'
              isDisabled={false}
              defaultValue={0}
              //onInputChange={(inputValue, action) => this.onSelect(null, {id: 'grad', value: inputValue, action: action.action})}
              //onChange={(inputValue,action) => this.onSelect(null, {id: 'grad', value: inputValue.value, action: action.action})}
              maxMenuHeight={100}
              placeholder='Selectează...'
              noOptionsMessage={(msg) => 'Nu există'}
              className='floor-sel-container'
              classNamePrefix='floor-sel' 
              options={this.state.floors} 
              onKeyDown={this.onKeyDown}
              ref={this.gradInput}
              openMenuOnFocus={true}
              closeMenuOnSelect={true}
              blurInputOnSelect={true}
              //onMenuClose={this.submitOnMenuClose}
              inputId='-floor-select-input'/> 
          </div>
        </div>
        <div id='-scroller' 
          className='-scroller'>
          <div className='-rows'>
            {items}
          </div>
        </div>
        </div>
    );
  }
}

export default CentralizatorSpatii;
