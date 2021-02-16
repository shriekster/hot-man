import React from 'react';
import Tippy from '@tippyjs/react';
/** react-window - React components for efficiently rendering large lists and tabular data */
import { FixedSizeList as List} from 'react-window';
import Spatiu from './Spatiu';
import Spinner from './Spinner';

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

class CentralizatorSpatii extends React.Component {
  constructor(props) {
    super(props);

    this.add = this.add.bind(this); 

    this.addRange = this.addRange.bind(this);

    this.addBed = this.addBed.bind(this);

    this.edit = this.edit.bind(this);

    this.input = this.input.bind(this);

    this.searchRoom = this.searchRoom.bind(this);

    this.save = this.save.bind(this);

    this.cancel = this.cancel.bind(this);

    this.delete = this.delete.bind(this);

    this.deleteBed = this.deleteBed.bind(this);

    this.generateKey = this.generateKey.bind(this);

    this.setFocusState = this.setFocusState.bind(this);

    this.toggleChecked = this.toggleChecked.bind(this);

    this.toggleMasterChecked = this.toggleMasterChecked.bind(this);

    this.displayBeds = this.displayBeds.bind(this);

    this.displayBedTypes = this.displayBedTypes.bind(this);

    this.state = {

      backup: [],
      current: [],

      roomTypes: [],
      confortTypes: [],
      bedTypes: [],

      adding: false,
      addingRange: false,
      

      checkLevel: 0,
      checkedRows: 0,

      add: true,
      addRange: true,
      save: true,
      delete: true,
      

      checkBoxData: [ /** checkLevel: { 0: none checked, 1: some checked, 2: all checked } */
        {
          icon: 'far fa-square -check-icon',
        },
        {
          icon: 'fas fa-minus-square -check-icon-partial',
        },
        {
          icon: 'fas fa-check-square -check-icon--checked',
        }
      ],
    };

    this.search = undefined;

    this.setSearchRef = (element) => {
      this.search = element;
    }

    this.listParent = React.createRef();

    this.list = React.createRef();

    this.focusSearch = this.focusSearch.bind(this);

    this.getItemHeight = this.getItemHeight.bind(this);
  }

  add() {

    this.setState({

      adding: true,
      addingRange: false,

    }, () => {


    });
  }

  addRange() {

    this.setState({

      adding: false,
      addingRange: true,

    }, () => {


    });

  }

  addBed() {

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

  input(e, index) {

    let categorii = this.state.current;

    console.log(index, e.currentTarget.value);

  }

  searchRoom(e) {
    let items = this.list.current.props.itemData.items;
    let value = e.target.value;
    
    const regex = /^\d+$/;
    const isRoom = candidate => regex.test(candidate);

    let result = [];
    
    if (isRoom(value)) {
    
      result = items.filter(item => item.numar === Number(value));

      if (1 === result.length) {

        this.list.current.scrollToItem(result[0].index, 'start');
      
      }

    }
        
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

  deleteBed() {

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
    let checkedRows = this.state.checkedRows;

    if (index >= 0 && index < current.length) {

      /** Toggle item check state (@index) */
      current[index].isChecked = !(current[index].isChecked);

      if (current[index].isChecked) {
        checkedRows++;
      } else {
        checkedRows--;
      }

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
        checkedRows: checkedRows,
      })
    }
  }

  toggleMasterChecked() {

    let checkLevel = this.state.checkLevel;
    let current = this.state.current;
    let checkedRows = this.state.checkedRows;
    
    switch (checkLevel) {

      /** none or some are checked */
      case 0:
      case 1: {
        
        checkLevel = 2;
        checkedRows = current.length;

        current.forEach(item => {
          item.isChecked = true;
        });

        break;
      }

      /** all are checked */
      case 2: {

        checkLevel = 0;
        checkedRows = 0;

        current.forEach(item => {
          item.isChecked = false;
        });

        break;
      }
    }

    this.setState({
      current: current,
      checkLevel: checkLevel,
      checkedRows: checkedRows,
    })
  }

