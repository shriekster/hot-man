import React from 'react';
import Tippy from '@tippyjs/react';

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

    this.state = {
      backup: [],

      spatii: [],

      addMultiple: false,

      checkLevel: 0,

      creating: false,
    };
  }

  add() {

    this.setState({

      creating: true,

    }, () => {

      if (this.state.creating) {

        let categorii = this.state.spatii;
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
          spatii: categorii,
        });
      }
    });
  }

  edit(index) {

    let categorii = this.state.spatii;
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
        spatii: categorii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(index, type, newValue, caretPosition, caretPositionEnd) {

    let categorii = this.state.spatii;

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
      spatii: categorii,
    });
  }

  save(index) {

    let body;
    let backup = this.state.backup;
    let categorii = this.state.spatii;

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
          spatii: categorii,
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
          spatii: categorii,
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
                  spatii: categorii,
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
                  spatii: categorii,
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
                  spatii: categorii,
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
                  spatii: categorii,
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

    let categorii = this.state.spatii;
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
          spatii: categorii,

          creating: false,
        })
        
      }

      else {

        let categorii = this.state.spatii;

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
          spatii: categorii,
          creating: false,
        });
      }
    });
  }

  cancel(index) {
    let categorii = this.state.spatii;
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
      spatii: categorii,

      creating: false,
    });
  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  setFocusState(index, type, state, caretPosition, caretPositionEnd) {

    let categorii = this.state.spatii;

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
        spatii: categorii,
      });
    }
  }

  toggleChecked(index) {
    let spatii = this.state.spatii;

    if (index >= 0 && index < spatii.length) {
      spatii[index].isChecked = !spatii[index].isChecked;

      this.setState({
        spatii: spatii,
      })
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

    fetch('http://localhost:3001/main/administrare/central', requestOptions)
    .then(response => response.json())
    .then(res => {

      if ('error' === res.status) {
        console.log('Eroare - categorii spatii')
      } 
      
      else 
      
      if ('valid' === res.status) {

        let cats = res.spatii;

        let length = 0;
        let backup = [];

        cats.forEach( item => {

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
            tip: item.tipSpatiu,
            paturi: Object.assign({}, item.paturi)
          };

          backup.push(backupItem);

        });

        this.setState({
          backup: backup,
          spatii: cats,
        });

      } 
      
      else

      if ('denied' === res.status) {
        this.props.onChange('Login');
      }
    });
  }

  componentDidUpdate (prevProps, prevState) {
    let spatii = this.state.spatii;

    const itemIsChecked = (value) => value.isChecked;

    if (spatii.every(itemIsChecked) && this.state.checkLevel !== 2) {
      this.setState({
        checkLevel: 2,
      })
    }

    else 

    if (spatii.some(itemIsChecked) && this.state.checkLevel !== 1) {
      this.setState({
        checkLevel: 1,
      })
    }

    else 

    if (!spatii.some(itemIsChecked) && this.state.checkLevel !== 0) {
      this.setState({
        checkLevel: 0,
      })
    }
  }

  render() {

    let spatii = this.state.spatii;

    const spaces = spatii.map(
      (spatiu) =>

      <SpatiuCazare
        key={this.generateKey()}
        index={spatiu.index}

        etaj={spatiu.etaj}
        numar={spatiu.numar}
        tip={spatiu.tipSpatiu}
        paturi={spatiu.paturi}

        add={this.add}
        edit={this.edit}
        input={this.input}
        save={this.save}
        cancel={this.cancel}
        delete={this.delete}

        focus={this.setFocusState}
        inputIsFocused={spatiu.inputIsFocused}
        textareaIsFocused={spatiu.textareaIsFocused}

        toggleChecked={this.toggleChecked}

        /*
        inputCaretPosition={spatiu.inputCaretPosition}
        inputCaretPositionEnd={spatiu.inputCaretPositionEnd}
        textareaCaretPosition={spatiu.textareaCaretPosition}
        textareaCaretPositionEnd={spatiu.textareaCaretPositionEnd}
        */

        showNameWarning={spatiu.showNameWarning}
        showNameError={spatiu.showNameError}
        showNumberWarning={spatiu.showNumberWarning}
        showNumberError={spatiu.showNumberError}

        isFresh={undefined === spatiu.isFresh || false === spatiu.isFresh ? false : true}
        isChecked={undefined === spatiu.isChecked || false === spatiu.isChecked ? false : true}
        isFetching={undefined === spatiu.isFetching || false === spatiu.isFetching ? false : true}
      />
    );

    return (
      <div id='view-confort-categories' 
        className='view-confort-categories'>
        <div className='-spatii-title'>
          Situația spațiilor de cazare
          <div className='--next'>
              <Tippy
                content={
                  <div className='-cen-txt'>Categoriile de spații de cazare</div>
                }
                allowHTML={true}
                placement='right'
                arrow={true}
                theme='material-centralizator-spatii'
                hideOnClick={false}
                offset={[0, 10]}>
                <i className='fas fa-project-diagram --next-icon'
                  onClick={() => this.props.changeMenu('SpatiiUpdater')}></i>
              </Tippy>
          </div>
          <div className='-check-all'>
            {
              this.state.checkLevel === 0 &&
            <Tippy
              content={
                <div className='-cen-txt'>
                  <>
                    Bifează tot
                  </>
                </div>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-centralizator-spatii'
              hideOnClick={false}
              offset={[0, 22]}>
              <i className='far fa-square -check-icon'
                onClick={() => {}}></i>
            </Tippy>
            }
            {
              this.state.checkLevel === 1 &&
            <Tippy
              content={
                <div className='-cen-txt'>
                  <>
                    Bifează tot
                  </>
                </div>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-centralizator-spatii'
              hideOnClick={false}
              offset={[0, 22]}>
              <i className='far fa-minus-square -check-icon'
                onClick={() => {}}></i>
            </Tippy>
            }
            {
              this.state.checkLevel === 2 &&
            <Tippy
              content={
                <div className='-cen-txt'>
                  <>
                    Debifează tot
                  </>
                </div>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-centralizator-spatii'
              hideOnClick={false}
              offset={[0, 22]}>
              <i className='far fa-check-square -check-icon'
                onClick={() => {}}></i>
            </Tippy>
            }
          </div>
        </div>
          <div id='confort-categories' 
          className='confort-categories'>
            <div className='confort-categories-inside'>
              {spaces}
            </div>
          </div>
          <div className='--confort-add'>
          {
            this.state.creating ?
            <Tippy
              content={
                this.state.addMultiple ?
                <>
                  Introdu datele referitoare la spațiile de cazare
                </>                    :
                <>
                  Introdu datele referitoare la spațiul de cazare
                </>
                
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-disabled'
              hideOnClick={false}
              maxWidth={400}
              offset={[0, 20]}>
              <i className='fas fa-home --add-icon --add-disabled'></i>
            </Tippy>
                              :
            <Tippy
              content={
                <div className='add-rooms'>
                  <div className='add-rooms-hint'><i className='fas fa-plus add-rooms-icon'></i><span> Adaugă un spațiu de cazare</span></div>
                  <div className='add-rooms-hint'><i className='far fa-plus-square add-rooms-icon'></i><span> Adaugă mai multe spații de cazare</span></div>
                </div>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              interactive={true}
              interactiveBorder={40}
              offset={[0, 20]}>
              <i className='fas fa-home --add-icon'
                onClick={this.add}></i>
            </Tippy>
          }
            </div>
        </div>
    );
  }
}

export default CentralizatorSpatii;
