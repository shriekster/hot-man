import React from 'react';
import Tippy from '@tippyjs/react';
/** react-window - React components for 
 * efficiently rendering large lists and tabular data */
import { FixedSizeList as List} from 'react-window';
import Spatiu from './Spatiu';
import SpatiuAdd from './SpatiuAdd';
import SpatiuAddRange from './SpatiuAddRange';

/** CSS calc(<vh>vh - <op>px) */
function myCalc(vh, px) {
  var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  return (vh * h) / 100 - px;
}
   
class CentralizatorSpatii extends React.Component {
  constructor(props) {
    super(props);

    // Methods
    this.getItems = this.getItems.bind(this);

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

    this.itemKey = this.itemKey.bind(this);

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

      cannotDelete: false,

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
    this.list = React.createRef();

    this.addRef = React.createRef();
    this.addRangeRef = React.createRef();

  }

  getItems() {
        
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

  add() {

    if (!this.state.adding && !this.state.addingRange && !this.state.editing) {

      this.setState((state, props) => ({

        adding: true,
        searchText: '',
        searching: false,
        checkLevel: 0,
        checkedRows: 0,
        cannotDelete: false,

      }));

    }

  }

  save(operationType, item) {

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: operationType,  // 'create' OR 'update'
        item: item,
      })
    };

    fetch('http://localhost:3001/main/administrare/central', requestOptions)
    .then(response => response.json())
    .then(res => {

      if ('error' === res.status) {
        console.log('Eroare - centralizator spatii - adaugare sau actualizare (!)')
        
        if (this.addRef.current) {

          this.addRef.current.updateStatus('error');

        }
      }

      else 

      if ('duplicate' === res.status) {

        if (this.addRef.current) {

          this.addRef.current.updateStatus('duplicate');

        }

      } 
      
      else
      
      if ('valid' === res.status) {
        
        this.getItems();

        if (this.addRef.current) {

          this.addRef.current.updateStatus('valid');

        }

      }
      
      else

      if ('denied' === res.status) {
        this.props.onChange('Login');
      }
    });
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

      this.setState((state, props) => ({

        addingRange: true,
        searchText: '',
        searching: false,
        checkLevel: 0,
        checkedRows: 0,
        cannotDelete: false,

      }));

    }

  }

  saveRange(itemRange) {

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'createRange',
        itemRange: itemRange,
      })
    };

    fetch('http://localhost:3001/main/administrare/central', requestOptions)
    .then(response => response.json())
    .then(res => {

      if ('error' === res.status) {
        console.log('Eroare - centralizator spatii - adaugare sau actualizare (!)')
        
        if (this.addRangeRef.current) {

          this.addRangeRef.current.updateStatus('error');

        }
      }

      else 

      if ('rangeError' === res.status) {

        if (this.addRangeRef.current) {

          this.addRangeRef.current.updateStatus('rangeError');

        }

      } 

      else 

      if ('duplicate' === res.status) {

        if (this.addRangeRef.current) {

          this.addRangeRef.current.updateStatus('duplicate');

        }

      } 
      
      else
      
      if ('valid' === res.status) {
        
        this.getItems();

        if (this.addRangeRef.current) {

          this.addRangeRef.current.updateStatus('valid');

        }

      }
      
      else

      if ('denied' === res.status) {
        this.props.onChange('Login');
      }
    });
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

      this.setState((state, props) => ({

        editing: true,
        searchText: '',
        searching: false,
        checkLevel: 0,
        checkedRows: 0,
        cannotDelete: false,

      }));

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

    let items = this.state.items.filter((item) => item.isChecked).map((item) => {
      
      let res = {
        etaj: item.etaj,
        numar: item.numar,
        tipSpatiu: item.tipSpatiu,
        tipConfort: item.tipConfort,
        paturi: undefined,
      };

      let paturi = []; paturi.push(...item.paturi);

      res.paturi = paturi;

      return res;

    });

    console.log(items)

    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: this.props.token,
        task: 'delete',
        items: items,
      })
    };

    fetch('http://localhost:3001/main/administrare/central', requestOptions)
    .then(response => response.json())
    .then(res => {

      if ('error' === res.status) {

        console.log('Eroare - centralizator spatii - adaugare sau actualizare (!)')
        
      }

      else

      if ('statusError' === res.status) {

        this.setState( (state, props) => ({

          cannotDelete: true,

        }));

      }
      
      else
      
      if ('valid' === res.status) {
        
        this.getItems();

      }
      
      else

      if ('denied' === res.status) {
        this.props.onChange('Login');
      }
    });
  }

  itemKey(index, data) {
    
    return 's' + index;
    
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

      this.setState((state, props) => ({
        checkLevel: checkLevel,
        current: current,
        checkedRows: checkedRows,
        cannotDelete: false,
      }));
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

      this.setState((state, props) => ({
        current: current,
        checkLevel: checkLevel,
        checkedRows: checkedRows,
        cannotDelete: false,
      }));

    }
  }

  focusSearch() {
    this.search.current.focus();
  }

  componentDidMount() {

    this.getItems();

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
            {
              this.state.cannotDelete
                ?
              <Tippy
                content={
                  <div>Anumite spații sunt ocupate!</div>
                }
                allowHTML={true}
                placement='top'
                arrow={true}
                theme='material-confort-disabled'
                hideOnClick={false}
                offset={[0, 10]}>
                  <div className='-tbutton-cannot-delete'>
                    <i className='fas fa-trash-alt ---delete'></i>
                    <i className='fas fa-ban ---cannot'></i>
                  </div>
              </Tippy>
                :
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
            }

          </div>
            <Tippy
              disabled={this.state.adding || this.state.addingRange || this.state.editing}
              content={
                <div>Introdu numărul spațiului de cazare</div>
              }
              allowHTML={true}
              placement='top'
              arrow={true}
              theme='material-confort-hints'
              hideOnClick={false}
              offset={[0, 10]}>
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
          </Tippy>
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

          <List
            ref={this.list}
            height={myCalc(76, 179)}
            itemData={
              {
                items: this.state.items,
                bedTypes: this.state.bedTypes,
                roomTypes: this.state.roomTypes,
                confortTypes: this.state.confortTypes,
                toggleChecked: this.toggleChecked,
              }
            }
            itemKey={this.itemKey}
            itemSize={45}
            itemCount={this.state.items.length}
            className='-rows'
            >
            {Spatiu}
          </List>

        }
        {
          this.state.adding && !this.state.addingRange && !this.state.editing &&

          <SpatiuAdd ref={this.addRef}
            save={this.save}
            cancel={this.cancel}
            roomTypes={this.state.roomTypes}
            confortTypes={this.state.confortTypes}
            bedTypes={this.state.bedTypes}/>

        }
        {
          !this.state.adding && this.state.addingRange && !this.state.editing &&

          <SpatiuAddRange ref={this.addRangeRef} 
            save={this.saveRange}
            cancel={this.cancelRange}
            roomTypes={this.state.roomTypes}
            confortTypes={this.state.confortTypes}
            bedTypes={this.state.bedTypes}/>

        }
        {
          !this.state.adding && !this.state.addingRange && this.state.editing &&
          
          <div className='-rows-adding'>
            EDITING
          </div>

        }
        </div>
    );
  }
}

export default CentralizatorSpatii;




