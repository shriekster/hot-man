import React from 'react';
import Tippy from '@tippyjs/react';
import Spinner from './Spinner';

import AddBedButton from './AddBedButton';
import Bed from './Bed';
import SpatiuButtons from './SpatiuButtons';


class SpatiuAddRange extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      
      loading: false,
      addingBed: false,
      canSubmit: false,

      etaj: '',
      numarFrom: '',
      numarTo: '',
      tip: '0',
      confort: '0',
      beds: [],

    };

    this.input = this.input.bind(this);

    this.addBed = this.addBed.bind(this);

    this.updateBed = this.updateBed.bind(this)

    this.removeBed = this.removeBed.bind(this);

    this.updateButtons = this.updateButtons.bind(this);

    this.updateStatus = this.updateStatus.bind(this);

    this.save = this.save.bind(this);

    // Refs
    this._add_bed_ref = React.createRef();
    this._buttons_ref = React.createRef();

  }

  input(e) {
    
    switch (e.target.dataset.type) {

      case 'etaj': {

        this.setState({
          etaj: e.target.value
        },
        this.updateButtons);

        break;
      }

      case 'numarFrom': {

        this.setState({
          numarFrom: e.target.value
        },
        this.updateButtons);

        break;
      }

      case 'numarTo': {

        this.setState({
          numarTo: e.target.value
        },
        this.updateButtons);

        break;
      }


      case 'tip': {

        this.setState({
          tip: e.target.value
        },
        this.updateButtons);

        break;
      }

      case 'confort': {

        this.setState({
          confort: e.target.value
        },
        this.updateButtons);

        break;
      }

    }

  }

  addBed() {

    let beds = [];

    beds.push(...this.state.beds,
      {
        index: this.state.beds.length,
        count: '',
        type: '0',
    });

    this.setState((state, props) => ({
      
      addingBed: true,
      beds: beds,

    }),
    this.updateButtons);

  }

  updateBed(index, count = '', type = '0') {

    if (index >= 0 && index < this.state.beds.length) {

      let beds = [];
      beds.push(...this.state.beds);
      
      let bed = {
        index: index,
        count: count,
        type: type
      };

      beds[index] = bed;

      this.setState((state, props) => ({

        beds: beds,

      }),
      this.updateButtons);

    }
  }

  removeBed(index) {

    let beds = [];

    beds.push(...this.state.beds);

    if (index >= 0 && index < beds.length) {

      beds.splice(index, 1);

      // Reorder indexes
      for (let i = 0; i < beds.length; i++) {

        beds[i].index = i;
      }

      this.setState((state, props) => ({

        addingBed: false,
        beds: beds,

      }),
      this.updateButtons);

    }

  }

  updateButtons() {
    /** Check the state of the beds;
   * if any bed has incomplete data,
   * the user cannot add another bed
   */
    let beds = this.state.beds;

    const isIncomplete = (bed) => 
    (bed.count === '' || bed.type === '0');
  
    let cannotAdd = 
      this.state.etaj === ''        ||
      this.state.numarFrom === ''   ||
      this.state.numarTo === ''     ||
      this.state.tip === '0'        ||
      this.state.confort === '0'    ||
      beds.some(isIncomplete)       ||
      // the types of added beds are the existing bed categories
      beds.length >= this.props.bedTypes.length;
 

    
    let cannotSave = 
      this.state.etaj === ''        ||
      this.state.numarFrom === ''   ||
      this.state.numarTo === ''     ||
      this.state.tip === '0'        ||
      this.state.confort === '0'    ||
      beds.some(isIncomplete)       ||
      !beds.length;
    
    if (this._add_bed_ref.current) {

      this._add_bed_ref.current.updateState(cannotAdd);

    }

    if (this._buttons_ref.current) {

      this._buttons_ref.current.updateState(cannotSave);
      this._buttons_ref.current.updateStatus('');

    }
  
  }

  updateStatus(status) {

    if (this._buttons_ref.current) {

      if ('valid' === status) {

        setTimeout(this.props.cancel, 20);
        
      } else {

        this._buttons_ref.current.updateStatus(status);

      }

    }

  }

  save(_) {

    let paturi = []; paturi.push(...this.state.beds);

    let spaceRange = {
      etaj: this.state.etaj,
      numarFrom: this.state.numarFrom,
      numarTo: this.state.numarTo,
      tip: this.state.tip,
      confort: this.state.confort,
      paturi: paturi,
    }

    this.updateStatus('loading');

    this.props.save(spaceRange);

  }

  shouldComponentUpdate(nextProps, nextState) {
    
    if (this.state.etaj === nextState.etaj                &&
        this.state.numarFrom === nextState.numarFrom      &&
        this.state.numarTo === nextState.numarTo          &&
        this.state.tip === nextState.tip                  &&
        this.state.confort === nextState.confort          &&
        this.state.beds.length > 0                        &&
        this.state.beds.length === nextState.beds.length) {
      return false;
    }

    return true;
  }

  render () {

    return (
      
      <div className='spatiu-add'>

        <div className='-space-add'>

          <div style={{width: '29px'}}></div>
          <input className='-space-add-input'
            data-type='etaj'
            type='number'
            min={0}
            max={100}
            onInput={this.input}
            value={this.state.etaj}>
          </input>

          <input className='-space-add-range-input'
            data-type='numarFrom'
            type='number'
            min={0}
            max={10000}
            onInput={this.input}
            value={this.state.numarFrom}
            placeholder='De la...'>
          </input>

          <input className='-space-add-range-input'
            data-type='numarTo'
            type='number'
            min={0}
            max={10000}
            onInput={this.input}
            value={this.state.numarTo}
            placeholder='Până la...'>
          </input>

          <div className='-space-add-select-container'>
            <select className={
                this.state.tip ==='0' ? '-space-add-select --lightslategray'
                                      : '-space-add-select'}
              value={this.state.tip}
              data-type='tip'
              onInput={this.input}>
              <option
                className='--lightslategray'
                value='0'
                key={'r0'}>
                ---
              </option>
              {this.props.roomTypes.map (room => 
                <option
                  className='--darkslategray'
                  key={'r' + room.Denumire}
                  value={room.Denumire}>
                  {room.Denumire}
                </option>
              )}
            </select>
          </div>

          <div className='-space-add-select-container'>
            <select className={
                this.state.confort ==='0' ? '-space-add-select --lightslategray'
                                      : '-space-add-select'}
              value={this.state.confort}
              data-type='confort'
              onInput={this.input}>
              <option
                className='--lightslategray'
                value='0'
                key={'c0'}>
                ---
              </option>
              {this.props.confortTypes.map (confort => 
                <option
                  className='--darkslategray'
                  key={confort.Denumire}
                  value={confort.Denumire}>
                  {confort.Denumire}
                </option>
              )}
            </select>
          </div> 

        </div>

        <div className='-space-add-beds'>

          <AddBedButton
            ref={this._add_bed_ref}
            addBed={this.addBed} />

          <div className='-space-add-beds-content'>
            {
              this.state.beds.map ( 
                bed => 

                <Bed 
                  key={'b' + bed.index}
                  index={bed.index}
                  bedTypes={this.props.bedTypes}
                  updateBed={this.updateBed}
                  removeBed={this.removeBed} />
              )
            }
          </div>
        </div>

        <SpatiuButtons
          ref={this._buttons_ref}
          range={true}
          save={this.save}
          operationType='create'
          cancel={this.props.cancel} />
      </div>

    );

  }

}

export default SpatiuAddRange;