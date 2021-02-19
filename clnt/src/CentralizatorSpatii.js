import React from 'react';
import Tippy from '@tippyjs/react';
/** react-window - React components for efficiently rendering large lists and tabular data */
import { FixedSizeList as List} from 'react-window';
import Spatiu from './Spatiu';
import SpatiuAdd from './SpatiuAdd';

function vh(v) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (v * h) / 100;
}

class CentralizatorSpatii extends React.Component {
  constructor(props) {
    super(props);

    // Methods
    this.add = this.add.bind(this); 

    this.save = this.save.bind(this);

    this.cancel = this.cancel.bind(this);

    this.addRange = this.addRange.bind(this);

    this.saveRange = this.saveRange.bind(this);

    this.cancelRange = this.cancelRange.bind(this);

    this.edit = this.edit.bind(this);

    this.cancelEdit = this.cancelEdit.bind(this);

    this.delete = this.delete.bind(this);

    this.searchRoom = this.searchRoom.bind(this);

    this.focusSearch = this.focusSearch.bind(this);

    this.cancelSearch = this.cancelSearch.bind(this);

    this.generateKey = this.generateKey.bind(this);

    this.toggleChecked = this.toggleChecked.bind(this);

    this.toggleMasterChecked = this.toggleMasterChecked.bind(this);

    // State
    this.state = {

      items: [],

      roomTypes: [],
      confortTypes: [],
      bedTypes: [],

      adding: false,
      addingRange: false,
      editing: false,
      searching: false,

      searchText: '',

      checkLevel: 0,
      checkedRows: 0,
      

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

    // Refs
    this.search = React.createRef();

    this.listParent = React.createRef();
    this.list = React.createRef();

  }

  add() {

    if (!this.state.adding && !this.state.addingRange && !this.state.editing) {

      this.setState({

        adding: true,
        searchText: '',
        searching: false,
        checkLevel: 0,
        checkedRows: 0

      });

    }

  }

  save() {

  }

  cancel() {

    if (this.state.adding) {

      this.setState({

        adding: false,

      });

    }

  }

  addRange() {

    if (!this.state.adding && !this.state.addingRange && !this.state.editing) {

      this.setState({

        addingRange: true,
        searchText: '',
        searching: false,
        checkLevel: 0,
        checkedRows: 0

      });

    }

  }

  saveRange() {

  }

  cancelRange() {

    if (this.state.addingRange) {

      this.setState({

        addingRange: false,

      });

    }

  }

  edit() {

    if (!this.state.adding && !this.state.addingRange && !this.state.editing && this.state.checkedRows === 1) {

      this.setState({

        editing: true,
        searchText: '',
        searching: false,
        checkLevel: 0,
        checkedRows: 0

      });

    }

  }

  cancelEdit() {

  }

  searchRoom(e) {

    this.setState({
      searching: true,
      searchText: e.target.value,
    },
      () => {

        let items = this.list.current.props.itemData.items;
        let value = this.state.searchText;
        
        const regex = /^\d+$/;
        const isRoom = candidate => regex.test(candidate);

        let result = [];

        items.forEach (item => {

          item.isSearchResult = false;

        });
    
        if (isRoom(value)) {
        
          result = items.filter(item => item.numar === Number(value));

          if (1 === result.length) {

            let index = result[0].index;

            items[index].isSearchResult = true;
            
            this.setState({

              items: items,

            },
              () => {

                this.list.current.scrollToItem(index, 'start');

              }
            );

          }

        } else {

          this.setState({

            items: items,

          });

        }

      }
    );

  }

  cancelSearch() {

    let items = this.state.items;

    items.forEach( item => { item.isSearchResult = false });

    this.setState({
      searching: false,
      searchText: '',
      items: items,
    },
      () => {

        if (this.search.current) {
          this.search.current.focus();
        }
        
      }
    );

  }

  delete() {

  }

  generateKey() {
    return Math.floor(new Date().getTime() * Math.random());
  }

  toggleChecked(index) {

    let current = this.state.items;
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

    if (!this.state.adding && !this.state.addingRange && !this.state.editing) {

      let checkLevel = this.state.checkLevel;
      let current = this.state.items;
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
      });

    }
  }

  focusSearch() {
    this.search.current.focus();
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

        items.forEach( item => {

          item.index = length++;
    
          item.isChecked = false;
          item.isSearchResult = false;

        });

        this.setState({
          roomTypes: rooms,
          confortTypes: confs,
          bedTypes: beds,
          items: items,
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
              disabled={this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows}
              content={
                <div>Adaugă</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 10]}>
              <i className={(this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows) 
                                                                                                ? 'fas fa-plus -tbutton-add--disabled' 
                                                                                                : 'fas fa-plus -tbutton-add'}
                onClick={this.add}></i>
            </Tippy>
            <Tippy
              disabled={this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows}
              content={
                <div>Adaugă interval</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 2]}>
              <div className={(this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows) 
                                                                                                  ? '-tbutton-add-range--disabled'
                                                                                                  : '-tbutton-add-range'}
                onClick={this.addRange}>
                <i className='fas fa-plus'></i>
                <div className='-trange'>
                  <i className='fas fa-caret-left'></i>
                  <i className='fas fa-caret-right'></i>
                </div>
              </div>
            </Tippy>
            <Tippy
              disabled={this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows !== 1}
              content={
                <div>Editează</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 10]}>
              <i className={(this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows !== 1) 
                                                                                                ? 'fas fa-edit -tbutton-edit--disabled'
                                                                                                : 'fas fa-edit -tbutton-edit'}
                onClick={this.edit}></i>
            </Tippy>
            <Tippy
              disabled={this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows < 1}
              content={
                <div>Șterge</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-disabled'
              hideOnClick={false}
              offset={[0, 10]}>
              <i className={(this.state.adding || this.state.addingRange || this.state.editing || this.state.checkedRows < 1) 
                                                                                                ? 'fas fa-trash-alt -tbutton-delete--disabled' 
                                                                                                : 'fas fa-trash-alt -tbutton-delete'}
                onClick={this.delete}></i>
            </Tippy>
          </div>
          <div className='-tmenu-search'>
            <input data-type='roomSearch'
              disabled={(this.state.adding || this.state.addingRange || this.state.editing)}
              maxLength={64}
              type='text'
              className='-cell-search'
              autoComplete='off'
              autoCorrect='off'
              spellCheck={false}
              onInput={this.searchRoom}
              placeholder='Caută spațiu de cazare...'
              ref={this.search}
              value={this.state.searchText}>
            </input>
            <i className={(this.state.adding || this.state.addingRange || this.state.editing) ? 'fas fa-search -tmenu-search-icon--disabled' 
                                                                                              : 'fas fa-search -tmenu-search-icon'}
              onClick={this.focusSearch}></i>
            {
              this.state.searching &&
              this.state.searchText &&

              <i className='far fa-times-circle -tmenu-cancel-search-icon'
                onClick={this.cancelSearch}></i>
            }
          </div>
        </div>
        <div className='-theader'>
            <i className={(this.state.adding || this.state.addingRange || this.state.editing) ? 'far fa-square -check-icon--disabled'
                                                                                              : this.state.checkBoxData[this.state.checkLevel].icon}
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
          !this.state.adding && !this.state.addingRange && !this.state.editing &&

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
                    items: this.state.items,
                    bedTypes: this.state.bedTypes,
                    roomTypes: this.state.roomTypes,
                    confortTypes: this.state.confortTypes,
                    toggleChecked: this.toggleChecked,
                    input: this.input,
                  }
                }
                itemKey={this.generateKey}
                itemSize={45}
                itemCount={this.state.items.length}
                className='-rows'
                >
                {Spatiu}
              </List>
            {/*</div>*/}
          </div>
        }
        {
          this.state.adding && !this.state.addingRange && !this.state.editing &&

          <div id='-scroller' 
            className='-scroller'>
            <div className='-rows-adding'>
              <SpatiuAdd
                save={this.save}
                cancel={this.cancel}
                roomTypes={this.state.roomTypes}
                confortTypes={this.state.confortTypes}
                bedTypes={this.state.bedTypes}/>
            </div>
          </div>
        }
        {
          !this.state.adding && this.state.addingRange && !this.state.editing &&
          
          <div id='-scroller' 
            className='-scroller'>
            <div className='-rows-adding'>
              ADDING RANGE
            </div>
          </div>
        }
        {
          !this.state.adding && !this.state.addingRange && this.state.editing &&
          
          <div id='-scroller' 
            className='-scroller'>
            <div className='-rows-adding'>
              EDITING
            </div>
          </div>
        }
        </div>
    );
  }
}

export default CentralizatorSpatii;




