import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';


import add from './images/add.svg'
import addRange from './images/add-range.svg';

class CentralizatorSpatii extends React.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = this.onKeyDown.bind(this);

    this.add = this.add.bind(this);

    this.addRange = this.addRange.bind(this);

    this.edit = this.edit.bind(this);

    this.input = this.input.bind(this);

    this.save = this.save.bind(this);

    this.cancel = this.cancel.bind(this);

    this.delete = this.delete.bind(this);

    this.generateKey = this.generateKey.bind(this);

    this.setFocusState = this.setFocusState.bind(this);

    this.state = {
      backup: [],

      spatii: [],

      creating: false,
    };
  }

  // numeric input only
  onKeyDown(e) {
    let charCode = (e.which) ? e.which : e.keyCode;

    if (27 === charCode) {
      this.onViewSettingsClick({ target: { id: 'view-user-settings' } })
    }

    return true;
  }

  add() {

    this.setState({

      creating: true,

    }, () => {

      if (this.state.creating) {

        let spatii = this.state.spatii;
        let backup = this.state.backup;

        let newItem = {

          index: spatii.length, //??

          Denumire: '',
          Detalii: '',
          showWarning: false,
          showError: false,

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
          Detalii: '',
        };


        if (0 === spatii.length && 0 === backup.length) {

          spatii.push(newItem);
          backup.push(newBackupItem);
        }

        else {

          let last = spatii[spatii.length - 1].Denumire;
          let backupLast = backup[backup.length - 1].Denumire;

          if (last && backupLast) {
            /** 'Reset' every other item's state when a new item is being added */
            spatii.forEach(item => {

              item.showWarning = false;
              item.showError = false;
              item.isFresh = false;
              item.isEditing = false;
              item.isFetching = false;

              item.inputIsFocused = false;
              item.textareaIsFocused = false;
              item.inputCaretPosition = item.Denumire.length;
              item.textareaCaretPosition = item.Detalii.length;
            });

            spatii.push(newItem);
            backup.push(newBackupItem);
          }
        }

        this.setState({
          backup: backup,
          spatii: spatii,
        });
      }
    });
  }

  addRange() {

  }

  edit(index) {

    let spatii = this.state.spatii;
    let backup = this.state.backup;

    if (index >= 0 && index < spatii.length) {

      for (let i = 0; i < spatii.length; i++) {

        if (index == i) {

          spatii[i].showWarning = false;
          spatii[i].showError = false
          spatii[i].isFresh = false;

          spatii[i].isEditing = true;
          spatii[i].inputIsFocused = true;

          spatii[i].isFetching = false;

        } else {

          if (spatii[i].isFresh) {

            spatii.pop();
            backup.pop();

          } else {

            spatii[i].Denumire = backup[i].Denumire;
            spatii[i].Detalii = backup[i].Detalii;

            spatii[i].showWarning = false;
            spatii[i].showError = false
            spatii[i].isFresh = false;
            spatii[i].isEditing = false;
            spatii[i].isFetching = false;

          }
        }
      }

      this.setState({
        backup: backup,
        spatii: spatii,

        creating: true, /** Block the creation of a new item while editing */
      });
    }
  }

  input(index, type, newValue, caretPosition) {

    let spatii = this.state.spatii;

    switch (type) {

      case 'denumire': {

        if (index >= 0 && index < spatii.length) {

          spatii[index].Denumire = newValue;
          spatii[index].inputCaretPosition = caretPosition;

          /** Hide the error or warning tippy */
          spatii[index].showWarning = false;
          spatii[index].showError = false;
        }

        break;
      }

      case 'detalii': {

        if (index >= 0 && index < spatii.length) {

          spatii[index].Detalii = newValue;
          spatii[index].textareaCaretPosition = caretPosition;
        }

        break;
      }
    }

    this.setState({
      spatii: spatii,
    });
  }

  save(index) {

    let body;
    let backup = this.state.backup;
    let spatii = this.state.spatii;

    if (index >= 0 && index < spatii.length) {

      /** Empty input value on saving */
      if (!spatii[index].Denumire) {

        spatii[index].showWarning = true;

        spatii[index].showError = false;

        spatii[index].isFetching = false;

        this.setState({
          spatii: spatii,
        });
      }

      else

        /** The input value is the same as before being edited */
        if (spatii[index].Denumire === backup[index].Denumire &&
          spatii[index].Detalii === backup[index].Detalii) {

          spatii[index].showWarning = false;
          spatii[index].showError = false;
          spatii[index].isFresh = false;
          spatii[index].isEditing = false;
          spatii[index].isFetching = false;

          spatii[index].inputIsFocused = true;
          spatii[index].textareaIsFocused = false;
          spatii[index].inputCaretPosition = spatii[index].Denumire.length;
          spatii[index].textareaCaretPosition = spatii[index].Detalii.length;

          this.setState({
            spatii: spatii,
            creating: false,
          })
        }

        else {
          /** A new, non-empty value is to be saved */
          if (spatii[index].isFresh) {

            body = {
              token: this.props.token,
              task: 'create',
              value: spatii[index].Denumire.trim(),
              details: spatii[index].Detalii.trim(),
            };

          } else {

            let newDetails = ('' === spatii[index].Detalii || undefined === spatii[index].Detalii) ? '' : spatii[index].Detalii.trim();

            body = {
              token: this.props.token,
              task: 'update',
              oldValue: backup[index].Denumire,
              newValue: spatii[index].Denumire.trim(),
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

                    backup[index].Denumire = spatii[index].Denumire.trim();
                    backup[index].Detalii = spatii[index].Detalii.trim();

                    spatii[index].showWarning = false;
                    spatii[index].showError = false;
                    spatii[index].isFresh = false;
                    spatii[index].isEditing = false;
                    spatii[index].isFetching = false;
                    spatii[index].inputIsFocused = true;
                    spatii[index].textareaIsFocused = false;
                    spatii[index].inputCaretPosition = spatii[index].Denumire.length;
                    spatii[index].textareaCaretPosition = spatii[index].Detalii.length;

                    this.setState({
                      backup: backup,
                      spatii: spatii,
                      creating: false,
                    });

                    break;
                  }

                  case 'error':
                  case 'invalid':
                  case 'duplicate': {

                    spatii[index].showWarning = false;

                    spatii[index].showError = true;
                    spatii[index].isEditing = true;

                    spatii[index].isFetching = false;

                    this.setState({
                      spatii: spatii,
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

    let spatii = this.state.spatii;
    let backup = this.state.backup;

    let toDelete = '';

    if (index >= 0 && index < spatii.length) {

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

          spatii.splice(index, 1);
          backup.splice(index, 1);

          /** Rewrite the indexes so that they are in 'order' */
          let _index = 0;

          spatii.forEach(item => {

            item.index = _index++;

          });

          this.setState({
            backup: backup,
            spatii: spatii,

            creating: false,
          })

        }

        else {

          let spatii = this.state.spatii;

          spatii.forEach(item => {

            item.showWarning = false;
            item.showError = false;
            item.isFresh = false;
            item.isEditing = false;
            item.isFetching = false;

          });

          this.setState({
            spatii: spatii,
            creating: false,
          });
        }
      });
  }

  cancel(index) {
    let spatii = this.state.spatii;
    let backup = this.state.backup;

    if (index >= 0 && index < spatii.length) {

      /** The user clicked cancel on a newly created item */
      if (spatii[index].isFresh &&
        '' === backup[index].Denumire) {

        spatii.pop();
        backup.pop();
      }

      /** The user clicked cancel on an existing item */
      else {

        spatii[index].Denumire = backup[index].Denumire;
        spatii[index].Detalii = backup[index].Detalii;

        spatii[index].showWarning = false;
        spatii[index].showError = false;
        spatii[index].isFresh = false;
        spatii[index].isEditing = false;
        spatii[index].isFetching = false;

        spatii[index].inputIsFocused = true;
        spatii[index].textareaIsFocused = false;
        spatii[index].inputCaretPosition = spatii[index].Denumire.length;
        spatii[index].textareaCaretPosition = spatii[index].Detalii.length;
      }
    }


    this.setState({
      backup: backup,
      spatii: spatii,

      creating: false,
    });
  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  setFocusState(index, type, state, caretPosition) {

    let spatii = this.state.spatii;

    if (index >= 0 && index <= spatii.length) {

      switch (type) {

        case 'input': {

          if (state) {

            spatii[index].inputIsFocused = true;
            spatii[index].inputCaretPosition = caretPosition;

            spatii[index].textareaIsFocused = false;
            spatii[index].textareaCaretPosition = !spatii[index].Detalii ? 0 : spatii[index].Detalii.length;

          } else {

            spatii[index].inputIsFocused = false;
            spatii[index].inputCaretPosition = spatii[index].Denumire.length;

          }

          break;
        }

        case 'textarea': {

          if (state) {

            spatii[index].inputIsFocused = false;
            spatii[index].inputCaretPosition = spatii[index].Denumire.length;

            spatii[index].textareaIsFocused = true;
            spatii[index].textareaCaretPosition = caretPosition;

          } else {

            spatii[index].textareaIsFocused = false;
            spatii[index].textareaCaretPosition = !spatii[index].Detalii ? 0 : spatii[index].Detalii.length;

          }

          break;
        }

      }

      this.setState({
        spatii: spatii,
      });
    }
  }

  componentDidMount() {
    /** 'descarc' spatiile de cazare */
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
      .then(spatii => {

        if ('error' === spatii.status) {
          console.log('Eroare - spatii spatii')
        }

        else

          if ('valid' === spatii.status) {

            let cats;// = spatii.spatii;

            let length = 0;
            let backup = [];

            /*
            cats.forEach(item => {

              item.index = length++;

              item.showWarning = false;
              item.showError = false;

              item.isFresh = false;
              item.isEditing = false;
              item.isFetching = false;

              item.inputIsFocused = true;
              item.textareaIsFocused = false;
              item.inputCaretPosition = item.Denumire.length;
              item.textareaCaretPosition = !item.Detalii ? 0 : item.Detalii.length;

              let backupItem = {
                Denumire: item.Denumire,
                Detalii: item.Detalii,
              };

              backup.push(backupItem);

            });
            */
            this.setState({
              backup: backup,
              spatii: cats,
            });

          }

          else

            if ('denied' === spatii.status) {
              this.props.onChange('Login');
            }
      });
  }

  componentDidUpdate(prevProps, prevState) { }

  render() {

    let spatii = this.state.spatii;

    /*
    const categories = spatii.map(
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
        textareaCaretPosition={categorie.textareaCaretPosition}

        showWarning={undefined === categorie.showWarning || false === categorie.showWarning ? false : true}
        showError={undefined === categorie.showError || false === categorie.showError ? false : true}

        isFresh={undefined === categorie.isFresh || false === categorie.isFresh ? false : true}
        isEditing={undefined === categorie.isEditing || false === categorie.isEditing ? false : true}
        isFetching={undefined === categorie.isFetching || false === categorie.isFetching ? false : true}
      />
    );
    */

    return (
      <div id='view-confort-categories'
        className='view-confort-categories'>
        <div className='-spatii-title'>
          Situația spațiilor de cazare
        </div>
        <div id='confort-categories'
          className='confort-categories'>
          <div className='-centralizator-spatii'>
            <Tippy
              content={
                <>
                  <div className='-cen-txt'>Categoriile</div>
                  <div className='-cen-txt'>de spații</div>
                  <div className='-cen-txt'>de cazare</div>
                </>
              }
              allowHTML={true}
              placement='bottom'
              arrow={true}
              theme='material-centralizator-spatii'
              hideOnClick={false}
              offset={[0, 10]}>
              <div className='-cen-sp-inner'
                onClick={() => this.props.changeMenu('SpatiiUpdater')}>
                <i className='fas fa-door-open -centralizator-spatii-icon'></i>
                <i className='fas fa-pen -centralizator-spatii-icon-small'></i>
              </div>
            </Tippy>
          </div>
          <div className='confort-categories-inside'>
            {/*<Spinner 
              status='searching'
              className='--overview-component-spinner'
              visibility={true}/>*/}
            {/*categories*/}
          </div>
        </div>
        <div className='--confort-add'>
          {
            this.state.creating ?
              <Tippy
                content={
                  <>
                    Introdu informațiile referitoare la spațiul / spațiile de cazare
                </>
                }
                allowHTML={true}
                placement='right'
                arrow={true}
                theme='material-confort-disabled'
                hideOnClick={false}
                maxWidth={450}
                offset={[0, 20]}>
                <div className='-spatiu-add --not-allowed'>
                  <img src={add}
                    className='add-spatiu add-spatiu--disabled' />
                  <img src={addRange}
                    className='add-spatiu-range add-spatiu--disabled' />
                </div>
              </Tippy>
              :
              <div className='-spatiu-add'>
                <Tippy
                  content={
                    <>
                      Adaugă un spațiu de cazare
                  </>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={true}
                  theme='material-confort-hints'
                  hideOnClick={false}
                  offset={[0, 20]}>
                  <img src={add}
                    className='add-spatiu'
                    onClick={this.add} />
                </Tippy>
                <Tippy
                  content={
                    <>
                      Adaugă mai multe spații de cazare
                  </>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={true}
                  theme='material-confort-hints'
                  hideOnClick={false}
                  offset={[0, 20]}>
                  <img src={addRange}
                    className='add-spatiu-range'
                    onClick={this.addRange} />
                </Tippy>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default CentralizatorSpatii;