  displayBeds(index) {
    
    let item = this.state.current[index];
    let beds = 
    <div className='-row-beds'>
      <div className='-row-beds-title'>
        <Tippy
              content={
                <div>Adaugă tip de pat</div>
              }
              allowHTML={true}
              placement='right'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 10]}>
          <i className='fas fa-plus -row-beds-add'
            onClick={this.addBed}></i>
        </Tippy>
        <div>Paturi</div>
        </div>
      <div className='-row-beds-content'>
        {
          item.paturi.map( bed => 
            <div key={this.generateKey()}
              className='-row-beds-tr'>
              <input data-type='bedCount'
              disabled={false}
              maxLength={64}
              type='text'
              className='-cell' 
              autoComplete='off' 
              autoCorrect='off'
              spellCheck={false}
              onInput={(event) => {console.log(event.currentTarget.dataset.type)}}
              //onKeyDown={this.onKeyDown}
              value={bed.numar}></input>
              <div className='-row-beds-td-x bold'>x</div>
              <div className='select'>
                <select className='-row-bed-types'>
                  {
                    this.displayBedTypes()
                  }
                </select>
              </div>
              <div className='-row-beds-td-delete'>
                <Tippy
                  content={
                    <div>Șterge tipul de pat</div>
                  }
                  allowHTML={true}
                  placement='right'
                  arrow={true}
                  theme='material-confort-disabled'
                  hideOnClick={false}
                  offset={[0, 10]}>
                  <i className='fas fa-trash-alt -row-bed-delete'
                    onClick={this.deleteBed}></i>
                </Tippy>
              </div>
            </div>
          )
        }
      </div>
    </div>;
    return beds;
  }

  displayBedTypes() {
    let bedTypes = this.state.bedTypes;

    let bedsUI =
      <>
      {
        bedTypes.map (type => 
        <option
          key={this.generateKey()}
          value={type.Denumire}>{type.Denumire}</option>
        )
      }
      </>;

    return bedsUI;
  }

  focusSearch() {
    this.search.focus();
  }

  getItemHeight(index) {
    
    if (index >= 0 && index < this.state.current.length) {
      
      let item = this.state.current[index];
      return item.isExpanded ? (item.paturi.length + 1) * 45 : 45;
    }
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

        let rooms = res.categorii;
        let confs = res.confort;
        let beds = res.paturi;
        let items = res.spatii;

        let length = 0;
        let backup = [];

        items.forEach( item => {

          item.index = length++;

          item.showNameWarning = false;
          item.showNameError = false;
          item.showNumberWarning = false;
          item.showNumberError = false;
    
          item.isFresh = false;
          item.isChecked = false; //!!!!
          item.isFetching = false;
          item.isExpanded = false;

          let backupItem = {
            etaj: item.etaj, 
            numar: item.numar,
            tipSpatiu: item.tipSpatiu,
            paturi: Object.assign({}, item.paturi)
          };

          backup.push(backupItem);

        });

        this.setState({
          roomTypes: rooms,
          confortTypes: confs,
          bedTypes: beds,
          backup: backup,
          current: items,
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
    //console.log('CentralizatorSpatii rendered')
    let current = this.state.current;

    return (
      <div id='centralizator-spatii' 
        className='view-confort-categories'>
        <div className='-submenu'>
          <div className='-submenu-item'
            onClick={() => this.props.changeMenu('SpatiiUpdater')}>
            <i className='fas fa-list -submenu-icon'></i>
            <span>Categorii</span>
          </div>
          <div className='-submenu-item-active'>
            <i className='fas fa-table -submenu-icon'></i>
            <span>Centralizator</span>
          </div>
        </div>
        <div className='-tmenu'>
          <div className='-tmenu-selected'>
          {
            (this.state.checkedRows > 0) &&
            <>
            <span>{this.state.checkedRows} {this.state.checkedRows > 1 ? 'selectate' : 'selectat'}</span>
            </>
          }
          </div>
          <div className='-tmenu-buttons'>
            <Tippy
              content={
                <div>Adaugă</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 10]}>
              <i className='fas fa-plus -tbutton-add'
                onClick={this.add}></i>
            </Tippy>
            <Tippy
              content={
                <div>Adaugă interval</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 2]}>
              <div className='-tbutton-add-range'
                onClick={this.addRange}>
                <i className='fas fa-plus'></i>
                <div className='-trange'>
                  <i className='fas fa-caret-left'></i>
                  <i className='fas fa-caret-right'></i>
                </div>
              </div>
            </Tippy>
            <Tippy
              content={
                <div>Editează</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 10]}>
              <i className='fas fa-edit -tbutton-save'></i>
            </Tippy>
            <Tippy
              content={
                <div>Șterge</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-disabled'
              hideOnClick={false}
              offset={[0, 10]}>
              <i className='fas fa-trash-alt -tbutton-del'></i>
            </Tippy>
          </div>
          <div className='-tmenu-search'>
            <input data-type='roomSearch'
              disabled={false}
              maxLength={64}
              type='text'
              className='-cell-search'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              onInput={this.searchRoom}
              //onKeyDown={this.onKeyDown}
              placeholder='Caută spațiu de cazare...'
              ref={this.setSearchRef}>
            </input>
            <i className='fas fa-search -tmenu-search-icon'
              onClick={this.focusSearch}></i>
          </div>
        </div>
        <div className='-theader'>
            <i className={this.state.checkBoxData[this.state.checkLevel].icon}
              onClick={this.toggleMasterChecked}></i>
            <div className='-th-col'>
              Etaj
            </div>
            <div className='-th-col'>
              Număr
            </div>
            <div className='-th-col'>
              Tip
            </div>
            <div className='-th-col'>
              Confort
            </div>
        </div>
        {
          !this.state.adding && !this.state.addingRange &&

          <div ref={this.listParent} 
          id='-scroller' 
            className='-scroller'>
            {/*<div className='-rows'>*/}
              {/*items*/}
              <List
                ref={this.list}
                width={900}
                height={vh(55)}
                itemData={
                  {
                    items: this.state.current,
                    bedTypes: this.state.bedTypes,
                    roomTypes: this.state.roomTypes,
                    confortTypes: this.state.confortTypes,
                    toggleChecked: this.toggleChecked,
                    input: this.input,
                  }
                }
                itemKey={this.generateKey}
                itemSize={45}
                itemCount={current.length}
                className='-rows'
                >
                {Spatiu}
              </List>
            {/*</div>*/}
          </div>
        }
        {
          this.state.adding && !this.state.addingRange &&

          <div id='-scroller' 
            className='-scroller'>
            <div className='-rows-adding'>
              ADDING
            </div>
          </div>
        }
        {
          !this.state.adding && this.state.addingRange &&
          
          <div id='-scroller' 
            className='-scroller'>
            <div className='-rows-adding'>
              ADDING RANGE
            </div>
          </div>
        }
        </div>
    );
  }
}

export default CentralizatorSpatii;




